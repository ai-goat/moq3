export type HighVolumePageTarget = {
  examName: string;
  examSlug: string;
  ecosystem: string;
  officialSourceLabel: string;
  officialSourceUrl: string;
  pageType: string;
  priority: number;
  rationale: string;
  targetSlug: string;
  year: number;
};

type ExamBlueprint = {
  examName: string;
  examSlug: string;
  ecosystem: string;
  officialSourceLabel: string;
  officialSourceUrl: string;
  pageBlueprints: Array<{
    pageType: string;
    rationale: string;
  }>;
  priorityBase: number;
};

const examBlueprints: ExamBlueprint[] = [
  {
    examName: "SSC CGL",
    examSlug: "ssc-cgl",
    ecosystem: "SSC",
    officialSourceLabel: "SSC official",
    officialSourceUrl: "https://ssc.gov.in/",
    priorityBase: 100,
    pageBlueprints: [
      { pageType: "notification", rationale: "Large yearly recruitment cycle with intense early-stage search demand." },
      { pageType: "admit-card", rationale: "High-intent traffic spikes as exam windows open." },
      { pageType: "answer-key", rationale: "Post-exam answer key pages attract immediate mass traffic." },
      { pageType: "result", rationale: "CGL result pages are consistently among the strongest SSC intents." },
      { pageType: "cutoff", rationale: "Cutoff and marks pressure drive repeat SEO demand." },
    ],
  },
  {
    examName: "SSC CHSL",
    examSlug: "ssc-chsl",
    ecosystem: "SSC",
    officialSourceLabel: "SSC official",
    officialSourceUrl: "https://ssc.gov.in/",
    priorityBase: 98,
    pageBlueprints: [
      { pageType: "notification", rationale: "Broad aspirant base and strong application-season search volume." },
      { pageType: "admit-card", rationale: "Region-wise admit card searches spike before each stage." },
      { pageType: "answer-key", rationale: "Users look for objections, response sheets, and score estimates." },
      { pageType: "result", rationale: "Result and final result queries are recurring and high-value." },
      { pageType: "cutoff", rationale: "Category-wise CHSL cutoff is a core comparison query." },
    ],
  },
  {
    examName: "SSC MTS / Havaldar",
    examSlug: "ssc-mts-havaldar",
    ecosystem: "SSC",
    officialSourceLabel: "SSC official",
    officialSourceUrl: "https://ssc.gov.in/",
    priorityBase: 97,
    pageBlueprints: [
      { pageType: "notification", rationale: "Mass-market recruitment query with broad nationwide intent." },
      { pageType: "admit-card", rationale: "Users search directly for exam city and admit card links." },
      { pageType: "answer-key", rationale: "Answer key pages map closely to competitor-style high-density pages." },
      { pageType: "result", rationale: "Result and merit-list searches convert strongly." },
      { pageType: "cutoff", rationale: "Expected and final cutoff pages are a core follow-up intent." },
    ],
  },
  {
    examName: "SSC GD Constable",
    examSlug: "ssc-gd-constable",
    ecosystem: "SSC",
    officialSourceLabel: "SSC official",
    officialSourceUrl: "https://ssc.gov.in/",
    priorityBase: 96,
    pageBlueprints: [
      { pageType: "notification", rationale: "Constable recruitment volumes are extremely high." },
      { pageType: "admit-card", rationale: "Admit card, city slip, and PET/PST dates drive strong search spikes." },
      { pageType: "answer-key", rationale: "Candidates search immediately after exam shifts finish." },
      { pageType: "result", rationale: "Result and shortlisted-candidate pages have nationwide demand." },
      { pageType: "cutoff", rationale: "State and category cutoff analysis is heavily searched." },
    ],
  },
  {
    examName: "SSC CPO SI",
    examSlug: "ssc-cpo-si",
    ecosystem: "SSC",
    officialSourceLabel: "SSC official calendar",
    officialSourceUrl: "https://ssc.gov.in/api/attachment/uploads/masterData/ExamCalendar/Tentative%20Calendar%202025%20_%20051224.pdf",
    priorityBase: 94,
    pageBlueprints: [
      { pageType: "notification", rationale: "Police recruitment cycles have durable search intent." },
      { pageType: "admit-card", rationale: "Paper-I admit card searches peak sharply." },
      { pageType: "answer-key", rationale: "Users look for objections and marks estimates right after exam." },
      { pageType: "result", rationale: "Paper-I, PET/PST, and final result pages all attract traffic." },
      { pageType: "cutoff", rationale: "Expected and official cutoff content performs well for CPO." },
    ],
  },
  {
    examName: "RRB NTPC",
    examSlug: "rrb-ntpc",
    ecosystem: "Railways",
    officialSourceLabel: "RRB Chandigarh",
    officialSourceUrl: "https://www.rrbcdg.gov.in/",
    priorityBase: 99,
    pageBlueprints: [
      { pageType: "notification", rationale: "RRB NTPC remains one of the widest railway recruitment intents." },
      { pageType: "admit-card", rationale: "City intimation and e-call letter pages drive high usage." },
      { pageType: "answer-key", rationale: "CBT answer key objections generate immediate traffic." },
      { pageType: "result", rationale: "CBT and panel/result pages rank strongly." },
      { pageType: "cutoff", rationale: "Railway cutoff queries stay active long after result release." },
    ],
  },
  {
    examName: "RRB Group D",
    examSlug: "rrb-group-d",
    ecosystem: "Railways",
    officialSourceLabel: "RRB Chandigarh",
    officialSourceUrl: "https://www.rrbcdg.gov.in/",
    priorityBase: 98,
    pageBlueprints: [
      { pageType: "notification", rationale: "Massive candidate base keeps Group D searches consistently high." },
      { pageType: "admit-card", rationale: "Admit card and city intimation pages spike nationally." },
      { pageType: "answer-key", rationale: "Post-exam answer key traffic is broad and immediate." },
      { pageType: "result", rationale: "Panel and merit list pages have long-tail and peak traffic." },
      { pageType: "cutoff", rationale: "Expected cutoff and normalization analysis are popular." },
    ],
  },
  {
    examName: "RRB ALP",
    examSlug: "rrb-alp",
    ecosystem: "Railways",
    officialSourceLabel: "RRB ALP notices",
    officialSourceUrl: "https://www.rrbcdg.gov.in/2024-01-alp.php",
    priorityBase: 96,
    pageBlueprints: [
      { pageType: "notification", rationale: "ALP notifications and vacancy details have strong recurring intent." },
      { pageType: "admit-card", rationale: "CBT and DV schedule pages attract high-engagement users." },
      { pageType: "answer-key", rationale: "ALP answer key traffic peaks right after CBT." },
      { pageType: "result", rationale: "Stage-wise result pages perform reliably." },
      { pageType: "cutoff", rationale: "Marks-vs-panel and cutoff analysis are strong supporting intents." },
    ],
  },
  {
    examName: "RRB JE",
    examSlug: "rrb-je",
    ecosystem: "Railways",
    officialSourceLabel: "RRB Chandigarh",
    officialSourceUrl: "https://www.rrbcdg.gov.in/",
    priorityBase: 93,
    pageBlueprints: [
      { pageType: "notification", rationale: "JE recruitment remains a high-trust technical jobs query." },
      { pageType: "admit-card", rationale: "Exam schedule and admit card searches are direct-intent." },
      { pageType: "answer-key", rationale: "Answer key and objection pages see concentrated traffic." },
      { pageType: "result", rationale: "JE result pages convert for both current and repeat visitors." },
      { pageType: "cutoff", rationale: "Cutoff analysis drives comparison and aspirant planning." },
    ],
  },
  {
    examName: "UPSC Civil Services",
    examSlug: "upsc-civil-services",
    ecosystem: "UPSC",
    officialSourceLabel: "UPSC What's New",
    officialSourceUrl: "https://upsc.gov.in/whats-new",
    priorityBase: 97,
    pageBlueprints: [
      { pageType: "notification", rationale: "Official notification and exam date pages have elite-level search demand." },
      { pageType: "admit-card", rationale: "Prelims and mains e-summon pages are high intent." },
      { pageType: "answer-key", rationale: "Answer key and GS paper analysis get massive traction." },
      { pageType: "result", rationale: "Prelims, mains, and final result pages are extremely valuable." },
      { pageType: "cutoff", rationale: "UPSC cutoff is one of the strongest recurring analysis queries." },
    ],
  },
  {
    examName: "UPSC NDA",
    examSlug: "upsc-nda",
    ecosystem: "UPSC",
    officialSourceLabel: "UPSC recruitment and exams",
    officialSourceUrl: "https://upsc.gov.in/recruitment-1",
    priorityBase: 92,
    pageBlueprints: [
      { pageType: "notification", rationale: "NDA notification and age-limit pages have persistent traffic." },
      { pageType: "admit-card", rationale: "Admit card and exam date pages spike before each cycle." },
      { pageType: "answer-key", rationale: "Answer key is a major immediate post-exam intent." },
      { pageType: "result", rationale: "Written result pages and merit updates are core targets." },
      { pageType: "cutoff", rationale: "Written cutoff and final cutoff pages have strong defence demand." },
    ],
  },
  {
    examName: "UPSC CDS",
    examSlug: "upsc-cds",
    ecosystem: "UPSC",
    officialSourceLabel: "UPSC What's New",
    officialSourceUrl: "https://upsc.gov.in/whats-new",
    priorityBase: 90,
    pageBlueprints: [
      { pageType: "notification", rationale: "CDS notification and eligibility searches repeat every cycle." },
      { pageType: "admit-card", rationale: "Admit card searches peak before exam day." },
      { pageType: "answer-key", rationale: "Defence aspirants search heavily for expected marks analysis." },
      { pageType: "result", rationale: "Written result pages have strong CPC-style ranking potential." },
      { pageType: "cutoff", rationale: "Cutoff and OTA/IMA/AFA comparisons drive depth traffic." },
    ],
  },
  {
    examName: "NEET UG",
    examSlug: "neet-ug",
    ecosystem: "NTA",
    officialSourceLabel: "NEET UG official",
    officialSourceUrl: "https://exams.nta.ac.in/NEET/",
    priorityBase: 100,
    pageBlueprints: [
      { pageType: "notification", rationale: "NEET notification pages receive national-scale traffic." },
      { pageType: "admit-card", rationale: "Admit card and city slip pages are peak-season essentials." },
      { pageType: "answer-key", rationale: "NEET answer key traffic is extremely large immediately after exam." },
      { pageType: "result", rationale: "Result and scorecard searches are top-tier demand." },
      { pageType: "cutoff", rationale: "Category cutoff and qualifying score pages are high-value." },
    ],
  },
  {
    examName: "JEE Main",
    examSlug: "jee-main",
    ecosystem: "NTA",
    officialSourceLabel: "JEE Main via NTA",
    officialSourceUrl: "https://nta.ac.in/",
    priorityBase: 99,
    pageBlueprints: [
      { pageType: "notification", rationale: "Session-wise notification pages attract huge annual traffic." },
      { pageType: "admit-card", rationale: "Exam city and admit card are immediate must-have pages." },
      { pageType: "answer-key", rationale: "Answer key and objection tracker queries are high-intent." },
      { pageType: "result", rationale: "Result and percentile pages are among the biggest edu queries." },
      { pageType: "cutoff", rationale: "Cutoff and marks-vs-percentile pages have strong depth demand." },
    ],
  },
  {
    examName: "CUET UG",
    examSlug: "cuet-ug",
    ecosystem: "NTA",
    officialSourceLabel: "CUET UG via NTA",
    officialSourceUrl: "https://www.nta.ac.in/cuetexam",
    priorityBase: 95,
    pageBlueprints: [
      { pageType: "notification", rationale: "CUET notification and registration pages drive wide UG search volume." },
      { pageType: "admit-card", rationale: "Admit card and city slip pages are critical for users." },
      { pageType: "answer-key", rationale: "Answer key and response sheet searches spike immediately." },
      { pageType: "result", rationale: "Scorecard pages are major traffic drivers." },
      { pageType: "cutoff", rationale: "University-wise cutoff analysis creates strong long-tail demand." },
    ],
  },
  {
    examName: "UGC NET",
    examSlug: "ugc-net",
    ecosystem: "NTA",
    officialSourceLabel: "UGC NET official",
    officialSourceUrl: "https://ugcnet.nta.ac.in/",
    priorityBase: 93,
    pageBlueprints: [
      { pageType: "notification", rationale: "UGC NET notification cycles repeatedly attract academic traffic." },
      { pageType: "admit-card", rationale: "Admit card pages are highly transactional." },
      { pageType: "answer-key", rationale: "Answer key and objection pages are core exam-day follow-ups." },
      { pageType: "result", rationale: "Result and scorecard pages draw faculty and JRF aspirants." },
      { pageType: "cutoff", rationale: "Subject/category cutoff pages have strong post-result intent." },
    ],
  },
  {
    examName: "IBPS PO",
    examSlug: "ibps-po",
    ecosystem: "Banking",
    officialSourceLabel: "IBPS CRP PO/MT",
    officialSourceUrl: "https://www.ibps.in/index.php/crp-pomt/",
    priorityBase: 94,
    pageBlueprints: [
      { pageType: "notification", rationale: "IBPS PO notification and vacancy pages are perennially searched." },
      { pageType: "admit-card", rationale: "Prelims and mains call letter pages are high intent." },
      { pageType: "answer-key", rationale: "Unofficial/expected-answer-key style intents are still large." },
      { pageType: "result", rationale: "Prelims, mains, and final allotment queries are strong." },
      { pageType: "cutoff", rationale: "Sectional and overall cutoff pages are a core banking intent." },
    ],
  },
  {
    examName: "SBI PO",
    examSlug: "sbi-po",
    ecosystem: "Banking",
    officialSourceLabel: "SBI Careers",
    officialSourceUrl: "https://sbi.co.in/careers",
    priorityBase: 92,
    pageBlueprints: [
      { pageType: "notification", rationale: "SBI PO is one of the highest-value banking job queries." },
      { pageType: "admit-card", rationale: "Prelims and mains call letter searches are direct-intent." },
      { pageType: "answer-key", rationale: "Post-exam expected-answer-key traffic is strong even without official keys." },
      { pageType: "result", rationale: "SBI PO result and scorecard pages are major drivers." },
      { pageType: "cutoff", rationale: "Cutoff trends are heavily searched by repeat aspirants." },
    ],
  },
  {
    examName: "CBSE Class 10",
    examSlug: "cbse-class-10",
    ecosystem: "Boards",
    officialSourceLabel: "CBSE statistics and result notices",
    officialSourceUrl: "https://www.cbse.gov.in/cbsenew/statistics.html",
    priorityBase: 95,
    pageBlueprints: [
      { pageType: "result", rationale: "Class 10 result queries are among the biggest annual India education spikes." },
      { pageType: "compartment-result", rationale: "Supplementary/compartment results have clear seasonal demand." },
      { pageType: "revaluation", rationale: "Post-result review and verification pages attract urgent users." },
      { pageType: "datesheet", rationale: "Date sheet pages drive the prep-season wave." },
      { pageType: "statistics", rationale: "Pass percentage and topper-style summary pages earn broad backlinks." },
    ],
  },
  {
    examName: "CBSE Class 12",
    examSlug: "cbse-class-12",
    ecosystem: "Boards",
    officialSourceLabel: "CBSE statistics and result notices",
    officialSourceUrl: "https://www.cbse.gov.in/cbsenew/statistics.html",
    priorityBase: 96,
    pageBlueprints: [
      { pageType: "result", rationale: "Class 12 result pages see extremely strong national demand." },
      { pageType: "compartment-result", rationale: "Supplementary result pages are a recurring high-intent need." },
      { pageType: "revaluation", rationale: "Verification and re-evaluation queries follow immediately after results." },
      { pageType: "datesheet", rationale: "Date sheet pages drive early-cycle traffic." },
      { pageType: "statistics", rationale: "Result statistics and stream performance pages perform well." },
    ],
  },
];

export const officialEcosystemNotes = [
  {
    ecosystem: "SSC",
    note: "SSC publishes exam calendars, notifications, answer keys, and results on its official site.",
    sourceLabel: "SSC official",
    sourceUrl: "https://ssc.gov.in/",
  },
  {
    ecosystem: "Railways",
    note: "RRB portals publish city intimation, e-call letters, answer keys, panels, and cutoffs by CEN.",
    sourceLabel: "RRB Chandigarh",
    sourceUrl: "https://www.rrbcdg.gov.in/",
  },
  {
    ecosystem: "UPSC",
    note: "UPSC updates examination notifications, e-summons, answer keys, and results centrally.",
    sourceLabel: "UPSC What's New",
    sourceUrl: "https://upsc.gov.in/whats-new",
  },
  {
    ecosystem: "NTA",
    note: "NTA lists major high-volume exams including NEET UG, JEE Main, CUET UG, and UGC NET.",
    sourceLabel: "NTA official",
    sourceUrl: "https://nta.ac.in/",
  },
  {
    ecosystem: "Banking",
    note: "IBPS and SBI careers portals publish recruitment notices, call letters, and result updates.",
    sourceLabel: "IBPS",
    sourceUrl: "https://www.ibps.in/",
  },
  {
    ecosystem: "Boards",
    note: "CBSE publishes result statistics and post-result processes on its official portal.",
    sourceLabel: "CBSE statistics",
    sourceUrl: "https://www.cbse.gov.in/cbsenew/statistics.html",
  },
];

export const highVolumePageTargets: HighVolumePageTarget[] = examBlueprints.flatMap(
  (exam, examIndex) =>
    exam.pageBlueprints.map((page, pageIndex) => ({
      examName: exam.examName,
      examSlug: exam.examSlug,
      ecosystem: exam.ecosystem,
      officialSourceLabel: exam.officialSourceLabel,
      officialSourceUrl: exam.officialSourceUrl,
      pageType: page.pageType,
      priority: exam.priorityBase - pageIndex - examIndex * 0.01,
      rationale: page.rationale,
      targetSlug: `/${page.pageType}/${exam.examSlug}-2026`,
      year: 2026,
    })),
);

export function getTargetSummary() {
  const ecosystemCounts = Array.from(
    highVolumePageTargets.reduce((map, target) => {
      map.set(target.ecosystem, (map.get(target.ecosystem) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  ).map(([ecosystem, count]) => ({ ecosystem, count }));

  return {
    ecosystemCounts,
    totalExams: examBlueprints.length,
    totalTargets: highVolumePageTargets.length,
  };
}
