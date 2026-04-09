import "server-only";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { getSupabaseAdmin } from "./supabase-admin";

// =============================================================================
// Dashboard authentication — the single source of truth for admin security.
// =============================================================================
//
// Design summary:
//   * Password is stored as a bcryptjs hash in ADMIN_PASSWORD_HASH env var.
//     Bcrypt is slow by design (cost 12 ≈ 300ms/attempt), making brute force
//     infeasible even if the hash leaks.
//   * Sessions are HMAC-SHA256 signed cookies. Value format: "{expMs}.{sigHex}".
//     Without ADMIN_SESSION_SECRET (32+ chars), nobody can forge a valid
//     cookie — not even someone who can guess the old "authenticated" string.
//   * Rate limiting lives in Supabase (`login_attempts` table). Max 10 failed
//     attempts per IP per 15-minute rolling window. Fails CLOSED if the DB is
//     unreachable, so a DB outage can't become a security bypass.
//   * All paths that touch secrets throw loudly on missing env vars — better
//     a loud 500 than a silent open door.
// =============================================================================

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_FAILURES = 10;

export const AUTH_CONSTANTS = {
  SESSION_TTL_MS,
  SESSION_TTL_SECONDS,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_FAILURES,
};

function getSessionSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (need >= 32 characters). " +
        "Generate one with: openssl rand -hex 32"
    );
  }
  return s;
}

// ---------- Session signing -------------------------------------------------

export function signSession(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const sig = crypto
    .createHmac("sha256", getSessionSecret())
    .update(String(exp))
    .digest("hex");
  return `${exp}.${sig}`;
}

// Node-runtime session verification (edge runtime has its own copy in
// middleware.ts that uses Web Crypto instead).
export function verifySession(cookieValue: string | undefined | null): boolean {
  if (!cookieValue) return false;
  const dot = cookieValue.indexOf(".");
  if (dot === -1) return false;
  const expStr = cookieValue.slice(0, dot);
  const sigHex = cookieValue.slice(dot + 1);
  const exp = parseInt(expStr, 10);
  if (Number.isNaN(exp) || Date.now() > exp) return false;

  let secret: string;
  try {
    secret = getSessionSecret();
  } catch {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(expStr).digest("hex");
  // Constant-time comparison — prevents timing leaks in session verification.
  if (sigHex.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(sigHex, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

// ---------- Password verification -------------------------------------------

export async function verifyPassword(plaintext: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error(
      "ADMIN_PASSWORD_HASH is missing. Generate one with: " +
        'node -e "console.log(require(\'bcryptjs\').hashSync(\'YOUR_PASSWORD\', 12))"'
    );
  }
  // bcrypt.compare is constant-time and intentionally slow.
  return bcrypt.compare(plaintext, hash);
}

// ---------- Client IP extraction --------------------------------------------

export function getClientIp(): string {
  const h = headers();
  // Vercel sets x-forwarded-for; take the leftmost IP which is the original
  // client. Everything after is the chain of proxies, and attackers can only
  // spoof the RIGHT side (since Vercel prepends the real client IP).
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = h.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}

// ---------- Rate limiting ---------------------------------------------------

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryInMs: number;
};

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const db = getSupabaseAdmin();
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const { data, error } = await db
    .from("login_attempts")
    .select("attempted_at")
    .eq("ip", ip)
    .eq("success", false)
    .gte("attempted_at", since)
    .order("attempted_at", { ascending: true });

  if (error) {
    // Fail CLOSED: if the rate-limit store is unreachable, refuse logins.
    // A DB outage is an operations problem, not an opportunity for attackers.
    console.error("[auth] rate limit query failed", error);
    return { allowed: false, remaining: 0, retryInMs: RATE_LIMIT_WINDOW_MS };
  }

  const failures = data?.length ?? 0;
  const remaining = Math.max(0, RATE_LIMIT_MAX_FAILURES - failures);

  if (failures >= RATE_LIMIT_MAX_FAILURES) {
    // Compute when the oldest attempt in the window rolls off — that's when
    // the user regains one attempt. Gives a useful "try again in N min" UX.
    const oldest = data![0].attempted_at as string;
    const windowExpiresAt = new Date(oldest).getTime() + RATE_LIMIT_WINDOW_MS;
    return {
      allowed: false,
      remaining: 0,
      retryInMs: Math.max(1000, windowExpiresAt - Date.now()),
    };
  }

  return { allowed: true, remaining, retryInMs: 0 };
}

export async function recordLoginAttempt(ip: string, success: boolean): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from("login_attempts").insert([{ ip, success }]);
  if (error) {
    // Log but don't throw — we don't want an audit-log write failure to
    // block a legitimate login. The rate-limit check already failed closed
    // on DB errors, so this path only runs when the DB is healthy enough
    // to have served the SELECT moments ago.
    console.error("[auth] failed to record login attempt", error);
  }
}
