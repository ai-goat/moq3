import type { Metadata } from "next";
import Link from "next/link";

import { SearchBox } from "@/components/search/search-box";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/metadata";
import { getHomepageData } from "@/services/public";

export const metadata: Metadata = buildPageMetadata({
  title: "Search Exams",
  description:
    "Search for exam result pages, cutoff updates, answer keys, and notifications with fast keyword matching across the MOQ3 index.",
  canonical: "/search",
});

export const revalidate = 3600;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { popularExams } = await getHomepageData();

  return (
    <div className="shell py-14">
      <SectionHeading
        description="Search box results are powered by Meilisearch when configured, with a local fallback for development."
        eyebrow="Search"
        title="Find exam pages instantly"
      />
      <div className="mt-8 max-w-3xl">
        <SearchBox initialQuery={q || ""} />
      </div>
      <div className="mt-12">
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Quick links
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {popularExams.map((exam) => (
            <Link
              className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              href={`/exam/${exam.slug}`}
              key={exam.slug}
            >
              {exam.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
