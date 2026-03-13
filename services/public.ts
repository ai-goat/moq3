import { unstable_cache } from "next/cache";

import { getDemoEnrichedExams } from "@/lib/demo-data";
import { searchDocuments, syncDocuments } from "@/lib/meilisearch";
import { prisma } from "@/lib/prisma";
import {
  average,
  buildIntentPageHref,
  buildExamYearSlug,
  buildSeoSlug,
  parseExamYearSlug,
  slugifyCategory,
  splitParagraphs,
} from "@/lib/utils";
import { PAGE_REVALIDATE_SECONDS } from "@/lib/constants";
import { isDatabaseConfigured } from "@/lib/env";
import type {
  ContentBlock,
  EnrichedExam,
  ExamUpdate,
  SearchDocument,
  SeoVariant,
} from "@/types/domain";

type IntentPageType =
  | "notification"
  | "admit-card"
  | "answer-key"
  | "result"
  | "cutoff";

function formatIso(value: Date | string) {
  return new Date(value).toISOString();
}

function getPopularityScore(exam: EnrichedExam) {
  const latestCandidates = exam.results[0]?.totalCandidates ?? exam.stats[0]?.candidates ?? 0;
  return Math.round(latestCandidates / 20000);
}

function mapPrismaExam(exam: {
  id: string;
  name: string;
  slug: string;
  conductingBody: string;
  category: string;
  officialWebsite: string;
  description: string;
  createdAt: Date;
  results: Array<{
    id: string;
    examId: string;
    year: number;
    resultDate: Date;
    officialResultLink: string;
    status: string;
    totalCandidates: number;
    selectedCandidates: number;
  }>;
  cutoffs: Array<{
    id: string;
    examId: string;
    year: number;
    category: string;
    cutoffMarks: number;
  }>;
  stats: Array<{
    id: string;
    examId: string;
    year: number;
    vacancies: number;
    candidates: number;
    selectionRatio: number;
  }>;
  contents: Array<{
    id: string;
    examId: string;
    contentType: string;
    body: string;
    createdAt: Date;
  }>;
  updates: Array<{
    id: string;
    examId: string;
    year: number;
    updateType: string;
    title: string;
    updateDate: Date | null;
    officialLink: string;
    status: string;
    body: string;
  }>;
}): EnrichedExam {
  const enriched: EnrichedExam = {
    id: exam.id,
    name: exam.name,
    slug: exam.slug,
    conductingBody: exam.conductingBody,
    category: exam.category,
    officialWebsite: exam.officialWebsite,
    description: exam.description,
    createdAt: formatIso(exam.createdAt),
    results: exam.results.map((result) => ({
      ...result,
      resultDate: formatIso(result.resultDate),
      status: result.status as "announced" | "expected" | "upcoming",
    })),
    cutoffs: exam.cutoffs,
    stats: exam.stats,
    contents: exam.contents.map((content) => ({
      ...content,
      createdAt: formatIso(content.createdAt),
    })),
    updates: exam.updates.map((update) => ({
      ...update,
      updateDate: update.updateDate ? formatIso(update.updateDate) : null,
      status: update.status as "published" | "upcoming" | "archived",
      updateType: update.updateType as ExamUpdate["updateType"],
    })),
    popularityScore: 0,
  };

  enriched.popularityScore = getPopularityScore(enriched);
  return enriched;
}

async function queryAllExams(): Promise<EnrichedExam[]> {
  if (!isDatabaseConfigured) {
    return getDemoEnrichedExams();
  }

  try {
    if (!prisma) {
      return getDemoEnrichedExams();
    }

    const exams = await prisma.exam.findMany({
      include: {
        results: { orderBy: { year: "desc" } },
        cutoffs: { orderBy: [{ year: "desc" }, { category: "asc" }] },
        stats: { orderBy: { year: "desc" } },
        contents: true,
        updates: { orderBy: [{ updateDate: "desc" }, { createdAt: "desc" }] },
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return exams.map(mapPrismaExam);
  } catch {
    return getDemoEnrichedExams();
  }
}

const getCachedExams = unstable_cache(queryAllExams, ["platform-data"], {
  revalidate: PAGE_REVALIDATE_SECONDS,
  tags: ["exams", "results", "cutoffs", "stats", "content"],
});

export async function getAllExams() {
  if (process.env.NODE_ENV !== "production") {
    return queryAllExams();
  }

  return getCachedExams();
}

export async function getExamBySlug(slug: string) {
  const exams = await getAllExams();
  return exams.find((exam) => exam.slug === slug) ?? null;
}

function getContent(exam: EnrichedExam, contentType: string) {
  return exam.contents.find((item) => item.contentType === contentType)?.body ?? "";
}

function getLatestCutoffGroups(exam: EnrichedExam, year: number) {
  return exam.cutoffs.filter((item) => item.year === year);
}

function getCutoffHistoryForCategory(exam: EnrichedExam, category: string) {
  return exam.cutoffs
    .filter((item) => item.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a.year - b.year);
}

function getLatestResult(exam: EnrichedExam) {
  return exam.results[0] ?? null;
}

function buildFaqs(exam: EnrichedExam, year: number) {
  return [
    {
      question: `When will the ${exam.name} ${year} result be declared?`,
      answer: `${exam.name} ${year} result tracking is updated on MOQ3 using official timelines, previous trend windows, and recent recruitment movement.`,
    },
    {
      question: `Where can I download the ${exam.name} result PDF?`,
      answer: `Use the official result link published on the page and verify roll number or registration details on the commission or board website.`,
    },
    {
      question: `What happens after the ${exam.name} result?`,
      answer: `The next stage depends on the exam and may include document verification, skill test, medical, interview, or counselling.`,
    },
  ];
}

export async function getHomepageData() {
  const exams = await getAllExams();
  const allResults = exams.flatMap((exam) =>
    exam.results.map((result) => ({
      ...result,
      exam,
    })),
  );

  const latestResults = allResults
    .filter((item) => item.status === "announced")
    .sort(
      (a, b) =>
        new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime(),
    )
    .slice(0, 6);

  const upcomingResults = allResults
    .filter((item) => item.status !== "announced")
    .sort(
      (a, b) =>
        new Date(a.resultDate).getTime() - new Date(b.resultDate).getTime(),
    )
    .slice(0, 6);

  const categories = Array.from(
    exams.reduce((map, exam) => {
      map.set(exam.category, (map.get(exam.category) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  ).map(([name, count]) => ({ name, count }));

  const popularExams = [...exams]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 5);

  const timeline = allResults
    .sort(
      (a, b) =>
        new Date(a.resultDate).getTime() - new Date(b.resultDate).getTime(),
    )
    .slice(0, 10);

  return {
    categories,
    exams,
    latestResults,
    popularExams,
    timeline,
    upcomingResults,
  };
}

export async function getExamDirectory() {
  const exams = await getAllExams();

  return exams.map((exam) => ({
    ...exam,
    latestResult: getLatestResult(exam),
    previousCutoff: exam.cutoffs[0] ?? null,
  }));
}

export async function getResultPageData(examYearSlug: string) {
  const parsed = parseExamYearSlug(examYearSlug);

  if (!parsed) {
    return null;
  }

  const exam = await getExamBySlug(parsed.examSlug);

  if (!exam) {
    return null;
  }

  const result =
    exam.results.find((item) => item.year === parsed.year) ?? exam.results[0] ?? null;

  if (!result) {
    return null;
  }

  const previousCutoff = getLatestCutoffGroups(exam, parsed.year - 1);
  const currentCutoff = getLatestCutoffGroups(exam, parsed.year);
  const examStat = exam.stats.find((item) => item.year === parsed.year) ?? exam.stats[0];
  const prediction = getContent(exam, "prediction");

  return {
    exam,
    examStat,
    faq: buildFaqs(exam, result.year),
    prediction,
    previousCutoff,
    result,
    steps: [
      "Open the official result link.",
      "Download the merit list or scorecard PDF.",
      "Search using roll number or registration details.",
      "Save the PDF and review the next-stage instructions.",
    ],
    currentCutoff,
  };
}

export async function getCutoffPageData(examYearSlug: string) {
  const parsed = parseExamYearSlug(examYearSlug);

  if (!parsed) {
    return null;
  }

  const exam = await getExamBySlug(parsed.examSlug);

  if (!exam) {
    return null;
  }

  const cutoffRows = getLatestCutoffGroups(exam, parsed.year);

  if (cutoffRows.length === 0) {
    return null;
  }

  const trendYears = Array.from(new Set(exam.cutoffs.map((item) => item.year))).sort();
  const chartData = trendYears.map((year) => ({
    year,
    averageCutoff: average(
      exam.cutoffs
        .filter((item) => item.year === year)
        .map((item) => item.cutoffMarks),
    ),
  }));

  return {
    chartData,
    cutoffRows,
    exam,
    year: parsed.year,
  };
}

export async function getUpdateIntentPageData(
  pageType: Extract<IntentPageType, "notification" | "admit-card" | "answer-key">,
  pageSlug: string,
) {
  const parsed = parseExamYearSlug(pageSlug);

  if (!parsed) {
    return null;
  }

  const exam = await getExamBySlug(parsed.examSlug);

  if (!exam) {
    return null;
  }

  const matchingType =
    pageType === "admit-card"
      ? "admit-card"
      : pageType === "answer-key"
        ? "answer-key"
        : "notification";

  const update =
    exam.updates.find(
      (item) => item.year === parsed.year && item.updateType === matchingType,
    ) ??
    exam.updates.find((item) => item.updateType === matchingType) ??
    null;

  if (!update) {
    return null;
  }

  return {
    exam,
    faq: buildFaqs(exam, parsed.year),
    pageType,
    update,
    year: parsed.year,
  };
}

export async function getResultIntentPageData(pageSlug: string) {
  const data = await getResultPageData(pageSlug);

  if (!data) {
    return null;
  }

  return {
    ...data,
    pageType: "result" as const,
    year: data.result.year,
  };
}

export async function getCutoffIntentPageData(pageSlug: string) {
  const data = await getCutoffPageData(pageSlug);

  if (!data) {
    return null;
  }

  return {
    ...data,
    pageType: "cutoff" as const,
  };
}

export async function getCutoffCategoryPageData(
  examYearSlug: string,
  categorySlug: string,
) {
  const parsed = parseExamYearSlug(examYearSlug);

  if (!parsed) {
    return null;
  }

  const exam = await getExamBySlug(parsed.examSlug);

  if (!exam) {
    return null;
  }

  const category = categorySlug.toUpperCase();
  const current =
    exam.cutoffs.find(
      (item) =>
        item.year === parsed.year && item.category.toUpperCase() === category,
    ) ?? null;

  if (!current) {
    return null;
  }

  return {
    category,
    current,
    exam,
    history: getCutoffHistoryForCategory(exam, category),
    year: parsed.year,
  };
}

export async function getAnalysisPageData(examSlug: string) {
  const exam = await getExamBySlug(examSlug);

  if (!exam) {
    return null;
  }

  const statsTimeline = [...exam.stats].sort((a, b) => a.year - b.year);
  const resultsTimeline = [...exam.results].sort((a, b) => a.year - b.year);
  const generalCutoffs = getCutoffHistoryForCategory(exam, "General");

  return {
    exam,
    generalCutoffs,
    marksVsRank: generalCutoffs.map((item, index) => ({
      rankBand: `${(index + 1) * 100}-${(index + 1) * 250}`,
      marks: item.cutoffMarks + 8,
      year: item.year,
    })),
    resultsTimeline,
    selectionProcess: splitParagraphs(getContent(exam, "selection_process")),
    statsTimeline,
  };
}

export async function getExamCalendarData() {
  const exams = await getAllExams();

  return exams
    .flatMap((exam) =>
      exam.results
        .filter((result) => result.status !== "announced")
        .map((result) => ({
          exam,
          result,
        })),
    )
    .sort(
      (a, b) =>
        new Date(a.result.resultDate).getTime() -
        new Date(b.result.resultDate).getTime(),
    );
}

export async function searchExamPages(query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const meiliResults = await searchDocuments(trimmedQuery).catch(() => null);

  if (meiliResults) {
    return meiliResults;
  }

  const exams = await getAllExams();
  const normalized = trimmedQuery.toLowerCase();

  return exams
    .filter((exam) =>
      [exam.name, exam.slug, exam.category, exam.conductingBody]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    )
    .slice(0, 8)
    .map((exam) => ({
      id: exam.id,
      slug: exam.slug,
      name: exam.name,
      category: exam.category,
      conductingBody: exam.conductingBody,
      description: exam.description,
    }));
}

function resolveSeoVariant(seoSlug: string): {
  examSlug: string;
  variant: SeoVariant;
  year?: number;
} | null {
  const resultMatch = seoSlug.match(/^(.*)-result-(\d{4})$/);

  if (resultMatch) {
    return {
      examSlug: resultMatch[1],
      variant: "result",
      year: Number(resultMatch[2]),
    };
  }

  const cutoffMatch = seoSlug.match(/^(.*)-cutoff-(\d{4})$/);

  if (cutoffMatch) {
    return {
      examSlug: cutoffMatch[1],
      variant: "cutoff",
      year: Number(cutoffMatch[2]),
    };
  }

  const suffixes: Array<{ suffix: SeoVariant; regex: RegExp }> = [
    {
      suffix: "previous-year-cutoff",
      regex: /^(.*)-previous-year-cutoff$/,
    },
    { suffix: "expected-cutoff", regex: /^(.*)-expected-cutoff$/ },
    { suffix: "selection-ratio", regex: /^(.*)-selection-ratio$/ },
    { suffix: "marks-vs-rank", regex: /^(.*)-marks-vs-rank$/ },
  ];

  for (const item of suffixes) {
    const match = seoSlug.match(item.regex);

    if (match) {
      return {
        examSlug: match[1],
        variant: item.suffix,
      };
    }
  }

  return null;
}

export async function getSeoLandingPageData(seoSlug: string) {
  const resolved = resolveSeoVariant(seoSlug);

  if (!resolved) {
    return null;
  }

  const exam = await getExamBySlug(resolved.examSlug);

  if (!exam) {
    return null;
  }

  if (resolved.variant === "result" || resolved.variant === "cutoff") {
    return {
      exam,
      variant: resolved.variant,
      year: resolved.year,
    };
  }

  return {
    exam,
    latestResult: exam.results[0] ?? null,
    latestStat: exam.stats[0] ?? null,
    variant: resolved.variant,
  };
}

export async function getStaticCollections() {
  const exams = await getAllExams();

  return {
    admitCardIntentParams: exams.flatMap((exam) =>
      exam.updates
        .filter((item) => item.updateType === "admit-card")
        .map((item) => ({
          pageSlug: buildExamYearSlug(exam.slug, item.year),
        })),
    ),
    analysisParams: exams.map((exam) => ({ exam: exam.slug })),
    answerKeyIntentParams: exams.flatMap((exam) =>
      exam.updates
        .filter((item) => item.updateType === "answer-key")
        .map((item) => ({
          pageSlug: buildExamYearSlug(exam.slug, item.year),
        })),
    ),
    cutoffCategoryParams: exams.flatMap((exam) =>
      Array.from(new Set(exam.cutoffs.map((item) => item.year))).flatMap((year) =>
        exam.cutoffs
          .filter((item) => item.year === year)
          .map((item) => ({
            examYear: buildExamYearSlug(exam.slug, year),
            category: slugifyCategory(item.category),
          })),
      ),
    ),
    cutoffParams: exams.flatMap((exam) =>
      Array.from(new Set(exam.cutoffs.map((item) => item.year))).map((year) => ({
        examYear: buildExamYearSlug(exam.slug, year),
      })),
    ),
    cutoffIntentParams: exams.flatMap((exam) =>
      Array.from(new Set(exam.cutoffs.map((item) => item.year))).map((year) => ({
        pageSlug: buildExamYearSlug(exam.slug, year),
      })),
    ),
    examParams: exams.map((exam) => ({ slug: exam.slug })),
    exams,
    notificationIntentParams: exams.flatMap((exam) =>
      exam.updates
        .filter((item) => item.updateType === "notification")
        .map((item) => ({
          pageSlug: buildExamYearSlug(exam.slug, item.year),
        })),
    ),
    resultParams: exams.flatMap((exam) =>
      exam.results.map((result) => ({
        examYear: buildExamYearSlug(exam.slug, result.year),
      })),
    ),
    resultIntentParams: exams.flatMap((exam) =>
      exam.results.map((result) => ({
        pageSlug: buildExamYearSlug(exam.slug, result.year),
      })),
    ),
    seoParams: exams.flatMap((exam) => {
      const variants = [
        buildSeoSlug(exam.slug, "previous-year-cutoff"),
        buildSeoSlug(exam.slug, "expected-cutoff"),
        buildSeoSlug(exam.slug, "selection-ratio"),
        buildSeoSlug(exam.slug, "marks-vs-rank"),
      ];

      for (const result of exam.results) {
        variants.push(buildSeoSlug(exam.slug, "result", result.year));
      }

      for (const year of Array.from(new Set(exam.cutoffs.map((item) => item.year)))) {
        variants.push(buildSeoSlug(exam.slug, "cutoff", year));
      }

      return variants.map((seoSlug) => ({ seoSlug }));
    }),
  };
}

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const exams = await getAllExams();

  return exams.map((exam) => ({
    id: exam.id,
    slug: exam.slug,
    name: exam.name,
    category: exam.category,
    conductingBody: exam.conductingBody,
    description: exam.description,
  }));
}

export async function syncSearchIndex() {
  const documents = await getSearchDocuments();
  return syncDocuments(documents);
}

export function getExamContent(exam: EnrichedExam, contentType: string) {
  return getContent(exam, contentType);
}

export function getAllCutoffCategories(exam: EnrichedExam) {
  return Array.from(new Set(exam.cutoffs.map((item) => item.category)));
}

export function getNormalizedCutoffHistory(exam: EnrichedExam, category: string) {
  return getCutoffHistoryForCategory(exam, category);
}

export function getLatestContentParagraphs(content: ContentBlock | string) {
  return splitParagraphs(typeof content === "string" ? content : content.body);
}

export function getResultCards(exam: EnrichedExam) {
  return exam.results.map((result) => ({
    href: buildIntentPageHref("result", exam.slug, result.year),
    label: `${exam.name} ${result.year} result`,
    status: result.status,
  }));
}

export function getCutoffCards(exam: EnrichedExam) {
  return Array.from(new Set(exam.cutoffs.map((item) => item.year))).map((year) => ({
    href: buildIntentPageHref("cutoff", exam.slug, year),
    label: `${exam.name} ${year} cutoff`,
  }));
}

export function getExamUpdates(exam: EnrichedExam) {
  return exam.updates;
}
