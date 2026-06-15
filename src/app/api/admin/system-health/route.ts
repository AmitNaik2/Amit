import { NextResponse } from "next/server";
import { addAuditLog } from "@/lib/admin-audit";
import { authorizeSystemHealthRequest } from "@/lib/admin-auth";
import {
  getMutableDealsForFixes,
  getSystemHealthState,
  retryPrimaryDealSync,
  revalidateHealthRoutes,
  runSystemHealthScan,
} from "@/lib/system-health-runtime";
import {
  applySafeFix,
  getSystemHealthIssues,
  rollBackIssue,
  summarizeSystemHealth,
  updateSystemHealthIssueStatus,
} from "@/lib/system-health";

export const dynamic = "force-dynamic";

type SystemHealthRequestBody = {
  action?: "scan" | "fix-safe" | "ignore" | "mark-resolved" | "retry" | "rollback";
  issueId?: string;
};

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  const session = authorizeSystemHealthRequest(request, "read");
  if (!session) return unauthorized();

  const state = getSystemHealthState();
  if (state.summary.lastSystemScan) return NextResponse.json(state);

  return NextResponse.json(await runSystemHealthScan());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as SystemHealthRequestBody;
  const action = body.action || "scan";
  const session = authorizeSystemHealthRequest(request, action === "mark-resolved" ? "mark-resolved" : action);
  if (!session) return unauthorized();

  if (action === "scan") {
    const result = await runSystemHealthScan();
    addAuditLog({
      action: "system-health:scan",
      actorEmail: session.email,
      actorRole: session.role,
      targetType: "system-health",
      targetId: "scan",
      severity: result.summary.criticalIssues > 0 ? "Critical" : result.summary.totalOpen > 0 ? "Warning" : "Info",
      message: `System health scan completed with ${result.summary.totalOpen} open issue(s).`,
      status: "Succeeded",
    });
    return NextResponse.json(result);
  }

  if (action === "ignore" || action === "mark-resolved") {
    if (!body.issueId) return NextResponse.json({ error: "issueId is required" }, { status: 400 });
    const issue = updateSystemHealthIssueStatus(body.issueId, action === "ignore" ? "Ignored" : "Resolved");
    if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    addAuditLog({
      action: `system-health:${action}`,
      actorEmail: session.email,
      actorRole: session.role,
      targetType: issue.type,
      targetId: String(issue.itemId || issue.affected),
      severity: issue.severity,
      message: `${action === "ignore" ? "Ignored" : "Marked resolved"} ${issue.affected}.`,
      status: "Succeeded",
    });

    return NextResponse.json({ issues: getSystemHealthIssues(), summary: summarizeSystemHealth() });
  }

  const deals = await getMutableDealsForFixes();

  if (action === "fix-safe") {
    const issues = getSystemHealthIssues().filter((issue) => issue.status === "Open" && issue.autoFixAllowed && !issue.approvalRequired);
    const results = [];

    for (const issue of issues) {
      results.push(await applySafeFix(issue, deals, {
        actorEmail: session.email,
        actorRole: session.role,
        retryApiSync: retryPrimaryDealSync,
        revalidateRoutes: revalidateHealthRoutes,
      }));
    }

    return NextResponse.json({
      results,
      issues: getSystemHealthIssues(),
      summary: summarizeSystemHealth(),
    });
  }

  if (action === "retry") {
    const issue = body.issueId ? getSystemHealthIssues().find((candidate) => candidate.id === body.issueId) : null;
    if (!issue) return NextResponse.json(await runSystemHealthScan());

    const result = await applySafeFix(issue, deals, {
      actorEmail: session.email,
      actorRole: session.role,
      retryApiSync: retryPrimaryDealSync,
      revalidateRoutes: revalidateHealthRoutes,
    });

    return NextResponse.json({
      result,
      issues: getSystemHealthIssues(),
      summary: summarizeSystemHealth(),
    });
  }

  if (action === "rollback") {
    if (!body.issueId) return NextResponse.json({ error: "issueId is required" }, { status: 400 });
    const rolledBack = rollBackIssue(body.issueId, deals, session.email, session.role);
    return NextResponse.json({
      rolledBack,
      issues: getSystemHealthIssues(),
      summary: summarizeSystemHealth(),
    });
  }

  return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
}
