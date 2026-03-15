import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/metadata";
import { env } from "@/lib/env";
import { formatDate } from "@/lib/utils";

export const revalidate = 1800;

const PAGE_TITLE =
  "Anuj Agnihotri UPSC 2025 Marksheet Breakdown & Optional Subject Score";
const PAGE_SLUG = "/news/anuj-agnihotri-upsc-2025-marksheet";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description:
    "Live status on UPSC 2025 marksheet release, reported marks totals, and how to check optional subject score on the official UPSC marksheet portal.",
  canonical: PAGE_SLUG,
});

const faq = [
  {
    question: "Is the UPSC 2025 marksheet officially released?",
    answer:
      "UPSC publishes marksheets on the official marksheet portal and releases a marks PDF for recommended candidates in the UPSC marks archive. Check both official sources for the first release.",
  },
  {
    question: "Where can I download the UPSC marksheet?",
    answer:
      "Use the UPSC marksheet portal. You will need your roll number and date of birth to access your marksheet when it is released.",
  },
  {
    question: "Will the optional subject score be shown?",
    answer:
      "Optional paper scores are part of the detailed marksheet. They become visible only when UPSC publishes the marksheet for the year.",
  },
  {
    question: "Are the reported marks for Anuj Agnihotri official?",
    answer:
      "News outlets have reported total marks and the written/interview split. Official confirmation comes from the UPSC marksheet and marks PDFs once published.",
  },
];

export default function AnujAgnihotriUPSCMarksheetPage() {
  const lastUpdated = formatDate(new Date());
  const shareUrl = encodeURIComponent(`${env.siteUrl}${PAGE_SLUG}`);
  const shareText = encodeURIComponent(
    "UPSC 2025 marksheet status + Anuj Agnihotri marks breakdown",
  );

  return (
    <div className="shell py-14">
      <StructuredData data={buildFaqJsonLd(faq)} />
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: "UPSC 2025 marksheet", path: PAGE_SLUG },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "UPSC 2025 marksheet update" },
        ]}
      />

      <section className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Live update</p>
          <h1 className="display-title mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">
            {PAGE_TITLE}
          </h1>
          <p className="mt-4 text-base text-slate-500">Last updated: {lastUpdated}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Fast, verified status on the UPSC 2025 marksheet release, reported
            total marks, and where to check the optional subject score once the
            official scorecard is available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              href="https://upsconline.gov.in/marksheet/exam/marksheet_system/archives.php"
              rel="noreferrer"
              target="_blank"
            >
              UPSC marksheet portal
            </Link>
            <Link
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
              href="https://upsc.gov.in/examinations/marks-recommended-candidates/archives"
              rel="noreferrer"
              target="_blank"
            >
              UPSC marks archive
            </Link>
          </div>
        </div>
        <div className="card rounded-[2rem] p-6">
          <img
            alt="UPSC marksheet preview illustration"
            className="w-full rounded-2xl border border-slate-100 bg-white"
            src="/images/scorecard-hero.svg"
          />
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-4 py-2">
              UPSC 2025 scorecard
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2">
              Optional subject score
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2">
              Marksheet download
            </span>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="Reported marks"
            title="Anuj Agnihotri reported total marks (news)"
            description="These numbers are reported by national news outlets and will be confirmed once UPSC publishes the marksheet."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-sm text-slate-500">Total marks</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">1071</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-sm text-slate-500">Written (Mains)</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">867</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-sm text-slate-500">Interview</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">204</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            Source: NDTV Profit (reported totals and the written/interview split;
            detailed scorecard release noted as forthcoming).
          </p>
        </div>

        <div className="card rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="Official status"
            title="Where the official marksheet appears first"
            description="Use these two official sources to confirm the final marksheet release."
          />
          <ul className="mt-6 grid gap-4 text-sm text-slate-600">
            <li>
              UPSC marksheet portal (individual marksheet via roll number + DOB).
            </li>
            <li>
              UPSC marks archive (marks PDF for recommended candidates).
            </li>
          </ul>
          <div className="mt-6 grid gap-3">
            <Link
              className="rounded-2xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
              href="https://upsconline.gov.in/marksheet/exam/marksheet_system/archives.php"
              rel="noreferrer"
              target="_blank"
            >
              Open UPSC marksheet portal
            </Link>
            <Link
              className="rounded-2xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
              href="https://upsc.gov.in/examinations/marks-recommended-candidates/archives"
              rel="noreferrer"
              target="_blank"
            >
              Open UPSC marks archive
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="Optional subject score"
            title="How to check the optional score once released"
            description="Optional paper scores become visible only when UPSC publishes the detailed marksheet."
          />
          <ol className="mt-6 grid gap-4 text-sm text-slate-600">
            <li>Open the UPSC marksheet portal.</li>
            <li>Select Civil Services Examination and the relevant year.</li>
            <li>Enter roll number and date of birth to access the marksheet.</li>
            <li>Look for Optional Paper I and Optional Paper II rows in the scorecard.</li>
          </ol>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            The public marks PDF usually shows total written/interview marks; the
            detailed paper-wise breakdown is visible in the marksheet.
          </p>
        </div>

        <div className="card rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="Share & follow"
            title="Quick share links"
            description="Share this live status page on X or search the latest UPSC updates."
          />
          <div className="mt-6 grid gap-3">
            <Link
              className="rounded-2xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              rel="noreferrer"
              target="_blank"
            >
              Share on X
            </Link>
            <Link
              className="rounded-2xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
              href="https://twitter.com/search?q=UPSC%202025%20marksheet"
              rel="noreferrer"
              target="_blank"
            >
              Search X for “UPSC 2025 marksheet”
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="UPSC 2025 marksheet FAQs"
          description="Concise answers to the most searched questions."
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {faq.map((item) => (
            <div className="card rounded-[2rem] p-6" key={item.question}>
              <p className="text-base font-semibold text-slate-950">{item.question}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Sources"
          title="Official and news references"
          description="We link only to official UPSC sources and major news coverage."
        />
        <div className="mt-6 grid gap-3 text-sm text-slate-600">
          <Link
            className="rounded-2xl border border-slate-100 px-4 py-3 transition hover:border-sky-200 hover:bg-sky-50"
            href="https://upsconline.gov.in/marksheet/exam/marksheet_system/archives.php"
            rel="noreferrer"
            target="_blank"
          >
            UPSC marksheet portal
          </Link>
          <Link
            className="rounded-2xl border border-slate-100 px-4 py-3 transition hover:border-sky-200 hover:bg-sky-50"
            href="https://upsc.gov.in/examinations/marks-recommended-candidates/archives"
            rel="noreferrer"
            target="_blank"
          >
            UPSC marks archive (recommended candidates)
          </Link>
          <Link
            className="rounded-2xl border border-slate-100 px-4 py-3 transition hover:border-sky-200 hover:bg-sky-50"
            href="https://www.ndtvprofit.com/education/upsc-result-2025-anuj-agnihotri-tops-civil-services-exam-scores-1071-marks"
            rel="noreferrer"
            target="_blank"
          >
            NDTV Profit coverage (reported marks totals)
          </Link>
        </div>
      </section>
    </div>
  );
}
