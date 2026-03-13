import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePlatformRoutes } from "@/lib/revalidate";
import { createExamUpdate } from "@/services/admin";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const update = await createExamUpdate(payload);
    revalidatePlatformRoutes(String(payload.examSlug), update.year);

    return NextResponse.json({
      message: "Exam update saved and related pages revalidated.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save exam update.",
      },
      { status: 400 },
    );
  }
}
