import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/env";
import { syncSearchIndex } from "@/services/public";
import { z } from "zod";

const examSchema = z.object({
  category: z.string().min(2),
  conductingBody: z.string().min(2),
  description: z.string().min(20),
  name: z.string().min(2),
  officialWebsite: z.url(),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
});

const resultSchema = z.object({
  examSlug: z.string().min(2),
  officialResultLink: z.url(),
  resultDate: z.iso.datetime(),
  selectedCandidates: z.coerce.number().int().positive(),
  status: z.enum(["announced", "expected", "upcoming"]),
  totalCandidates: z.coerce.number().int().positive(),
  year: z.coerce.number().int().min(2000).max(2100),
});

const cutoffSchema = z.object({
  category: z.string().min(2),
  cutoffMarks: z.coerce.number().nonnegative(),
  examSlug: z.string().min(2),
  year: z.coerce.number().int().min(2000).max(2100),
});

const statSchema = z.object({
  candidates: z.coerce.number().int().positive(),
  examSlug: z.string().min(2),
  selectionRatio: z.coerce.number().nonnegative(),
  vacancies: z.coerce.number().int().positive(),
  year: z.coerce.number().int().min(2000).max(2100),
});

const updateSchema = z.object({
  body: z.string().min(10),
  examSlug: z.string().min(2),
  officialLink: z.url(),
  status: z.enum(["published", "upcoming", "archived"]),
  title: z.string().min(3),
  updateDate: z.iso.datetime().nullable().optional(),
  updateType: z.enum([
    "notification",
    "application",
    "exam-city",
    "admit-card",
    "answer-key",
    "result",
    "cutoff",
    "notice",
  ]),
  year: z.coerce.number().int().min(2000).max(2100),
});

function getDb(): PrismaClient {
  if (!isDatabaseConfigured || !prisma) {
    throw new Error("DATABASE_URL is required for admin writes.");
  }

  return prisma;
}

async function getExamIdBySlug(examSlug: string) {
  const exam = await getDb().exam.findUnique({
    where: { slug: examSlug },
    select: { id: true },
  });

  if (!exam) {
    throw new Error(`Exam with slug "${examSlug}" was not found.`);
  }

  return exam.id;
}

export async function createExam(payload: unknown) {
  const data = examSchema.parse(payload);

  const exam = await getDb().exam.upsert({
    where: { slug: data.slug },
    update: {
      category: data.category,
      conductingBody: data.conductingBody,
      description: data.description,
      name: data.name,
      officialWebsite: data.officialWebsite,
    },
    create: data,
  });

  await syncSearchIndex();

  return exam;
}

export async function createResult(payload: unknown) {
  const data = resultSchema.parse(payload);
  const examId = await getExamIdBySlug(data.examSlug);

  return getDb().result.upsert({
    where: {
      examId_year: {
        examId,
        year: data.year,
      },
    },
    update: {
      officialResultLink: data.officialResultLink,
      resultDate: new Date(data.resultDate),
      selectedCandidates: data.selectedCandidates,
      status: data.status,
      totalCandidates: data.totalCandidates,
    },
    create: {
      examId,
      officialResultLink: data.officialResultLink,
      resultDate: new Date(data.resultDate),
      selectedCandidates: data.selectedCandidates,
      status: data.status,
      totalCandidates: data.totalCandidates,
      year: data.year,
    },
  });
}

export async function createCutoff(payload: unknown) {
  const data = cutoffSchema.parse(payload);
  const examId = await getExamIdBySlug(data.examSlug);

  return getDb().cutoff.upsert({
    where: {
      examId_year_category: {
        examId,
        year: data.year,
        category: data.category,
      },
    },
    update: {
      cutoffMarks: data.cutoffMarks,
    },
    create: {
      category: data.category,
      cutoffMarks: data.cutoffMarks,
      examId,
      year: data.year,
    },
  });
}

export async function upsertExamStat(payload: unknown) {
  const data = statSchema.parse(payload);
  const examId = await getExamIdBySlug(data.examSlug);

  return getDb().examStat.upsert({
    where: {
      examId_year: {
        examId,
        year: data.year,
      },
    },
    update: {
      candidates: data.candidates,
      selectionRatio: data.selectionRatio,
      vacancies: data.vacancies,
    },
    create: {
      candidates: data.candidates,
      examId,
      selectionRatio: data.selectionRatio,
      vacancies: data.vacancies,
      year: data.year,
    },
  });
}

export async function createExamUpdate(payload: unknown) {
  const data = updateSchema.parse(payload);
  const examId = await getExamIdBySlug(data.examSlug);

  return getDb().examUpdate.create({
    data: {
      body: data.body,
      examId,
      officialLink: data.officialLink,
      status: data.status,
      title: data.title,
      updateDate: data.updateDate ? new Date(data.updateDate) : null,
      updateType: data.updateType,
      year: data.year,
    },
  });
}

export async function rebuildSearchIndex() {
  return syncSearchIndex();
}
