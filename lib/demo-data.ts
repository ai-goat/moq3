import type {
  ContentBlock,
  Cutoff,
  EnrichedExam,
  Exam,
  ExamUpdate,
  ExamStat,
  Result,
} from "@/types/domain";
import { rrbGroupDRegionalCutoffArchive } from "@/lib/imported-content";

const now = new Date("2026-03-13T00:00:00.000Z").toISOString();

export const demoExams: Exam[] = [
  {
    id: "exam_ssc_mts",
    name: "SSC MTS",
    slug: "ssc-mts",
    conductingBody: "Staff Selection Commission",
    category: "SSC",
    officialWebsite: "https://ssc.gov.in",
    description:
      "SSC MTS recruits multitasking staff across central government departments with large candidate volumes and category-wise cutoff movement every year.",
    createdAt: now,
  },
  {
    id: "exam_ssc_mts_havaldar",
    name: "SSC MTS / Havaldar",
    slug: "ssc-mts-havaldar",
    conductingBody: "Staff Selection Commission",
    category: "SSC",
    officialWebsite: "https://ssc.gov.in",
    description:
      "SSC MTS / Havaldar recruitment hub with application dates, vacancy split, answer key updates, eligibility, physical standards, and official notices.",
    createdAt: now,
  },
  {
    id: "exam_upsc_cse",
    name: "UPSC CSE",
    slug: "upsc-cse",
    conductingBody: "Union Public Service Commission",
    category: "UPSC",
    officialWebsite: "https://upsc.gov.in",
    description:
      "UPSC Civil Services Examination is the flagship central recruitment exam with multi-stage selection and strong historical ratio trends.",
    createdAt: now,
  },
  {
    id: "exam_railway_group_d",
    name: "Railway Group D",
    slug: "railway-group-d",
    conductingBody: "Railway Recruitment Board",
    category: "Railway",
    officialWebsite: "https://indianrailways.gov.in",
    description:
      "Railway Group D covers high-volume recruitment for track maintenance, technical support, and operations roles across RRB zones.",
    createdAt: now,
  },
  {
    id: "exam_cbse_12",
    name: "CBSE Class 12",
    slug: "cbse-class-12",
    conductingBody: "Central Board of Secondary Education",
    category: "School Boards",
    officialWebsite: "https://cbse.gov.in",
    description:
      "CBSE Class 12 results drive college admissions and demand annual trend analysis across pass percentage, streams, and result timelines.",
    createdAt: now,
  },
  {
    id: "exam_nda",
    name: "NDA",
    slug: "nda",
    conductingBody: "Union Public Service Commission",
    category: "Defence",
    officialWebsite: "https://upsc.gov.in",
    description:
      "NDA combines written and SSB stages with strong marks-vs-rank interest and recurring cutoff analysis across cycles.",
    createdAt: now,
  },
];

export const demoResults: Result[] = [
  {
    id: "result_ssc_mts_2024",
    examId: "exam_ssc_mts",
    year: 2024,
    resultDate: "2024-12-15T00:00:00.000Z",
    officialResultLink: "https://ssc.gov.in",
    status: "announced",
    totalCandidates: 1820000,
    selectedCandidates: 12840,
  },
  {
    id: "result_ssc_mts_2025",
    examId: "exam_ssc_mts",
    year: 2025,
    resultDate: "2025-12-22T00:00:00.000Z",
    officialResultLink: "https://ssc.gov.in",
    status: "announced",
    totalCandidates: 1915000,
    selectedCandidates: 13220,
  },
  {
    id: "result_ssc_mts_2026",
    examId: "exam_ssc_mts",
    year: 2026,
    resultDate: "2026-04-28T00:00:00.000Z",
    officialResultLink: "https://ssc.gov.in",
    status: "expected",
    totalCandidates: 1980000,
    selectedCandidates: 13600,
  },
  {
    id: "result_upsc_cse_2024",
    examId: "exam_upsc_cse",
    year: 2024,
    resultDate: "2025-04-16T00:00:00.000Z",
    officialResultLink: "https://upsc.gov.in",
    status: "announced",
    totalCandidates: 930000,
    selectedCandidates: 1016,
  },
  {
    id: "result_upsc_cse_2025",
    examId: "exam_upsc_cse",
    year: 2025,
    resultDate: "2026-04-22T00:00:00.000Z",
    officialResultLink: "https://upsc.gov.in",
    status: "expected",
    totalCandidates: 950000,
    selectedCandidates: 1056,
  },
  {
    id: "result_railway_group_d_2024",
    examId: "exam_railway_group_d",
    year: 2024,
    resultDate: "2025-01-18T00:00:00.000Z",
    officialResultLink: "https://indianrailways.gov.in",
    status: "announced",
    totalCandidates: 14200000,
    selectedCandidates: 98735,
  },
  {
    id: "result_railway_group_d_2025",
    examId: "exam_railway_group_d",
    year: 2025,
    resultDate: "2026-05-05T00:00:00.000Z",
    officialResultLink: "https://indianrailways.gov.in",
    status: "upcoming",
    totalCandidates: 14800000,
    selectedCandidates: 103522,
  },
  {
    id: "result_cbse_12_2025",
    examId: "exam_cbse_12",
    year: 2025,
    resultDate: "2025-05-13T00:00:00.000Z",
    officialResultLink: "https://cbse.gov.in",
    status: "announced",
    totalCandidates: 1698000,
    selectedCandidates: 1489021,
  },
  {
    id: "result_cbse_12_2026",
    examId: "exam_cbse_12",
    year: 2026,
    resultDate: "2026-05-10T00:00:00.000Z",
    officialResultLink: "https://cbse.gov.in",
    status: "upcoming",
    totalCandidates: 1740000,
    selectedCandidates: 1520000,
  },
  {
    id: "result_nda_2024",
    examId: "exam_nda",
    year: 2024,
    resultDate: "2024-09-20T00:00:00.000Z",
    officialResultLink: "https://upsc.gov.in",
    status: "announced",
    totalCandidates: 520000,
    selectedCandidates: 6280,
  },
  {
    id: "result_nda_2025",
    examId: "exam_nda",
    year: 2025,
    resultDate: "2025-09-18T00:00:00.000Z",
    officialResultLink: "https://upsc.gov.in",
    status: "announced",
    totalCandidates: 544000,
    selectedCandidates: 6410,
  },
  {
    id: "result_nda_2026",
    examId: "exam_nda",
    year: 2026,
    resultDate: "2026-09-17T00:00:00.000Z",
    officialResultLink: "https://upsc.gov.in",
    status: "upcoming",
    totalCandidates: 560000,
    selectedCandidates: 6550,
  },
];

const cutoffRows: Array<[string, number, Record<string, number>]> = [
  ["exam_ssc_mts", 2024, { General: 146, OBC: 142, SC: 133, ST: 126, EWS: 140 }],
  ["exam_ssc_mts", 2025, { General: 149, OBC: 145, SC: 136, ST: 129, EWS: 143 }],
  ["exam_ssc_mts", 2026, { General: 151, OBC: 147, SC: 138, ST: 130, EWS: 145 }],
  ["exam_upsc_cse", 2024, { General: 87.5, OBC: 84.2, SC: 77.1, ST: 74.3, EWS: 82.9 }],
  ["exam_upsc_cse", 2025, { General: 89.1, OBC: 85.3, SC: 78.8, ST: 75.5, EWS: 84.4 }],
  ["exam_railway_group_d", 2024, { General: 74, OBC: 70, SC: 63, ST: 58, EWS: 69 }],
  ["exam_railway_group_d", 2025, { General: 76, OBC: 72, SC: 65, ST: 60, EWS: 71 }],
  ["exam_nda", 2024, { General: 355, OBC: 343, SC: 328, ST: 320, EWS: 338 }],
  ["exam_nda", 2025, { General: 362, OBC: 350, SC: 334, ST: 325, EWS: 345 }],
  ["exam_nda", 2026, { General: 368, OBC: 354, SC: 338, ST: 328, EWS: 349 }],
];

export const demoCutoffs: Cutoff[] = cutoffRows.flatMap(([examId, year, values]) =>
  Object.entries(values).map(([category, cutoffMarks]) => ({
    id: `cutoff_${examId}_${year}_${category.toLowerCase()}`,
    examId,
    year,
    category,
    cutoffMarks,
  })),
);

export const demoStats: ExamStat[] = [
  {
    id: "stat_ssc_mts_2024",
    examId: "exam_ssc_mts",
    year: 2024,
    vacancies: 12840,
    candidates: 1820000,
    selectionRatio: 0.71,
  },
  {
    id: "stat_ssc_mts_2025",
    examId: "exam_ssc_mts",
    year: 2025,
    vacancies: 13220,
    candidates: 1915000,
    selectionRatio: 0.69,
  },
  {
    id: "stat_ssc_mts_2026",
    examId: "exam_ssc_mts",
    year: 2026,
    vacancies: 13600,
    candidates: 1980000,
    selectionRatio: 0.69,
  },
  {
    id: "stat_upsc_cse_2024",
    examId: "exam_upsc_cse",
    year: 2024,
    vacancies: 1016,
    candidates: 930000,
    selectionRatio: 0.11,
  },
  {
    id: "stat_upsc_cse_2025",
    examId: "exam_upsc_cse",
    year: 2025,
    vacancies: 1056,
    candidates: 950000,
    selectionRatio: 0.11,
  },
  {
    id: "stat_railway_group_d_2024",
    examId: "exam_railway_group_d",
    year: 2024,
    vacancies: 98735,
    candidates: 14200000,
    selectionRatio: 0.7,
  },
  {
    id: "stat_railway_group_d_2025",
    examId: "exam_railway_group_d",
    year: 2025,
    vacancies: 103522,
    candidates: 14800000,
    selectionRatio: 0.7,
  },
  {
    id: "stat_cbse_12_2025",
    examId: "exam_cbse_12",
    year: 2025,
    vacancies: 1489021,
    candidates: 1698000,
    selectionRatio: 87.69,
  },
  {
    id: "stat_cbse_12_2026",
    examId: "exam_cbse_12",
    year: 2026,
    vacancies: 1520000,
    candidates: 1740000,
    selectionRatio: 87.36,
  },
  {
    id: "stat_nda_2024",
    examId: "exam_nda",
    year: 2024,
    vacancies: 6280,
    candidates: 520000,
    selectionRatio: 1.21,
  },
  {
    id: "stat_nda_2025",
    examId: "exam_nda",
    year: 2025,
    vacancies: 6410,
    candidates: 544000,
    selectionRatio: 1.18,
  },
  {
    id: "stat_nda_2026",
    examId: "exam_nda",
    year: 2026,
    vacancies: 6550,
    candidates: 560000,
    selectionRatio: 1.17,
  },
];

export const demoContent: ContentBlock[] = [
  {
    id: "content_ssc_mts_havaldar_overview",
    examId: "exam_ssc_mts_havaldar",
    contentType: "overview",
    body:
      "SSC MTS / Havaldar is a high-volume Staff Selection Commission recruitment cycle covering Multi Tasking Staff and Havaldar posts.\nThe current tracked cycle includes the 2025 application window and the 2026 exam and answer key updates.\nCandidates closely follow official notices for application status, slot booking, exam city, admit card, answer key, and result publication.",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_selection_process",
    examId: "exam_ssc_mts_havaldar",
    contentType: "selection_process",
    body:
      "CBT written exam\nPET / PST for Havaldar\nDocument verification\nMedical examination",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_important_dates",
    examId: "exam_ssc_mts_havaldar",
    contentType: "important_dates",
    body:
      "Online apply start date: 26 June 2025\nOnline apply last date: 24 July 2025\nLast date for fee payment: 25 July 2025\nOnline correction: 29-31 July 2025\nNew correction date: 04-06 August 2025\nSelf slot booking: 16-25 January 2026\nExam city details: 30 January 2026\nAdmit card: 02 February 2026\nExam start date: 04 February 2026\nAnswer key: 03 March 2026\nResult date: Will be updated soon",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_application_fee",
    examId: "exam_ssc_mts_havaldar",
    contentType: "application_fee",
    body:
      "General / OBC / EWS: Rs 100\nSC / ST / Female: Rs 0\nPH candidates: Rs 0\nPayment modes: debit card, credit card, internet banking, IMPS, cash card, mobile wallet",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_age_limit",
    examId: "exam_ssc_mts_havaldar",
    contentType: "age_limit",
    body:
      "Minimum age: 18 years\nMaximum age: 25-27 years\nAge relaxation as per SSC rules",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_vacancy_details",
    examId: "exam_ssc_mts_havaldar",
    contentType: "vacancy_details",
    body:
      "Total posts: 7948\nMulti Tasking Staff (MTS): 6810\nHavaldar: 1138",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_eligibility",
    examId: "exam_ssc_mts_havaldar",
    contentType: "eligibility",
    body:
      "MTS: Candidates must have passed Class 10 from any recognized board.\nHavaldar: Candidates must have passed Class 10 from any recognized board. Physical requirements include 1600m walk in 15 minutes for male candidates, 1 km walk in 20 minutes for female candidates, and prescribed height and chest standards as per SSC notice.",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_how_to_check_answer_key",
    examId: "exam_ssc_mts_havaldar",
    contentType: "how_to_check_answer_key",
    body:
      "Open the SSC official website.\nFind the candidate login or answer key section.\nOpen the SSC MTS / Havaldar Answer Key 2026 link.\nSign in with registration number or roll number and date of birth or password.\nView and download the answer key PDF.",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_havaldar_faq",
    examId: "exam_ssc_mts_havaldar",
    contentType: "faq",
    body:
      "When will the admit card be released? Usually 3-4 days before the exam.\nWhere can candidates download it? From SSC official or regional websites.\nWhat details are required? Registration number or roll number along with date of birth or password.",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_overview",
    examId: "exam_ssc_mts",
    contentType: "overview",
    body:
      "SSC MTS is one of the largest government recruitment exams.\nIt attracts a wide applicant base and produces strong year-over-year cutoff movement.\nCandidates track result timing closely because region-wise merit lists impact document verification schedules.",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_selection_process",
    examId: "exam_ssc_mts",
    contentType: "selection_process",
    body:
      "Computer based examination\nShortlisting through category-wise cutoff\nDocument verification",
    createdAt: now,
  },
  {
    id: "content_ssc_mts_prediction",
    examId: "exam_ssc_mts",
    contentType: "prediction",
    body:
      "Expected 2026 general cutoff is likely to stay in the 149 to 152 range because vacancies are stable and candidate volume is still rising.",
    createdAt: now,
  },
  {
    id: "content_upsc_cse_overview",
    examId: "exam_upsc_cse",
    contentType: "overview",
    body:
      "UPSC CSE is a three-stage exam covering prelims, mains, and personality test.\nHistorical selection ratio is consistently low, which makes cutoff and vacancy trend analysis central for preparation strategy.",
    createdAt: now,
  },
  {
    id: "content_upsc_cse_selection_process",
    examId: "exam_upsc_cse",
    contentType: "selection_process",
    body: "Prelims\nMains\nInterview",
    createdAt: now,
  },
  {
    id: "content_railway_group_d_overview",
    examId: "exam_railway_group_d",
    contentType: "overview",
    body:
      "Railway Group D creates some of the largest recruitment result pages in India.\nZone-wise lists, normalization, and volume-heavy traffic make caching and static generation especially important.",
    createdAt: now,
  },
  {
    id: "content_railway_group_d_selection_process",
    examId: "exam_railway_group_d",
    contentType: "selection_process",
    body: "Computer based test\nPhysical efficiency test\nDocument verification",
    createdAt: now,
  },
  {
    id: "content_railway_group_d_regional_cutoff_archive",
    examId: "exam_railway_group_d",
    contentType: "regional_cutoff_archive",
    body: JSON.stringify(rrbGroupDRegionalCutoffArchive),
    createdAt: now,
  },
  {
    id: "content_cbse_12_overview",
    examId: "exam_cbse_12",
    contentType: "overview",
    body:
      "CBSE Class 12 results are monitored for board performance, stream pass percentage, and admission season timelines.\nTraffic spikes are concentrated around result declaration windows.",
    createdAt: now,
  },
  {
    id: "content_cbse_12_selection_process",
    examId: "exam_cbse_12",
    contentType: "selection_process",
    body: "Board examinations\nCentralized evaluation\nResult publication",
    createdAt: now,
  },
  {
    id: "content_nda_overview",
    examId: "exam_nda",
    contentType: "overview",
    body:
      "NDA combines written and SSB stages, which makes both written cutoff and final recommendation trends useful.\nMarks-vs-rank pages perform well for defence aspirants tracking repeat cycles.",
    createdAt: now,
  },
  {
    id: "content_nda_selection_process",
    examId: "exam_nda",
    contentType: "selection_process",
    body: "Written examination\nSSB interview\nMedical examination",
    createdAt: now,
  },
];

export const demoUpdates: ExamUpdate[] = [
  {
    id: "update_ssc_mts_havaldar_notification",
    examId: "exam_ssc_mts_havaldar",
    year: 2025,
    updateType: "notification",
    title: "SSC MTS / Havaldar Recruitment 2025 Notification",
    updateDate: "2025-06-26T00:00:00.000Z",
    officialLink: "https://ssc.gov.in",
    status: "published",
    body:
      "Recruitment cycle opened with MTS and Havaldar vacancies, eligibility rules, application dates, and official notice links.",
  },
  {
    id: "update_ssc_mts_havaldar_slot_booking",
    examId: "exam_ssc_mts_havaldar",
    year: 2026,
    updateType: "notice",
    title: "Self Slot Booking Window",
    updateDate: "2026-01-16T00:00:00.000Z",
    officialLink: "https://ssc.gov.in",
    status: "published",
    body:
      "Self slot booking was available from 16 January 2026 to 25 January 2026 as part of the exam cycle workflow.",
  },
  {
    id: "update_ssc_mts_havaldar_exam_city",
    examId: "exam_ssc_mts_havaldar",
    year: 2026,
    updateType: "exam-city",
    title: "Exam City Details Released",
    updateDate: "2026-01-30T00:00:00.000Z",
    officialLink: "https://ssc.gov.in",
    status: "published",
    body:
      "Exam city details were released on 30 January 2026 for the SSC MTS / Havaldar examination cycle.",
  },
  {
    id: "update_ssc_mts_havaldar_admit_card",
    examId: "exam_ssc_mts_havaldar",
    year: 2026,
    updateType: "admit-card",
    title: "Admit Card Available",
    updateDate: "2026-02-02T00:00:00.000Z",
    officialLink: "https://ssc.gov.in",
    status: "published",
    body:
      "Admit card became available on 02 February 2026 ahead of the written examination.",
  },
  {
    id: "update_ssc_mts_havaldar_exam_start",
    examId: "exam_ssc_mts_havaldar",
    year: 2026,
    updateType: "notice",
    title: "Written Examination Started",
    updateDate: "2026-02-04T00:00:00.000Z",
    officialLink: "https://ssc.gov.in",
    status: "published",
    body:
      "The written examination started on 04 February 2026 for SSC MTS / Havaldar.",
  },
  {
    id: "update_ssc_mts_havaldar_answer_key",
    examId: "exam_ssc_mts_havaldar",
    year: 2026,
    updateType: "answer-key",
    title: "SSC MTS / Havaldar Answer Key 2026 Out",
    updateDate: "2026-03-03T18:17:00.000Z",
    officialLink: "https://ssc.gov.in",
    status: "published",
    body:
      "Answer key was released on 03 March 2026. Candidates can log in using enrollment number, registration number, roll number, or date of birth to download it.",
  },
  {
    id: "update_ssc_mts_havaldar_result_pending",
    examId: "exam_ssc_mts_havaldar",
    year: 2026,
    updateType: "result",
    title: "Result Date Pending",
    updateDate: null,
    officialLink: "https://ssc.gov.in",
    status: "upcoming",
    body:
      "The result date was not announced on the source page and is still pending official confirmation.",
  },
];

export function getDemoEnrichedExams(): EnrichedExam[] {
  return demoExams.map((exam, index) => ({
    ...exam,
    popularityScore: 100 - index * 8,
    results: demoResults
      .filter((item) => item.examId === exam.id)
      .sort((a, b) => b.year - a.year),
    cutoffs: demoCutoffs
      .filter((item) => item.examId === exam.id)
      .sort((a, b) => b.year - a.year || a.category.localeCompare(b.category)),
    stats: demoStats
      .filter((item) => item.examId === exam.id)
      .sort((a, b) => b.year - a.year),
    contents: demoContent.filter((item) => item.examId === exam.id),
    updates: demoUpdates
      .filter((item) => item.examId === exam.id)
      .sort((a, b) => {
        const aTime = a.updateDate ? new Date(a.updateDate).getTime() : 0;
        const bTime = b.updateDate ? new Date(b.updateDate).getTime() : 0;
        return bTime - aTime;
      }),
  }));
}
