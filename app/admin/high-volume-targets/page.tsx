import Link from "next/link";
import { redirect } from "next/navigation";

import { SectionHeading } from "@/components/ui/section-heading";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getTargetSummary,
  highVolumePageTargets,
  officialEcosystemNotes,
} from "@/lib/high-volume-targets";

export default async function HighVolumeTargetsPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin");
  }

  const summary = getTargetSummary();

  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="Content roadmap"
        title="High-volume India exam page targets"
        description="This is the first prioritized 100-page inventory to build. It mirrors search intent and information density, but not competitor wording."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="card rounded-[2rem] p-6">
          <p className="text-sm font-medium text-slate-500">Target exams</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {summary.totalExams}
          </p>
        </div>
        <div className="card rounded-[2rem] p-6">
          <p className="text-sm font-medium text-slate-500">Target pages</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">
            {summary.totalTargets}
          </p>
        </div>
        <div className="card rounded-[2rem] p-6">
          <p className="text-sm font-medium text-slate-500">Primary year</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">2026</p>
        </div>
      </div>

      <section className="mt-10 card rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold text-slate-950">Official source map</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {officialEcosystemNotes.map((item) => (
            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5" key={item.ecosystem}>
              <p className="text-lg font-semibold text-slate-950">{item.ecosystem}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.note}</p>
              <a
                className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline"
                href={item.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                {item.sourceLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-slate-950">Prioritized page list</h2>
          <Link
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            href="/admin"
          >
            Back to admin
          </Link>
        </div>
        <div className="card overflow-hidden rounded-[2rem]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Exam</th>
                  <th className="px-4 py-3">Ecosystem</th>
                  <th className="px-4 py-3">Page Type</th>
                  <th className="px-4 py-3">Target Slug</th>
                  <th className="px-4 py-3">Rationale</th>
                  <th className="px-4 py-3">Official Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {highVolumePageTargets.map((target, index) => (
                  <tr key={`${target.targetSlug}-${index}`}>
                    <td className="px-4 py-4 font-semibold text-slate-950">{index + 1}</td>
                    <td className="px-4 py-4 text-slate-950">{target.examName}</td>
                    <td className="px-4 py-4 text-slate-700">{target.ecosystem}</td>
                    <td className="px-4 py-4 text-slate-700">{target.pageType}</td>
                    <td className="px-4 py-4 font-mono text-xs text-blue-700">
                      {target.targetSlug}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{target.rationale}</td>
                    <td className="px-4 py-4">
                      <a
                        className="text-blue-700 underline"
                        href={target.officialSourceUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {target.officialSourceLabel}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
