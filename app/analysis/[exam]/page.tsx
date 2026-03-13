import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CutoffChart } from "@/components/ui/cutoff-chart";
import { DataTable } from "@/components/ui/data-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { formatNumber, safePercentage } from "@/lib/utils";
import { getAnalysisPageData, getStaticCollections } from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.analysisParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string }>;
}): Promise<Metadata> {
  const { exam } = await params;
  const data = await getAnalysisPageData(exam);

  if (!data) {
    return {};
  }

  return {
    title: `${data.exam.name} Analysis`,
    description: `${data.exam.name} selection ratio, marks vs rank, historical results, and cutoff analytics.`,
  };
}

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  const data = await getAnalysisPageData(exam);

  if (!data) {
    notFound();
  }

  return (
    <div className="shell py-14">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Exams", path: "/exams" },
          { name: `${data.exam.name} analysis`, path: `/analysis/${data.exam.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exams", label: "Exams" },
          { label: `${data.exam.name} analysis` },
        ]}
      />
      <section className="mt-6">
        <p className="eyebrow">Analysis</p>
        <h1 className="display-title mt-4 text-5xl font-semibold text-slate-950 md:text-6xl">
          {data.exam.name} Exam Analysis
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Historical signals, selection ratios, marks-vs-rank approximations, and
          result trend lines.
        </p>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <CutoffChart
          data={data.generalCutoffs.map((item) => ({
            year: item.year,
            value: item.cutoffMarks,
          }))}
          label="General cutoff trend"
        />
        <div className="card rounded-[2rem] p-8">
          <SectionHeading eyebrow="Selection process" title="Stage breakdown" />
          <ol className="mt-6 grid gap-4">
            {data.selectionProcess.map((step, index) => (
              <li className="flex gap-4" key={step}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-2 text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Selection ratio" title="Vacancy pressure by year" />
        <div className="mt-8">
          <DataTable
            columns={["Year", "Vacancies", "Candidates", "Selection Ratio"]}
            rows={data.statsTimeline.map((item) => [
              item.year,
              formatNumber(item.vacancies),
              formatNumber(item.candidates),
              safePercentage(item.selectionRatio),
            ])}
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Marks vs rank" title="Estimated score bands" />
        <div className="mt-8">
          <DataTable
            columns={["Year", "Rank Band", "Indicative Marks"]}
            rows={data.marksVsRank.map((item) => [item.year, item.rankBand, item.marks])}
          />
        </div>
      </section>
    </div>
  );
}
