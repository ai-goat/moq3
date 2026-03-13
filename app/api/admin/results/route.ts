import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { revalidatePlatformRoutes } from "@/lib/revalidate";
import { createResult } from "@/services/admin";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const result = await createResult(payload);
    revalidatePlatformRoutes(String(payload.examSlug), result.year);

    return NextResponse.json({
      message: "Result saved and ISR refresh triggered.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save result.",
      },
      { status: 400 },
    );
  }
}
