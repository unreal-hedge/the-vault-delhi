"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_CONSTANTS,
  SESSION_COOKIE_NAME,
  checkRateLimit,
  getClientIp,
  recordLoginAttempt,
  signSession,
  verifyPassword,
} from "@/lib/auth";

// Server action for the owner login form. All of the heavy lifting lives in
// lib/auth.ts — this file just orchestrates the flow:
//
//   1. Extract client IP from the request headers
//   2. Check the rate limit (fails closed on DB error)
//   3. Verify the bcrypt-hashed password (constant-time, ~300ms by design)
//   4. Record the attempt for auditing + future rate limit checks
//   5. On success, issue a signed session cookie and redirect
//
// Error messages are deliberately generic — never leak *why* a login failed.
export type LoginResult = { error: string };

export async function loginAction(formData: FormData): Promise<LoginResult | void> {
  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    return { error: "Please enter a password." };
  }

  const ip = getClientIp();

  // --- Rate limit check (fails closed) ---
  let rl: Awaited<ReturnType<typeof checkRateLimit>>;
  try {
    rl = await checkRateLimit(ip);
  } catch (err) {
    console.error("[login] checkRateLimit threw", err);
    return { error: "Login is temporarily unavailable. Try again soon." };
  }
  if (!rl.allowed) {
    const minutes = Math.max(1, Math.ceil(rl.retryInMs / 60000));
    return {
      error: `Too many failed attempts. Try again in ${minutes} minute${
        minutes === 1 ? "" : "s"
      }.`,
    };
  }

  // --- Password check ---
  let ok = false;
  try {
    ok = await verifyPassword(password);
  } catch (err) {
    // ADMIN_PASSWORD_HASH missing / invalid bcrypt format.
    // Log loudly so the owner notices in Vercel logs; fail closed.
    console.error("[login] verifyPassword threw", err);
    return { error: "Login is temporarily unavailable. Try again soon." };
  }

  // --- Record the attempt for audit + rate limiting ---
  await recordLoginAttempt(ip, ok);

  if (!ok) {
    const remainingAfter = Math.max(0, rl.remaining - 1);
    if (remainingAfter === 0) {
      return {
        error: `Invalid password. Account temporarily locked — try again in ${Math.ceil(
          AUTH_CONSTANTS.RATE_LIMIT_WINDOW_MS / 60000
        )} minutes.`,
      };
    }
    return {
      error: `Invalid password. ${remainingAfter} attempt${
        remainingAfter === 1 ? "" : "s"
      } remaining.`,
    };
  }

  // --- Success: issue signed session cookie ---
  let token: string;
  try {
    token = signSession();
  } catch (err) {
    // ADMIN_SESSION_SECRET missing / too short.
    console.error("[login] signSession threw", err);
    return { error: "Login is temporarily unavailable. Try again soon." };
  }

  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_CONSTANTS.SESSION_TTL_SECONDS,
    path: "/",
  });

  redirect("/dashboard");
}
