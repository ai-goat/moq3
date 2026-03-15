import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DataTable } from "@/components/ui/data-table";
import { ProseBlock } from "@/components/ui/prose-block";
import { StructuredData } from "@/components/ui/structured-data";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/json-ld";
import {
  buildIntentPageHref,
  formatDate,
  formatNumber,
  parseKeyValueLines,
  toTitleCase,
} from "@/lib/utils";
import type { EnrichedExam, ExamUpdate } from "@/types/domain";

function FactGrid({
  leftItems,
  leftTitle,
  rightItems,
  rightTitle,
}: {
  leftItems: Array<{ label: string; value: string }>;
  leftTitle: string;
  rightItems: Array<{ label: string; value: string }>;
  rightTitle: string;
}) {
  return (
    <section className="overflow-hidden rounded-md border border-stone-400 bg-white">
      <div className="border-b border-stone-400 px-4 py-3 text-center">
        <p className="text-2xl font-bold text-red-600">Short Details</p>
      </div>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-r border-stone-400">
          <div className="bg-[#7b1238] px-4 py-3 text-center text-xl font-bold text-white">
            {leftTitle}
          </div>
          <div className="divide-y divide-stone-300">
            {leftItems.map((item, index) => (
              <div className="grid gap-1 px-4 py-3 md:grid-cols-[210px_1fr]" key={`${item.label}-${index}`}>
                <div className="font-semibold text-stone-900">{item.label}</div>
                <div className="text-stone-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-[#7b1238] px-4 py-3 text-center text-xl font-bold text-white">
            {rightTitle}
          </div>
          <div className="divide-y divide-stone-300">
            {rightItems.map((item, index) => (
              <div className="grid gap-1 px-4 py-3 md:grid-cols-[210px_1fr]" key={`${item.label}-${index}`}>
                <div className="font-semibold text-stone-900">{item.label}</div>
                <div className="text-stone-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DenseSection({
  body,
  title,
}: {
  body: string;
  title: string;
}) {
  if (!body.trim()) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-md border border-stone-400 bg-white">
      <div className="bg-[#004f8b] px-4 py-3 text-center text-xl font-bold text-white">
        {title}
      </div>
      <div className="px-4 py-4 text-[1rem] leading-8 text-stone-800">
        <ProseBlock body={body} />
      </div>
    </section>
  );
}

function LinkPanel({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <section className="overflow-hidden rounded-md border border-stone-400 bg-white">
      <div className="bg-[#198754] px-4 py-3 text-center text-xl font-bold text-white">
        Important Links
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <a
            className="rounded-sm border border-stone-400 px-4 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            href={link.href}
            key={`${link.href}-${link.label}`}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function UpdateIntentPage({
  exam,
  faq,
  pageType,
  update,
  year,
}: {
  exam: EnrichedExam;
  faq: Array<{ question: string; answer: string }>;
  pageType: "notification" | "admit-card" | "answer-key";
  update: ExamUpdate;
  year: number;
}) {
  const importantDates = parseKeyValueLines(
    exam.contents.find((item) => item.contentType === "important_dates")?.body ?? "",
  );
  const applicationFee = parseKeyValueLines(
    exam.contents.find((item) => item.contentType === "application_fee")?.body ?? "",
  );
  const ageLimit = parseKeyValueLines(
    exam.contents.find((item) => item.contentType === "age_limit")?.body ?? "",
  );
  const vacancy = parseKeyValueLines(
    exam.contents.find((item) => item.contentType === "vacancy_details")?.body ?? "",
  );
  const selectionProcess =
    exam.contents.find((item) => item.contentType === "selection_process")?.body ?? "";
  const eligibility =
    exam.contents.find((item) => item.contentType === "eligibility")?.body ?? "";
  const howTo =
    pageType === "answer-key"
      ? exam.contents.find((item) => item.contentType === "how_to_check_answer_key")?.body ??
        ""
      : `Visit the official portal, open the ${toTitleCase(pageType)} section, sign in using your exam credentials if required, and download the document.`;

  const hasResult = exam.results.some((item) => item.year === year);
  const hasCutoff = exam.cutoffs.some((item) => item.year === year);
  const internalLinks = [
    ...(hasResult
      ? [
          {
            href: buildIntentPageHref("result", exam.slug, year),
            label: `${exam.name} Result ${year}`,
          },
        ]
      : []),
    ...(hasCutoff
      ? [
          {
            href: buildIntentPageHref("cutoff", exam.slug, year),
            label: `${exam.name} Cutoff ${year}`,
          },
        ]
      : []),
    {
      href: `/exam/${exam.slug}`,
      label: `${exam.name} Overview`,
    },
    {
      href: update.officialLink,
      label: `Official ${toTitleCase(pageType)} Link`,
    },
  ];

  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <StructuredData
        data={buildFaqJsonLd(faq)}
      />
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: toTitleCase(pageType), path: `/${pageType}/${exam.slug}-${year}` },
          { name: `${exam.name} ${year}`, path: `/${pageType}/${exam.slug}-${year}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: `${exam.name} ${toTitleCase(pageType)} ${year}` },
        ]}
      />

      <section className="mt-5 rounded-md border border-stone-400 bg-white px-5 py-5">
        <h1 className="text-[2rem] leading-tight font-bold text-blue-800 md:text-[2.3rem]">
          {exam.name} {toTitleCase(pageType)} {year}
        </h1>
        <p className="mt-3 text-lg font-bold text-red-600">
          Post Date:{" "}
          <span className="text-stone-900">
            {update.updateDate ? formatDate(update.updateDate) : "Will be updated soon"}
          </span>
        </p>
        <div className="mt-5 text-[1.18rem] leading-10 text-stone-900">
          <span className="font-bold text-blue-800">{exam.conductingBody}</span> has
          published the{" "}
          <span className="font-bold">{toTitleCase(pageType)}</span> update for{" "}
          <span className="font-bold">{exam.name}</span>. {update.body}
        </div>
      </section>

      <div className="mt-6">
        <FactGrid
          leftItems={importantDates}
          leftTitle="Important Dates"
          rightItems={applicationFee.length > 0 ? applicationFee : ageLimit}
          rightTitle={applicationFee.length > 0 ? "Application Fee" : "Age Limit"}
        />
      </div>

      <div className="mt-6 grid gap-6">
        <DenseSection body={vacancy.map((item) => `${item.label}: ${item.value}`).join("\n")} title="Vacancy Details" />
        <DenseSection body={eligibility} title="Eligibility Details" />
        <DenseSection body={selectionProcess} title="Selection Process" />
        <DenseSection body={howTo} title={`How To Check ${toTitleCase(pageType)}`} />
        <LinkPanel links={internalLinks} />
      </div>
    </div>
  );
}

export function ResultIntentPage({
  currentCutoff,
  exam,
  examStat,
  faq,
  previousCutoff,
  result,
  steps,
  year,
}: {
  currentCutoff: Array<{ category: string; cutoffMarks: number }>;
  exam: EnrichedExam;
  examStat: { vacancies: number; selectionRatio: number } | undefined;
  faq: Array<{ question: string; answer: string }>;
  previousCutoff: Array<{ category: string; cutoffMarks: number }>;
  result: {
    officialResultLink: string;
    resultDate: string;
    selectedCandidates: number;
    status: string;
    totalCandidates: number;
  };
  steps: string[];
  year: number;
}) {
  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <StructuredData data={buildFaqJsonLd(faq)} />
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Result", path: `/result/${exam.slug}-${year}` },
          { name: `${exam.name} ${year}`, path: `/result/${exam.slug}-${year}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: `${exam.name} Result ${year}` },
        ]}
      />

      <section className="mt-5 rounded-md border border-stone-400 bg-white px-5 py-5">
        <h1 className="text-[2rem] leading-tight font-bold text-blue-800 md:text-[2.3rem]">
          {exam.name} Result {year}
        </h1>
        <p className="mt-3 text-lg font-bold text-red-600">
          Result Date: <span className="text-stone-900">{formatDate(result.resultDate)}</span>
        </p>
        <div className="mt-5 text-[1.18rem] leading-10 text-stone-900">
          <span className="font-bold text-blue-800">{exam.conductingBody}</span> has
          updated the result cycle for <span className="font-bold">{exam.name}</span>.
          Candidates can use the direct link below to download the result or scorecard.
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-stone-400 bg-white p-4">
          <p className="text-sm font-semibold text-stone-500">Selected Candidates</p>
          <p className="mt-3 text-3xl font-bold text-stone-950">
            {formatNumber(result.selectedCandidates)}
          </p>
        </div>
        <div className="rounded-md border border-stone-400 bg-white p-4">
          <p className="text-sm font-semibold text-stone-500">Total Candidates</p>
          <p className="mt-3 text-3xl font-bold text-stone-950">
            {formatNumber(result.totalCandidates)}
          </p>
        </div>
        <div className="rounded-md border border-stone-400 bg-white p-4">
          <p className="text-sm font-semibold text-stone-500">Vacancies</p>
          <p className="mt-3 text-3xl font-bold text-stone-950">
            {formatNumber(examStat?.vacancies ?? 0)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <LinkPanel
          links={[
            { href: result.officialResultLink, label: "Official Result Link" },
            ...(exam.cutoffs.some((item) => item.year === year)
              ? [
                  {
                    href: buildIntentPageHref("cutoff", exam.slug, year),
                    label: `${exam.name} Cutoff ${year}`,
                  },
                ]
              : []),
            { href: `/exam/${exam.slug}`, label: `${exam.name} Overview` },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <DenseSection body={steps.join("\n")} title="How To Check Result" />
        <DenseSection
          body={faq.map((item) => `${item.question}\n${item.answer}`).join("\n\n")}
          title="Result FAQ"
        />
      </div>

      {currentCutoff.length > 0 ? (
        <section className="mt-6 rounded-md border border-stone-400 bg-white p-4">
          <div className="bg-[#7b1238] px-4 py-3 text-center text-xl font-bold text-white">
            Previous Year Cutoff Comparison
          </div>
          <div className="mt-4">
            <DataTable
              columns={["Category", `${year - 1}`, `${year}`]}
              rows={currentCutoff.map((item) => [
                item.category,
                previousCutoff.find((row) => row.category === item.category)?.cutoffMarks ?? "-",
                item.cutoffMarks,
              ])}
            />
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-md border border-stone-400 bg-white p-4">
          <div className="bg-[#7b1238] px-4 py-3 text-center text-xl font-bold text-white">
            Cutoff Update
          </div>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            This exam does not publish category-wise cutoffs. Official result
            updates and scorecards are provided through the exam board portals.
          </p>
        </section>
      )}
    </div>
  );
}

export function CutoffIntentPage({
  chartData,
  cutoffRows,
  exam,
  year,
}: {
  chartData: Array<{ year: number; averageCutoff: number }>;
  cutoffRows: Array<{ category: string; cutoffMarks: number }>;
  exam: EnrichedExam;
  year: number;
}) {
  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cutoff", path: `/cutoff/${exam.slug}-${year}` },
          { name: `${exam.name} ${year}`, path: `/cutoff/${exam.slug}-${year}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: `${exam.name} Cutoff ${year}` },
        ]}
      />

      <section className="mt-5 rounded-md border border-stone-400 bg-white px-5 py-5">
        <h1 className="text-[2rem] leading-tight font-bold text-blue-800 md:text-[2.3rem]">
          {exam.name} Cutoff {year}
        </h1>
        <p className="mt-4 text-[1.18rem] leading-10 text-stone-900">
          Category-wise cutoff marks, previous-year comparison, and quick links
          for the {exam.name} cycle.
        </p>
      </section>

      <div className="mt-6">
        <LinkPanel
          links={[
            { href: buildIntentPageHref("result", exam.slug, year), label: `${exam.name} Result ${year}` },
            { href: `/cutoffs/${exam.slug}-${year}`, label: "Detailed Category Cutoff Page" },
            { href: `/exam/${exam.slug}`, label: `${exam.name} Overview` },
          ]}
        />
      </div>

      <section className="mt-6 rounded-md border border-stone-400 bg-white p-4">
        <div className="bg-[#7b1238] px-4 py-3 text-center text-xl font-bold text-white">
          Category Wise Cutoff
        </div>
        <div className="mt-4">
          <DataTable
            columns={["Category", "Cutoff"]}
            rows={cutoffRows.map((item) => [item.category, item.cutoffMarks])}
          />
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-md border border-stone-400 bg-white">
        <div className="bg-[#004f8b] px-4 py-3 text-center text-xl font-bold text-white">
          Previous Year Trend
        </div>
        <div className="divide-y divide-stone-300">
          {chartData.map((item) => (
            <div className="grid gap-1 px-4 py-3 md:grid-cols-[180px_1fr]" key={item.year}>
              <div className="font-semibold text-stone-900">{item.year}</div>
              <div className="text-stone-800">
                Average cutoff: {item.averageCutoff.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
