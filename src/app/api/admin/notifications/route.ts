import { NextResponse } from "next/server";
import { authorizeSystemHealthRequest } from "@/lib/admin-auth";
import { getOpenSystemHealthIssues } from "@/lib/system-health";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = authorizeSystemHealthRequest(request, "read");
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const notifications = getOpenSystemHealthIssues(12).map((issue) => ({
    id: issue.id,
    title: issue.type.replace(/_/g, " "),
    message: issue.message,
    severity: issue.severity,
    createdAt: issue.detectedAt,
    href: issue.route || "/admin/system-health",
    read: false,
  }));

  return NextResponse.json({ notifications });
}
