"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function logoutAction() {
  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/dashboard/login");
}

// --------------- Row CRUD ---------------

export async function deleteRow(table: string, id: number | string) {
  const db = getSupabaseAdmin();
  const { error } = await db.from(table).delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { error: null };
}

export async function updateRow(
  table: string,
  id: number | string,
  fields: Record<string, unknown>
) {
  const db = getSupabaseAdmin();
  const { error } = await db.from(table).update(fields).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { error: null };
}
