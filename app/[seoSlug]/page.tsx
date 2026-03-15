import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { getSeoLandingPageData, getStaticCollections } from "@/services/public";
import { buildPageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.seoParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}): Promise<Metadata> {
  const { seoSlug } = await params;
  const data = await getSeoLandingPageData(seoSlug);

  if (!data) {
    return {};
  }

  const canonical =
    data.variant === "result" && data.year
      ? `/result/${data.exam.slug}-${data.year}`
      : data.variant === "cutoff" && data.year
        ? `/cutoff/${data.exam.slug}-${data.year}`
        : `/analysis/${data.exam.slug}`;

  return buildPageMetadata({
    title: seoSlug.replace(/-/g, " "),
    description: `${data.exam.name} redirected intent route.`,
    canonical,
  });
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}) {
  const { seoSlug } = await params;
  const data = await getSeoLandingPageData(seoSlug);

  if (!data) {
    notFound();
  }

  const primaryHref =
    data.variant === "result" && data.year
      ? `/result/${data.exam.slug}-${data.year}`
      : data.variant === "cutoff" && data.year
        ? `/cutoff/${data.exam.slug}-${data.year}`
        : `/analysis/${data.exam.slug}`;
  permanentRedirect(primaryHref);
}
