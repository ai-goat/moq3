import type { Metadata } from "next";
import Link from "next/link";

import { ResultStatusPill } from "@/components/ui/result-status-pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/metadata";
import { buildIntentPageHref, formatDate } from "@/lib/utils";
import { getExamCalendarData } from "@/services/public";

export const metadata: Metadata = buildPageMetadata({
  title: "Exam Calendar",
  description:
    "Upcoming result declaration calendar with official timelines and expected windows for SSC, UPSC, Railway, CBSE, and other exams.",
  canonical: "/exam-calendar",
});

export const revalidate = 3600;

export default async function ExamCalendarPage() {
  const items = await getExamCalendarData();

  return (
    <div className="shell py-14">
      <SectionHeading
        description="Expected and upcoming result windows for the tracked exam universe."
        eyebrow="Calendar"
        title="Exam result calendar"
      />
      <div className="mt-10 grid gap-4">
        {items.map((item) => (
          <Link
            className="card grid gap-3 rounded-[2rem] p-6 md:grid-cols-[1.1fr_0.9fr_0.5fr]"
            href={buildIntentPageHref("result", item.exam.slug, item.result.year)}
            key={`${item.exam.slug}-${item.result.year}`}
          >
            <div>
              <p className="text-xl font-semibold text-slate-950">
                {item.exam.name} {item.result.year}
              </p>
              <p className="mt-2 text-sm text-slate-500">{item.exam.conductingBody}</p>
            </div>
            <p className="text-sm text-slate-600">{formatDate(item.result.resultDate)}</p>
            <div className="md:text-right">
              <ResultStatusPill status={item.result.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
