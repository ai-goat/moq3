export const SITE_NAME = "MOQ3";
export const SITE_TITLE = "MOQ3 - Result Intelligence Platform";
export const SITE_DESCRIPTION =
  "Exam results, cutoff analysis, historical statistics, and official update tracking for competitive and academic exams across India.";

export const PAGE_REVALIDATE_SECONDS = 60 * 60;
export const SEARCH_INDEX_NAME = "exams";

export const NAV_ITEMS = [
  { href: "/exams", label: "Exams" },
  { href: "/exam-calendar", label: "Calendar" },
  { href: "/search", label: "Search" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const RESULT_STATUSES = ["announced", "expected", "upcoming"] as const;
export const CUTOFF_CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];

export const SEO_VARIANTS = [
  "result",
  "cutoff",
  "previous-year-cutoff",
  "expected-cutoff",
  "selection-ratio",
  "marks-vs-rank",
] as const;
