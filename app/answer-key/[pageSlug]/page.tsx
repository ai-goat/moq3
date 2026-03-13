import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { UpdateIntentPage } from "@/components/exams/intent-page-shell";
import {
  getStaticCollections,
  getUpdateIntentPageData,
} from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.answerKeyIntentParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}): Promise<Metadata> {
  const { pageSlug } = await params;
  const data = await getUpdateIntentPageData("answer-key", pageSlug);

  if (!data) {
    return {};
  }

  return {
    title: `${data.exam.name} Answer Key ${data.year}`,
    description: `${data.exam.name} answer key ${data.year} with direct official link, dates, and how to check details.`,
  };
}

export default async function AnswerKeyIntentPage({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  const data = await getUpdateIntentPageData("answer-key", pageSlug);

  if (!data) {
    notFound();
  }

  return <UpdateIntentPage {...data} />;
}
