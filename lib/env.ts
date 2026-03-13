import { SEARCH_INDEX_NAME } from "@/lib/constants";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const env = {
  adminPassword: process.env.ADMIN_PASSWORD || "moq3-admin",
  adminSessionSecret:
    process.env.ADMIN_SESSION_SECRET || "dev-only-admin-session-secret",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  databaseUrl: process.env.DATABASE_URL || "",
  meilisearchApiKey: process.env.MEILISEARCH_API_KEY || "",
  meilisearchHost: process.env.MEILISEARCH_HOST || "",
  meilisearchIndex: process.env.MEILISEARCH_INDEX || SEARCH_INDEX_NAME,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  siteUrl,
};

export const isProduction = process.env.NODE_ENV === "production";
export const isDatabaseConfigured = Boolean(env.databaseUrl);
export const isMeilisearchConfigured = Boolean(env.meilisearchHost);
