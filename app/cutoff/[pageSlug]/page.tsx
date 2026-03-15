import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CutoffIntentPage } from "@/components/exams/intent-page-shell";
import { buildPageMetadata } from "@/lib/metadata";
import {
  getCutoffIntentPageData,
  getStaticCollections,
} from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.cutoffIntentParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}): Promise<Metadata> {
  const { pageSlug } = await params;
  const data = await getCutoffIntentPageData(pageSlug);

  if (!data) {
    return {};
  }

  return buildPageMetadata({
    title: `${data.exam.name} Cutoff ${data.year}`,
    description: `${data.exam.name} cutoff ${data.year} with category-wise marks, previous-year trend, and cutoff table.`,
    canonical: `/cutoff/${pageSlug}`,
  });
}

export default async function CutoffIntentRoute({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  const data = await getCutoffIntentPageData(pageSlug);

  if (!data) {
    notFound();
  }

  return <CutoffIntentPage {...data} />;
}
