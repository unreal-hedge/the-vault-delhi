"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function logoutAction() {
  // Match the cookie attributes used at set-time so the browser actually
  // clears it. Just calling .delete() with no options works in most cases
  // but being explicit is safer across Next versions.
  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/dashboard/login");
}
