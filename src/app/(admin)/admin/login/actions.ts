"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const error = await signIn(String(formData.get("email") ?? ""), String(formData.get("password") ?? ""), ip);
  if (error) redirect(`/admin/login?err=${encodeURIComponent(error)}`);
  redirect("/admin");
}
