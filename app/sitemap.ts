import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { getStaticCollections } from "@/services/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections = await getStaticCollections();
  const base = env.siteUrl;

  const staticRoutes = [
    "",
    "/exams",
    "/exam-calendar",
    "/search",
  ].map((route) => ({
    url: `${base}${route || "/"}`,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const examRoutes = collections.examParams.map((item) => ({
    url: `${base}/exam/${item.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const resultRoutes = collections.resultParams.map((item) => ({
    url: `${base}/result/${item.examYear}`,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const cutoffRoutes = collections.cutoffIntentParams.map((item) => ({
    url: `${base}/cutoff/${item.pageSlug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const answerKeyRoutes = collections.answerKeyIntentParams.map((item) => ({
    url: `${base}/answer-key/${item.pageSlug}`,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const admitCardRoutes = collections.admitCardIntentParams.map((item) => ({
    url: `${base}/admit-card/${item.pageSlug}`,
    changeFrequency: "daily" as const,
    priority: 0.88,
  }));

  const notificationRoutes = collections.notificationIntentParams.map((item) => ({
    url: `${base}/notification/${item.pageSlug}`,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const cutoffCategoryRoutes = collections.cutoffCategoryParams.map((item) => ({
    url: `${base}/cutoffs/${item.examYear}/${item.category}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const analysisRoutes = collections.analysisParams.map((item) => ({
    url: `${base}/analysis/${item.exam}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...examRoutes,
    ...resultRoutes,
    ...cutoffRoutes,
    ...answerKeyRoutes,
    ...admitCardRoutes,
    ...notificationRoutes,
    ...cutoffCategoryRoutes,
    ...analysisRoutes,
  ];
}
