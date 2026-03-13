export interface Exam {
  id: string;
  name: string;
  slug: string;
  conductingBody: string;
  category: string;
  officialWebsite: string;
  description: string;
  createdAt: string;
}

export interface Result {
  id: string;
  examId: string;
  year: number;
  resultDate: string;
  officialResultLink: string;
  status: "announced" | "expected" | "upcoming";
  totalCandidates: number;
  selectedCandidates: number;
}

export interface Cutoff {
  id: string;
  examId: string;
  year: number;
  category: string;
  cutoffMarks: number;
}

export interface ExamStat {
  id: string;
  examId: string;
  year: number;
  vacancies: number;
  candidates: number;
  selectionRatio: number;
}

export interface ContentBlock {
  id: string;
  examId: string;
  contentType: string;
  body: string;
  createdAt: string;
}

export interface ExamUpdate {
  id: string;
  examId: string;
  year: number;
  updateType:
    | "notification"
    | "application"
    | "exam-city"
    | "admit-card"
    | "answer-key"
    | "result"
    | "cutoff"
    | "notice";
  title: string;
  updateDate: string | null;
  officialLink: string;
  status: "published" | "upcoming" | "archived";
  body: string;
}

export interface EnrichedExam extends Exam {
  results: Result[];
  cutoffs: Cutoff[];
  stats: ExamStat[];
  contents: ContentBlock[];
  updates: ExamUpdate[];
  popularityScore: number;
}

export interface SearchDocument {
  id: string;
  slug: string;
  name: string;
  category: string;
  conductingBody: string;
  description: string;
}

export type SeoVariant =
  | "result"
  | "cutoff"
  | "previous-year-cutoff"
  | "expected-cutoff"
  | "selection-ratio"
  | "marks-vs-rank";
