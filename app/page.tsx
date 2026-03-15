import Link from "next/link";
import type { Metadata } from "next";

import { SearchBox } from "@/components/search/search-box";
import { ResultStatusPill } from "@/components/ui/result-status-pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { StructuredData } from "@/components/ui/structured-data";
import { buildOrganizationJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/metadata";
import { buildIntentPageHref, formatCompactDate, formatNumber } from "@/lib/utils";
import { getHomepageData } from "@/services/public";

export const metadata: Metadata = buildPageMetadata({
  title: "MOQ3 - Result Intelligence Platform",
  description:
    "Official exam result timelines, cutoff analysis, and high-intent updates across SSC, UPSC, Railway, CBSE, and other competitive exams.",
  canonical: "/",
});

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <div className="pb-20">
      <StructuredData data={buildOrganizationJsonLd()} />
      <section className="shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">SEO-first platform</p>
          <h1 className="display-title mt-4 max-w-4xl text-5xl font-semibold text-slate-950 md:text-7xl">
            Result pages built for scale, speed, and search visibility.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            MOQ3 organizes exam results, cutoff intelligence, historical
            statistics, and prediction pages for high-volume public search
            demand.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchBox />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              href="/exams"
            >
              Browse all exams
            </Link>
            <Link
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
              href="/exam-calendar"
            >
              Upcoming result calendar
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          <StatCard
            detail="Programmatic SEO pages per exam, year, and cutoff category."
            label="Scalable coverage"
            value={`${data.exams.length * 18}+`}
          />
          <StatCard
            detail="Latest announced and expected timelines organized for discovery."
            label="Tracked result windows"
            value={`${data.timeline.length}`}
          />
          <StatCard
            detail="Cached server-rendered pages optimized for large traffic spikes."
            label="Public delivery"
            value="ISR + Edge"
          />
        </div>
      </section>

      <section className="shell grid gap-12 py-10">
        <SectionHeading
          description="Freshly updated announcement pages with direct paths to result detail pages."
          eyebrow="Latest results"
          title="Current result movement"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {data.latestResults.map((item) => (
            <Link
              className="card rounded-[2rem] p-6 transition hover:-translate-y-1"
              href={buildIntentPageHref("result", item.exam.slug, item.year)}
              key={`${item.exam.slug}-${item.year}`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-500">{item.exam.category}</p>
                <ResultStatusPill status={item.status} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">
                {item.exam.name} {item.year} Result
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {formatCompactDate(item.resultDate)}
              </p>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                {formatNumber(item.selectedCandidates)} shortlisted from{" "}
                {formatNumber(item.totalCandidates)} candidates.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-5">
          <SectionHeading
            description="Category clusters that can scale into thousands of discoverable landing pages."
            eyebrow="Exam categories"
            title="Coverage across major result ecosystems"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.categories.map((category) => (
              <div className="card rounded-[2rem] p-5" key={category.name}>
                <p className="text-sm font-medium text-slate-500">{category.name}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {category.count}
                </p>
                <p className="mt-2 text-sm text-slate-500">tracked exams</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <SectionHeading
            description="Expected declaration dates sorted into a calendar-friendly stream."
            eyebrow="Upcoming results"
            title="What is likely next"
          />
          <div className="card rounded-[2rem] p-6">
            <div className="grid gap-4">
              {data.upcomingResults.map((item) => (
                <Link
                  className="grid gap-1 rounded-2xl border border-slate-100 px-4 py-4 transition hover:border-sky-200 hover:bg-sky-50/60"
                  href={buildIntentPageHref("result", item.exam.slug, item.year)}
                  key={`${item.exam.slug}-${item.year}-upcoming`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-slate-950">
                      {item.exam.name} {item.year}
                    </p>
                    <ResultStatusPill status={item.status} />
                  </div>
                  <p className="text-sm text-slate-500">
                    Target date: {formatCompactDate(item.resultDate)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 py-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            description="High-interest exam hubs with strong organic demand and repeat yearly page generation."
            eyebrow="Popular exams"
            title="Highest-traffic exam entities"
          />
          <div className="mt-6 grid gap-4">
            {data.popularExams.map((exam) => (
              <Link
                className="card flex items-center justify-between rounded-[2rem] p-5 transition hover:-translate-y-1"
                href={`/exam/${exam.slug}`}
                key={exam.slug}
              >
                <div>
                  <p className="text-lg font-semibold text-slate-950">{exam.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {exam.conductingBody}
                  </p>
                </div>
                <p className="text-sm font-medium text-teal-700">{exam.category}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            description="A timeline stream designed for newsroom-style freshness and indexable announcement chronology."
            eyebrow="Result timeline"
            title="Chronological declaration flow"
          />
          <div className="mt-6 card rounded-[2rem] p-6">
            <div className="grid gap-5">
              {data.timeline.map((item) => (
                <div
                  className="grid gap-1 border-l-2 border-sky-200 pl-4"
                  key={`${item.exam.slug}-${item.year}-timeline`}
                >
                  <p className="text-sm text-slate-500">
                    {formatCompactDate(item.resultDate)}
                  </p>
                  <p className="font-semibold text-slate-950">
                    {item.exam.name} {item.year}
                  </p>
                  <p className="text-sm text-slate-600">
                    {formatNumber(item.selectedCandidates)} selected candidates
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 py-10">
        <SectionHeading
          description="Deep-dive analytics pages for marks vs rank, selection ratios, and year-wise signals."
          eyebrow="Exam insights"
          title="Trending analysis pages"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.exams.slice(0, 6).map((exam) => (
            <Link
              className="card rounded-[2rem] p-5 transition hover:-translate-y-1"
              href={`/analysis/${exam.slug}`}
              key={`analysis-${exam.slug}`}
            >
              <p className="text-sm font-medium text-slate-500">Analysis</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">
                {exam.name} insights
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Selection ratio, cutoff trend, marks vs rank.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
