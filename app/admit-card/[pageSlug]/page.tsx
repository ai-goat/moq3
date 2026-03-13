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
  return collections.admitCardIntentParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}): Promise<Metadata> {
  const { pageSlug } = await params;
  const data = await getUpdateIntentPageData("admit-card", pageSlug);

  if (!data) {
    return {};
  }

  return {
    title: `${data.exam.name} Admit Card ${data.year}`,
    description: `${data.exam.name} admit card ${data.year} with important dates, official link, and exam-cycle details.`,
    alternates: {
      canonical: `/admit-card/${pageSlug}`,
    },
  };
}

export default async function AdmitCardIntentPage({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  const data = await getUpdateIntentPageData("admit-card", pageSlug);

  if (!data) {
    notFound();
  }

  return <UpdateIntentPage {...data} />;
}
