import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Exam News Updates | MOQ3",
  description:
    "Fast, verified updates on exam news, marksheets, and official result announcements.",
  canonical: "/news",
});

export default function NewsPage() {
  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="News"
        title="Latest exam news updates"
        description="Fast status updates with official links and quick summaries."
      />
      <div className="mt-8 grid gap-4">
        <Link
          className="card rounded-[2rem] p-6 transition hover:-translate-y-1"
          href="/news/anuj-agnihotri-upsc-2025-marksheet"
        >
          <p className="text-sm font-medium text-slate-500">UPSC 2025</p>
          <p className="mt-3 text-xl font-semibold text-slate-950">
            Anuj Agnihotri UPSC 2025 marksheet breakdown & optional subject score
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Live status page with official UPSC links and reported marks totals.
          </p>
        </Link>
      </div>
    </div>
  );
}
