import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CutoffChart } from "@/components/ui/cutoff-chart";
import { ProseBlock } from "@/components/ui/prose-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import {
  formatCompactDate,
  formatDate,
  formatNumber,
  parseKeyValueLines,
  safePercentage,
  splitParagraphs,
  toTitleCase,
} from "@/lib/utils";
import {
  getCutoffCards,
  getExamBySlug,
  getExamContent,
  getExamUpdates,
  getNormalizedCutoffHistory,
  getResultCards,
  getStaticCollections,
} from "@/services/public";

export const revalidate = 3600;

type FactItem = {
  label: string;
  value: string;
};

function DenseFactTable({
  items,
  title,
  accent = "from-rose-800 to-fuchsia-900",
}: {
  items: FactItem[];
  title: string;
  accent?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-md border border-stone-400 bg-white">
      <div className={`bg-gradient-to-r ${accent} px-4 py-3 text-center text-xl font-bold text-white`}>
        {title}
      </div>
      <div className="divide-y divide-stone-300">
        {items.map((item, index) => (
          <div className="grid gap-1 px-4 py-3 md:grid-cols-[230px_1fr]" key={`${item.label}-${index}`}>
            <div className="font-semibold text-stone-900">
              {item.label || "Detail"}
            </div>
            <div className="text-stone-800">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DenseListTable({
  items,
  title,
  accent = "from-rose-800 to-fuchsia-900",
}: {
  items: string[];
  title: string;
  accent?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-md border border-stone-400 bg-white">
      <div className={`bg-gradient-to-r ${accent} px-4 py-3 text-center text-xl font-bold text-white`}>
        {title}
      </div>
      <ul className="grid gap-0">
        {items.map((item, index) => (
          <li
            className="border-t border-stone-300 px-4 py-3 text-stone-800 first:border-t-0"
            key={`${item}-${index}`}
          >
            <span className="mr-2 font-bold text-rose-700">•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function UpdateLinkGrid({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <a
          className="rounded-sm border border-stone-400 bg-white px-4 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          href={link.href}
          key={`${link.href}-${link.label}`}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function DenseUpdateTemplate({
  exam,
  overview,
  importantDates,
  applicationFee,
  ageLimit,
  vacancyDetails,
  eligibility,
  selectionProcess,
  howToCheckAnswerKey,
  updates,
}: {
  exam: Awaited<ReturnType<typeof getExamBySlug>> extends infer T
    ? NonNullable<T>
    : never;
  overview: string;
  importantDates: string;
  applicationFee: string;
  ageLimit: string;
  vacancyDetails: string;
  eligibility: string;
  selectionProcess: string;
  howToCheckAnswerKey: string;
  updates: ReturnType<typeof getExamUpdates>;
}) {
  const latestUpdate = updates[0];
  const summaryParagraphs = splitParagraphs(overview);
  const intro = summaryParagraphs[0] ?? exam.description;
  const dateFacts = parseKeyValueLines(importantDates);
  const feeFacts = parseKeyValueLines(applicationFee);
  const ageFacts = parseKeyValueLines(ageLimit);
  const vacancyFacts = parseKeyValueLines(vacancyDetails);
  const eligibilityItems = splitParagraphs(eligibility);
  const processItems = splitParagraphs(selectionProcess);
  const answerKeyItems = splitParagraphs(howToCheckAnswerKey);
  const quickLinks = updates.slice(0, 6).map((update) => ({
    href: update.officialLink,
    label: update.title,
  }));

  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Exams", path: "/exams" },
          { name: exam.name, path: `/exam/${exam.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exams", label: "Exams" },
          { label: exam.name },
        ]}
      />

      <section className="mt-5 rounded-md border border-stone-400 bg-white px-5 py-5">
        <h1 className="text-[2rem] leading-tight font-bold text-blue-800 md:text-[2.3rem]">
          {latestUpdate?.title || `${exam.name} Update`}
        </h1>
        <p className="mt-3 text-lg font-bold text-red-600">
          Post Date:{" "}
          <span className="text-stone-900">
            {latestUpdate?.updateDate
              ? formatDate(latestUpdate.updateDate)
              : "Will be updated soon"}
          </span>
        </p>
        <div className="mt-5 text-[1.22rem] leading-10 text-stone-900">
          <span className="font-bold text-blue-800">{exam.conductingBody}</span>{" "}
          has released the{" "}
          <span className="font-bold">
            {latestUpdate ? toTitleCase(latestUpdate.updateType) : "latest update"}
          </span>{" "}
          for the{" "}
          <span className="font-bold">{exam.name}</span> examination cycle. {intro}
        </div>
      </section>

      <section className="mt-6 rounded-md border border-stone-400 bg-white">
        <div className="border-b border-stone-400 px-4 py-3 text-center">
          <h2 className="text-2xl font-bold text-red-600">{exam.name}</h2>
          <p className="mt-1 text-xl font-bold text-green-700">
            Short Details
          </p>
          <p className="mt-1 text-lg font-bold text-blue-800">MOQ3 Result Intelligence Platform</p>
        </div>
        <div className="grid gap-0 md:grid-cols-2">
          <DenseFactTable items={dateFacts} title="Important Dates" />
          <DenseFactTable items={feeFacts} title="Application Fee" />
          <DenseFactTable
            accent="from-cyan-800 to-sky-900"
            items={ageFacts}
            title="Age Limit"
          />
          <DenseFactTable
            accent="from-cyan-800 to-sky-900"
            items={vacancyFacts}
            title="Vacancy Details"
          />
        </div>
      </section>

      <div className="mt-6 grid gap-6">
        <DenseListTable
          accent="from-amber-700 to-orange-800"
          items={eligibilityItems}
          title="Eligibility Details"
        />
        <DenseListTable
          accent="from-emerald-700 to-teal-800"
          items={processItems}
          title="Selection Process"
        />
        <DenseListTable
          accent="from-violet-800 to-indigo-900"
          items={answerKeyItems}
          title="How To Check Answer Key"
        />
      </div>

      <section className="mt-6 rounded-md border border-stone-400 bg-white p-4">
        <h2 className="text-center text-2xl font-bold text-red-600">
          Important Links
        </h2>
        <div className="mt-4">
          <UpdateLinkGrid links={quickLinks} />
        </div>
      </section>

      <section className="mt-6 rounded-md border border-stone-400 bg-white p-4">
        <h2 className="text-center text-2xl font-bold text-red-600">
          Latest Updates
        </h2>
        <div className="mt-4 divide-y divide-stone-300">
          {updates.map((update) => (
            <article className="grid gap-2 py-4 md:grid-cols-[170px_1fr_170px]" key={update.id}>
              <div className="font-semibold text-stone-900">
                {update.updateDate ? formatCompactDate(update.updateDate) : "Pending"}
              </div>
              <div>
                <p className="font-bold text-blue-800">{update.title}</p>
                <p className="mt-1 text-sm leading-7 text-stone-700">{update.body}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-bold text-green-700">{toTitleCase(update.updateType)}</p>
                <a
                  className="mt-2 inline-flex text-sm font-semibold text-blue-700 underline"
                  href={update.officialLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Link
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function DefaultExamTemplate({
  exam,
  overview,
  prediction,
  selectionProcess,
  latestStat,
  cutoffTrend,
}: {
  exam: Awaited<ReturnType<typeof getExamBySlug>> extends infer T
    ? NonNullable<T>
    : never;
  overview: string;
  prediction: string;
  selectionProcess: string;
  latestStat: NonNullable<Awaited<ReturnType<typeof getExamBySlug>>>["stats"][number] | undefined;
  cutoffTrend: Array<{ year: number; value: number }>;
}) {
  return (
    <div className="shell py-14">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Exams", path: "/exams" },
          { name: exam.name, path: `/exam/${exam.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exams", label: "Exams" },
          { label: exam.name },
        ]}
      />

      <section className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">{exam.category}</p>
          <h1 className="display-title mt-4 text-5xl font-semibold text-slate-950 md:text-6xl">
            {exam.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {exam.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              href={getResultCards(exam)[0]?.href ?? "/exams"}
            >
              Latest result page
            </Link>
            <Link
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
              href={getCutoffCards(exam)[0]?.href ?? "/exams"}
            >
              Latest cutoff page
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          <StatCard label="Conducting body" value={exam.conductingBody} />
          <StatCard
            label="Latest candidate count"
            value={formatNumber(exam.results[0]?.totalCandidates ?? 0)}
          />
          <StatCard
            detail="Derived from vacancy and candidate history."
            label="Selection ratio"
            value={safePercentage(latestStat?.selectionRatio ?? 0)}
          />
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card rounded-[2rem] p-8">
          <SectionHeading eyebrow="Overview" title="Exam snapshot" />
          <div className="mt-6">
            <ProseBlock body={overview} />
          </div>
        </div>
        <div className="card rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="Selection process"
            title="How the exam is structured"
          />
          <ol className="mt-6 grid gap-4">
            {selectionProcess
              .split("\n")
              .filter(Boolean)
              .map((step, index) => (
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

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Previous results"
            title="Historic result pages"
          />
          <div className="mt-6 grid gap-4">
            {exam.results.map((result) => (
              <Link
                className="card rounded-[2rem] p-5 transition hover:-translate-y-1"
                href={`/results/${exam.slug}-${result.year}`}
                key={result.id}
              >
                <p className="text-lg font-semibold text-slate-950">
                  {exam.name} {result.year} result
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {formatCompactDate(result.resultDate)}
                </p>
              </Link>
            ))}
          </div>
        </div>
        {cutoffTrend.length > 0 ? (
          <CutoffChart data={cutoffTrend} label="General cutoff movement" />
        ) : (
          <div className="card rounded-[2rem] p-8">
            <SectionHeading
              eyebrow="Cutoff trend"
              title="Cutoff data pending"
            />
            <p className="mt-6 text-base leading-8 text-slate-600">
              Category-wise cutoff history will appear here after the result phase
              is completed and official marks are tracked.
            </p>
          </div>
        )}
      </section>

      <section className="mt-16 card rounded-[2rem] p-8">
        <SectionHeading
          description="Predictions combine historical cutoffs, candidate pressure, and vacancy stability."
          eyebrow="Upcoming result predictions"
          title="Next-cycle intelligence"
        />
        <div className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
          {prediction || "Prediction data will appear here once a new result cycle is tracked."}
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const collections = await getStaticCollections();
  return collections.examParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExamBySlug(slug);

  if (!exam) {
    return {};
  }

  return {
    title: `${exam.name} Result, Cutoff, Analysis`,
    description: exam.description,
    alternates: {
      canonical: `/exam/${exam.slug}`,
    },
  };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  const overview = getExamContent(exam, "overview") || exam.description;
  const prediction = getExamContent(exam, "prediction");
  const selectionProcess = getExamContent(exam, "selection_process");
  const importantDates = getExamContent(exam, "important_dates");
  const eligibility = getExamContent(exam, "eligibility");
  const applicationFee = getExamContent(exam, "application_fee");
  const ageLimit = getExamContent(exam, "age_limit");
  const vacancyDetails = getExamContent(exam, "vacancy_details");
  const howToCheckAnswerKey = getExamContent(exam, "how_to_check_answer_key");
  const latestStat = exam.stats[0];
  const updates = getExamUpdates(exam);
  const cutoffTrend = getNormalizedCutoffHistory(exam, "General").map((item) => ({
    year: item.year,
    value: item.cutoffMarks,
  }));

  const shouldUseDenseUpdateTemplate = Boolean(
    importantDates && (applicationFee || vacancyDetails || updates.length > 0),
  );

  if (shouldUseDenseUpdateTemplate) {
    return (
      <DenseUpdateTemplate
        ageLimit={ageLimit}
        applicationFee={applicationFee}
        eligibility={eligibility}
        exam={exam}
        howToCheckAnswerKey={howToCheckAnswerKey}
        importantDates={importantDates}
        overview={overview}
        selectionProcess={selectionProcess}
        updates={updates}
        vacancyDetails={vacancyDetails}
      />
    );
  }

  return (
    <DefaultExamTemplate
      cutoffTrend={cutoffTrend}
      exam={exam}
      latestStat={latestStat}
      overview={overview}
      prediction={prediction}
      selectionProcess={selectionProcess}
    />
  );
}
