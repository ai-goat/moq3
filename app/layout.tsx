import type { Metadata } from "next";
import Script from "next/script";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { env } from "@/lib/env";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    type: "website",
    url: env.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
    title: SITE_TITLE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {env.plausibleDomain ? (
          <Script
            async
            data-domain={env.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)] text-slate-950">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
