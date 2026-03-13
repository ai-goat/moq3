import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePlatformRoutes } from "@/lib/revalidate";
import { upsertExamStat } from "@/services/admin";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const stat = await upsertExamStat(payload);
    revalidatePlatformRoutes(String(payload.examSlug), stat.year);

    return NextResponse.json({
      message: "Exam stats saved and analysis pages refreshed.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save exam stats.",
      },
      { status: 400 },
    );
  }
}
