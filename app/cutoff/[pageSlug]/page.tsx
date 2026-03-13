import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CutoffIntentPage } from "@/components/exams/intent-page-shell";
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

  return {
    title: `${data.exam.name} Cutoff ${data.year}`,
    description: `${data.exam.name} cutoff ${data.year} with category-wise marks and previous-year trend.`,
  };
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
