import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// =============================================================================
// Dashboard auth middleware — edge runtime.
// =============================================================================
// Verifies the HMAC-SHA256 signed session cookie on every /dashboard/* request.
//
// Must run on edge runtime (Web Crypto API), so we can't import lib/auth.ts
// which uses node:crypto + bcryptjs. The verification logic here is a mirror
// of lib/auth.ts#verifySession — if you change one, change the other to match.
//
// Fails CLOSED on every error path: missing secret, malformed cookie, bad
// signature, expired timestamp — all redirect to /dashboard/login. A
// misconfigured production deploy locks everyone out rather than silently
// becoming insecure.
// =============================================================================

const SESSION_COOKIE_NAME = "admin_session";

// Hex → ArrayBuffer. Returns a concrete ArrayBuffer (not ArrayBufferLike) so
// it satisfies the Web Crypto BufferSource type contract in strict TS mode.
function hexToArrayBuffer(hex: string): ArrayBuffer | null {
  if (hex.length === 0 || hex.length % 2 !== 0) return null;
  const buf = new ArrayBuffer(hex.length / 2);
  const view = new Uint8Array(buf);
  for (let i = 0; i < view.length; i++) {
    const byte = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) return null;
    view[i] = byte;
  }
  return buf;
}

// TextEncoder returns Uint8Array<ArrayBufferLike>; Web Crypto wants
// BufferSource tied to a concrete ArrayBuffer. Copy into a fresh ArrayBuffer.
function strToArrayBuffer(s: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(s);
  const buf = new ArrayBuffer(encoded.byteLength);
  new Uint8Array(buf).set(encoded);
  return buf;
}

async function verifySessionEdge(
  cookieValue: string | undefined,
  secret: string
): Promise<boolean> {
  if (!cookieValue) return false;
  const dot = cookieValue.indexOf(".");
  if (dot === -1) return false;
  const expStr = cookieValue.slice(0, dot);
  const sigHex = cookieValue.slice(dot + 1);

  const exp = parseInt(expStr, 10);
  if (Number.isNaN(exp) || Date.now() > exp) return false;

  const sigBuf = hexToArrayBuffer(sigHex);
  if (!sigBuf) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      strToArrayBuffer(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    // crypto.subtle.verify is constant-time internally.
    return await crypto.subtle.verify("HMAC", key, sigBuf, strToArrayBuffer(expStr));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard dashboard routes; everything else is public.
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  // The login page must be accessible to unauthenticated users.
  if (pathname === "/dashboard/login") return NextResponse.next();

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    // Fail closed: if the secret is misconfigured, nobody gets in — not even
    // someone with a stale valid cookie from a previous config. Better
    // locked out than silently insecure.
    const url = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(url);
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  const valid = await verifySessionEdge(cookie?.value, secret);

  if (!valid) {
    const url = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
