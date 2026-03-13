import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DataTable } from "@/components/ui/data-table";
import { ResultStatusPill } from "@/components/ui/result-status-pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/json-ld";
import {
  average,
  buildIntentPageHref,
  formatDate,
  formatNumber,
  safePercentage,
} from "@/lib/utils";
import { getResultPageData, getStaticCollections } from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.resultParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examYear: string }>;
}): Promise<Metadata> {
  const { examYear } = await params;
  const data = await getResultPageData(examYear);

  if (!data) {
    return {};
  }

  return {
    alternates: {
      canonical: buildIntentPageHref("result", data.exam.slug, data.result.year),
    },
    title: `${data.exam.name} ${data.result.year} Result`,
    description: `${data.exam.name} ${data.result.year} result date, cutoff comparison, selection statistics, and official result link.`,
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ examYear: string }>;
}) {
  const { examYear } = await params;
  const data = await getResultPageData(examYear);

  if (!data) {
    notFound();
  }

  const expectedCutoff =
    data.currentCutoff.length > 0
      ? average(data.currentCutoff.map((item) => item.cutoffMarks)).toFixed(1)
      : "Pending";

  const comparisonRows = data.currentCutoff.map((item) => {
    const previous =
      data.previousCutoff.find((cutoff) => cutoff.category === item.category)
        ?.cutoffMarks ?? "-";

    return [item.category, previous, item.cutoffMarks];
  });

  return (
    <div className="shell py-14">
      <StructuredData data={buildFaqJsonLd(data.faq)} />
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Results", path: "/exams" },
          { name: `${data.exam.name} ${data.result.year}`, path: `/results/${examYear}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exams", label: "Exams" },
          { label: `${data.exam.name} ${data.result.year}` },
        ]}
      />

      <section className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Result page</p>
          <h1 className="display-title mt-4 text-5xl font-semibold text-slate-950 md:text-6xl">
            {data.exam.name} {data.result.year} Result
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ResultStatusPill status={data.result.status} />
            <p className="text-sm text-slate-500">
              Result date: {formatDate(data.result.resultDate)}
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Official result link, shortlist numbers, cutoff context, and next-step
            guidance for the current cycle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              href={data.result.officialResultLink}
              rel="noreferrer"
              target="_blank"
            >
              Download official result
            </Link>
            <Link
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
              href={`/cutoffs/${examYear}`}
            >
              View cutoff page
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          <StatCard label="Expected cutoff" value={String(expectedCutoff)} />
          <StatCard
            label="Selected candidates"
            value={formatNumber(data.result.selectedCandidates)}
          />
          <StatCard
            label="Selection ratio"
            value={safePercentage(data.examStat?.selectionRatio ?? 0)}
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Cutoff comparison"
          title="Previous year versus current year"
        />
        <div className="mt-8">
          <DataTable
            columns={["Category", `${data.result.year - 1}`, `${data.result.year}`]}
            rows={comparisonRows}
          />
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card rounded-[2rem] p-8">
          <SectionHeading eyebrow="Selection statistics" title="Current cycle data" />
          <div className="mt-6 grid gap-4">
            <StatCard
              label="Total candidates"
              value={formatNumber(data.result.totalCandidates)}
            />
            <StatCard
              label="Vacancies"
              value={formatNumber(data.examStat?.vacancies ?? 0)}
            />
          </div>
        </div>
        <div className="card rounded-[2rem] p-8">
          <SectionHeading eyebrow="Steps to check result" title="What to do next" />
          <ol className="mt-6 grid gap-4">
            {data.steps.map((step, index) => (
              <li className="flex gap-4" key={step}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-2 text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Next stage after result: document verification, skill test, or further
            recruitment steps depending on the exam body.
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="card rounded-[2rem] p-8">
          <SectionHeading eyebrow="Prediction" title="Expected cutoff readout" />
          <p className="mt-6 text-base leading-8 text-slate-600">
            {data.prediction || "Expected cutoff narrative will appear here once the cycle is active."}
          </p>
        </div>
        <div className="card rounded-[2rem] p-8">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-6 grid gap-5">
            {data.faq.map((item) => (
              <div key={item.question}>
                <p className="font-semibold text-slate-950">{item.question}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
