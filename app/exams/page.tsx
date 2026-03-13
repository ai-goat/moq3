import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { buildIntentPageHref, formatNumber } from "@/lib/utils";
import { getExamDirectory } from "@/services/public";

export const metadata: Metadata = {
  title: "All Exams",
  description: "Explore all tracked exams, results, cutoffs, and analysis pages.",
  alternates: {
    canonical: "/exams",
  },
};

export const revalidate = 3600;

export default async function ExamsPage() {
  const exams = await getExamDirectory();

  return (
    <div className="shell py-14">
      <SectionHeading
        description="Directory pages are organized for scalable indexing across exam, result, and cutoff intents."
        eyebrow="Exam directory"
        title="All tracked exams"
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {exams.map((exam) => (
          <article className="card rounded-[2rem] p-6" key={exam.slug}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{exam.category}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  {exam.name}
                </h2>
              </div>
              <Link
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                href={`/exam/${exam.slug}`}
              >
                Open
              </Link>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {exam.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                className="rounded-2xl bg-slate-50 px-4 py-4 transition hover:bg-slate-100"
                href={
                  exam.latestResult
                    ? buildIntentPageHref("result", exam.slug, exam.latestResult.year)
                    : `/exam/${exam.slug}`
                }
              >
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Latest result
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {exam.latestResult ? exam.latestResult.year : "No data"}
                </p>
              </Link>
              <div className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Candidate volume
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {exam.latestResult
                    ? formatNumber(exam.latestResult.totalCandidates)
                    : "No data"}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
