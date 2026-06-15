import { NextResponse } from "next/server";
import { isAuthorizedCronRequest } from "@/lib/admin-auth";
import { runSystemHealthScan } from "@/lib/system-health-runtime";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runSystemHealthScan();
  return NextResponse.json({
    success: true,
    summary: result.summary,
    issueCount: result.issues.length,
  });
}
