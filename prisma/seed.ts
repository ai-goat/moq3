import { config } from "dotenv";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import {
  demoContent,
  demoCutoffs,
  demoExams,
  demoResults,
  demoStats,
  demoUpdates,
} from "@/lib/demo-data";

config({ path: ".env.local" });
config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run prisma seed.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  for (const exam of demoExams) {
    await prisma.exam.upsert({
      where: { slug: exam.slug },
      update: {
        name: exam.name,
        conductingBody: exam.conductingBody,
        category: exam.category,
        officialWebsite: exam.officialWebsite,
        description: exam.description,
      },
      create: {
        id: exam.id,
        name: exam.name,
        slug: exam.slug,
        conductingBody: exam.conductingBody,
        category: exam.category,
        officialWebsite: exam.officialWebsite,
        description: exam.description,
        createdAt: new Date(exam.createdAt),
      },
    });
  }

  for (const result of demoResults) {
    await prisma.result.upsert({
      where: { examId_year: { examId: result.examId, year: result.year } },
      update: {
        resultDate: new Date(result.resultDate),
        officialResultLink: result.officialResultLink,
        status: result.status,
        totalCandidates: result.totalCandidates,
        selectedCandidates: result.selectedCandidates,
      },
      create: {
        id: result.id,
        examId: result.examId,
        year: result.year,
        resultDate: new Date(result.resultDate),
        officialResultLink: result.officialResultLink,
        status: result.status,
        totalCandidates: result.totalCandidates,
        selectedCandidates: result.selectedCandidates,
      },
    });
  }

  for (const cutoff of demoCutoffs) {
    await prisma.cutoff.upsert({
      where: {
        examId_year_category: {
          examId: cutoff.examId,
          year: cutoff.year,
          category: cutoff.category,
        },
      },
      update: { cutoffMarks: cutoff.cutoffMarks },
      create: {
        id: cutoff.id,
        examId: cutoff.examId,
        year: cutoff.year,
        category: cutoff.category,
        cutoffMarks: cutoff.cutoffMarks,
      },
    });
  }

  for (const stat of demoStats) {
    await prisma.examStat.upsert({
      where: { examId_year: { examId: stat.examId, year: stat.year } },
      update: {
        vacancies: stat.vacancies,
        candidates: stat.candidates,
        selectionRatio: stat.selectionRatio,
      },
      create: {
        id: stat.id,
        examId: stat.examId,
        year: stat.year,
        vacancies: stat.vacancies,
        candidates: stat.candidates,
        selectionRatio: stat.selectionRatio,
      },
    });
  }

  for (const content of demoContent) {
    await prisma.content.upsert({
      where: {
        examId_contentType: {
          examId: content.examId,
          contentType: content.contentType,
        },
      },
      update: { body: content.body },
      create: {
        id: content.id,
        examId: content.examId,
        contentType: content.contentType,
        body: content.body,
        createdAt: new Date(content.createdAt),
      },
    });
  }

  for (const update of demoUpdates) {
    await prisma.examUpdate.upsert({
      where: { id: update.id },
      update: {
        body: update.body,
        officialLink: update.officialLink,
        status: update.status,
        title: update.title,
        updateDate: update.updateDate ? new Date(update.updateDate) : null,
        updateType: update.updateType,
        year: update.year,
      },
      create: {
        id: update.id,
        body: update.body,
        examId: update.examId,
        officialLink: update.officialLink,
        status: update.status,
        title: update.title,
        updateDate: update.updateDate ? new Date(update.updateDate) : null,
        updateType: update.updateType,
        year: update.year,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
