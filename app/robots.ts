import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    host: env.siteUrl,
    rules: [
      {
        allow: "/",
        disallow: ["/admin", "/api/admin"],
        userAgent: "*",
      },
    ],
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
