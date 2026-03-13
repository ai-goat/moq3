import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePlatformRoutes } from "@/lib/revalidate";
import { createCutoff } from "@/services/admin";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const cutoff = await createCutoff(payload);
    revalidatePlatformRoutes(String(payload.examSlug), cutoff.year);

    return NextResponse.json({
      message: "Cutoff saved and pages queued for refresh.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save cutoff.",
      },
      { status: 400 },
    );
  }
}
