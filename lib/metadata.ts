import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";
import { env } from "@/lib/env";

export function buildPageMetadata({
  title,
  description,
  canonical,
  image,
}: {
  title: string;
  description: string;
  canonical: string;
  image?: string;
}): Metadata {
  const resolvedImage = image
    ? image.startsWith("http")
      ? image
      : `${env.siteUrl}${image}`
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: canonical,
      images: resolvedImage ? [{ url: resolvedImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImage ? [resolvedImage] : undefined,
    },
  };
}
