import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { rebuildSearchIndex } from "@/services/admin";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await rebuildSearchIndex();

    return NextResponse.json({
      message: result.enabled
        ? "Search index rebuild started."
        : "Meilisearch is not configured. Local search fallback remains active.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to rebuild search index.",
      },
      { status: 400 },
    );
  }
}
