import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePlatformRoutes } from "@/lib/revalidate";
import { createExam } from "@/services/admin";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const exam = await createExam(payload);
    revalidatePlatformRoutes(exam.slug);

    return NextResponse.json({
      message: "Exam saved and pages queued for revalidation.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save exam.",
      },
      { status: 400 },
    );
  }
}
