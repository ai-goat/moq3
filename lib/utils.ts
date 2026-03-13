export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(value));
}

export function formatCompactDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function toTitleCase(value: string) {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function parseExamYearSlug(value: string) {
  const match = value.match(/^(.*)-(\d{4})$/);

  if (!match) {
    return null;
  }

  return {
    examSlug: match[1],
    year: Number(match[2]),
  };
}

export function buildExamYearSlug(examSlug: string, year: number) {
  return `${examSlug}-${year}`;
}

export function buildIntentPageHref(
  pageType: string,
  examSlug: string,
  year: number,
) {
  return `/${pageType}/${buildExamYearSlug(examSlug, year)}`;
}

export function safePercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

export function splitParagraphs(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseKeyValueLines(value: string) {
  return splitParagraphs(value).map((line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return {
        label: "",
        value: line,
      };
    }

    return {
      label: line.slice(0, separatorIndex).trim(),
      value: line.slice(separatorIndex + 1).trim(),
    };
  });
}

export function normalizeCategory(value: string) {
  return value.replace(/-/g, " ").toUpperCase();
}

export function slugifyCategory(value: string) {
  return value.toLowerCase();
}

export function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, item) => sum + item, 0) / values.length;
}

export function buildSeoSlug(examSlug: string, variant: string, year?: number) {
  if (variant === "result" || variant === "cutoff") {
    return `${examSlug}-${variant}-${year}`;
  }

  return `${examSlug}-${variant}`;
}
