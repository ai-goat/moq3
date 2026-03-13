import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CutoffChart } from "@/components/ui/cutoff-chart";
import { DataTable } from "@/components/ui/data-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { buildIntentPageHref, slugifyCategory } from "@/lib/utils";
import { getCutoffPageData, getStaticCollections } from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.cutoffParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examYear: string }>;
}): Promise<Metadata> {
  const { examYear } = await params;
  const data = await getCutoffPageData(examYear);

  if (!data) {
    return {};
  }

  return {
    alternates: {
      canonical: buildIntentPageHref("cutoff", data.exam.slug, data.year),
    },
    title: `${data.exam.name} ${data.year} Cutoff`,
    description: `${data.exam.name} ${data.year} cutoff table with category-wise marks and previous year graphs.`,
  };
}

export default async function CutoffPage({
  params,
}: {
  params: Promise<{ examYear: string }>;
}) {
  const { examYear } = await params;
  const data = await getCutoffPageData(examYear);

  if (!data) {
    notFound();
  }

  return (
    <div className="shell py-14">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Exams", path: "/exams" },
          { name: `${data.exam.name} cutoff ${data.year}`, path: `/cutoffs/${examYear}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exams", label: "Exams" },
          { label: `${data.exam.name} ${data.year} cutoff` },
        ]}
      />
      <section className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow">Cutoff page</p>
          <h1 className="display-title mt-4 text-5xl font-semibold text-slate-950 md:text-6xl">
            {data.exam.name} {data.year} Cutoff
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Category-wise cutoff marks with linked subpages and year-over-year
            trend visualization.
          </p>
        </div>
        <CutoffChart
          data={data.chartData.map((item) => ({
            year: item.year,
            value: item.averageCutoff,
          }))}
          label="Average cutoff by year"
        />
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Cutoff table" title="Category-wise cutoff marks" />
        <div className="mt-8">
          <DataTable
            columns={["Category", "Cutoff"]}
            rows={data.cutoffRows.map((row) => [row.category, row.cutoffMarks])}
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Category pages" title="Drill into each category" />
        <div className="mt-8 flex flex-wrap gap-3">
          {data.cutoffRows.map((row) => (
            <Link
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
              href={`/cutoffs/${examYear}/${slugifyCategory(row.category)}`}
              key={row.id}
            >
              {row.category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
