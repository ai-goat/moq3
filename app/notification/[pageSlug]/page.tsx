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
  return collections.notificationIntentParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}): Promise<Metadata> {
  const { pageSlug } = await params;
  const data = await getUpdateIntentPageData("notification", pageSlug);

  if (!data) {
    return {};
  }

  return {
    title: `${data.exam.name} Notification ${data.year}`,
    description: `${data.exam.name} notification ${data.year} with important dates, fee, eligibility, vacancy, and official links.`,
  };
}

export default async function NotificationIntentPage({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  const data = await getUpdateIntentPageData("notification", pageSlug);

  if (!data) {
    notFound();
  }

  return <UpdateIntentPage {...data} />;
}
