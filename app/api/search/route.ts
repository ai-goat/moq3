import { NextResponse } from "next/server";

import { searchExamPages } from "@/services/public";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const items = await searchExamPages(query);

  return NextResponse.json({ items });
}
