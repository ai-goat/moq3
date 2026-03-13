import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/ui/section-heading";
import { getSeoLandingPageData, getStaticCollections } from "@/services/public";

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.seoParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}): Promise<Metadata> {
  const { seoSlug } = await params;
  const data = await getSeoLandingPageData(seoSlug);

  if (!data) {
    return {};
  }

  return {
    title: seoSlug.replace(/-/g, " "),
    description: `${data.exam.name} SEO landing page for organic discovery and internal routing.`,
    alternates: {
      canonical: `/${seoSlug}`,
    },
  };
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ seoSlug: string }>;
}) {
  const { seoSlug } = await params;
  const data = await getSeoLandingPageData(seoSlug);

  if (!data) {
    notFound();
  }

  const primaryHref =
    data.variant === "result" && data.year
      ? `/results/${data.exam.slug}-${data.year}`
      : data.variant === "cutoff" && data.year
        ? `/cutoffs/${data.exam.slug}-${data.year}`
        : `/analysis/${data.exam.slug}`;

  return (
    <div className="shell py-14">
      <SectionHeading
        description="Programmatically generated landing page for search capture and internal routing."
        eyebrow="SEO page"
        title={seoSlug.replace(/-/g, " ")}
      />
      <div className="mt-10 card rounded-[2rem] p-8">
        <p className="text-base leading-8 text-slate-600">
          This page is generated from exam data and routes visitors to the most
          relevant canonical destination for the query intent.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            href={primaryHref}
          >
            Open canonical page
          </Link>
          <Link
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
            href={`/exam/${data.exam.slug}`}
          >
            Exam overview
          </Link>
        </div>
      </div>
    </div>
  );
}
