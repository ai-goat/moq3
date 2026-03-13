import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResultIntentPage } from "@/components/exams/intent-page-shell";
import {
  getResultIntentPageData,
  getStaticCollections,
} from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.resultIntentParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}): Promise<Metadata> {
  const { pageSlug } = await params;
  const data = await getResultIntentPageData(pageSlug);

  if (!data) {
    return {};
  }

  return {
    title: `${data.exam.name} Result ${data.year}`,
    description: `${data.exam.name} result ${data.year} with direct link, result date, selection stats, and cutoff comparison.`,
  };
}

export default async function ResultIntentRoute({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  const data = await getResultIntentPageData(pageSlug);

  if (!data) {
    notFound();
  }

  return <ResultIntentPage {...data} />;
}
