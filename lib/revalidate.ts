import { revalidatePath, revalidateTag } from "next/cache";

import { buildExamYearSlug } from "@/lib/utils";

export function revalidatePlatformRoutes(examSlug?: string, year?: number) {
  ["exams", "results", "cutoffs", "stats", "content"].forEach((tag) =>
    revalidateTag(tag, "max"),
  );

  revalidatePath("/");
  revalidatePath("/exams");
  revalidatePath("/exam-calendar");
  revalidatePath("/search");

  if (!examSlug) {
    return;
  }

  revalidatePath(`/exam/${examSlug}`);
  revalidatePath(`/analysis/${examSlug}`);

  if (!year) {
    return;
  }

  const examYear = buildExamYearSlug(examSlug, year);
  revalidatePath(`/result/${examYear}`);
  revalidatePath(`/cutoff/${examYear}`);
  revalidatePath(`/cutoffs/${examYear}`);
  revalidatePath(`/${examSlug}-result-${year}`);
  revalidatePath(`/${examSlug}-cutoff-${year}`);
}
