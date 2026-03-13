import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CutoffChart } from "@/components/ui/cutoff-chart";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { getCutoffCategoryPageData, getStaticCollections } from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.cutoffCategoryParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examYear: string; category: string }>;
}): Promise<Metadata> {
  const { examYear, category } = await params;
  const data = await getCutoffCategoryPageData(examYear, category);

  if (!data) {
    return {};
  }

  return {
    title: `${data.exam.name} ${data.year} ${data.category} Cutoff`,
    description: `${data.exam.name} ${data.year} ${data.category} cutoff with historical year comparison.`,
  };
}

export default async function CutoffCategoryPage({
  params,
}: {
  params: Promise<{ examYear: string; category: string }>;
}) {
  const { examYear, category } = await params;
  const data = await getCutoffCategoryPageData(examYear, category);

  if (!data) {
    notFound();
  }

  return (
    <div className="shell py-14">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Exams", path: "/exams" },
          { name: `${data.exam.name} ${data.year}`, path: `/cutoffs/${examYear}` },
          {
            name: `${data.category} cutoff`,
            path: `/cutoffs/${examYear}/${category}`,
          },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exams", label: "Exams" },
          { href: `/cutoffs/${examYear}`, label: `${data.exam.name} ${data.year}` },
          { label: `${data.category} cutoff` },
        ]}
      />
      <section className="mt-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="eyebrow">Category cutoff</p>
          <h1 className="display-title mt-4 text-5xl font-semibold text-slate-950 md:text-6xl">
            {data.exam.name} {data.year} {data.category} Cutoff
          </h1>
        </div>
        <StatCard label="Current cutoff" value={data.current.cutoffMarks.toFixed(1)} />
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Historical comparison" title="Year-wise movement" />
        <div className="mt-8">
          <CutoffChart
            data={data.history.map((item) => ({
              year: item.year,
              value: item.cutoffMarks,
            }))}
            label={`${data.category} cutoff history`}
          />
        </div>
      </section>
    </div>
  );
}
