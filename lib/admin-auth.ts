import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { env, isProduction } from "@/lib/env";

const COOKIE_NAME = "moq3_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function sign(value: string) {
  return createHmac("sha256", env.adminSessionSecret).update(value).digest("hex");
}

function safeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function verifyAdminCredentials(username: string, password: string) {
  return (
    safeCompare(username, env.adminUsername) && safeCompare(password, env.adminPassword)
  );
}

export function createSessionValue() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${env.adminUsername}:${expiresAt}`;

  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function decodeSessionValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");

  if (!safeCompare(signature, sign(payload))) {
    return false;
  }

  const [username, expiresAt] = payload.split(":");

  if (!username || !expiresAt || username !== env.adminUsername) {
    return false;
  }

  return Number(expiresAt) > Math.floor(Date.now() / 1000);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return decodeSessionValue(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
