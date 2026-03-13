"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSession,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  if (!verifyAdminCredentials(username, password)) {
    redirect("/admin?error=invalid");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}
