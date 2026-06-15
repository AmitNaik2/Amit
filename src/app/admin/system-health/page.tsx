"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Database,
  RefreshCw,
  RotateCcw,
  Server,
  ShieldAlert,
  Sparkles,
  Wrench,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IssueSeverity = "Info" | "Warning" | "Error" | "Critical";
type IssueStatus = "Open" | "Ignored" | "Resolved" | "AutoFixed" | "FixFailed" | "RolledBack";

type HealthIssue = {
  id: string;
  type: string;
  affected: string;
  route?: string;
  severity: IssueSeverity;
  message: string;
  detectedAt: string;
  status: IssueStatus;
  recommendedFix: string;
  autoFixAllowed: boolean;
  approvalRequired: boolean;
};

type HealthSummary = {
  totalOpen: number;
  criticalIssues: number;
  autoFixedToday: number;
  failedFixes: number;
  lastSystemScan: string | null;
  apiHealth: string;
  databaseHealth: string;
  cacheHealth: string;
};

type HealthState = {
  issues: HealthIssue[];
  summary: HealthSummary;
};

const emptySummary: HealthSummary = {
  totalOpen: 0,
  criticalIssues: 0,
  autoFixedToday: 0,
  failedFixes: 0,
  lastSystemScan: null,
  apiHealth: "Not checked",
  databaseHealth: "Not checked",
  cacheHealth: "Not checked",
};

function severityClass(severity: IssueSeverity) {
  if (severity === "Critical") return "border-[#ef4444]/40 bg-[#ef4444]/10 text-[#fecaca]";
  if (severity === "Error") return "border-[#f97316]/40 bg-[#f97316]/10 text-[#fed7aa]";
  if (severity === "Warning") return "border-[#eab308]/40 bg-[#eab308]/10 text-[#fde68a]";
  return "border-[#3b82f6]/40 bg-[#3b82f6]/10 text-[#bfdbfe]";
}

function healthClass(value: string) {
  if (value === "Healthy") return "text-[#22c55e]";
  if (value === "Warning") return "text-[#eab308]";
  if (value === "Not checked") return "text-[#a1a1aa]";
  return "text-[#ef4444]";
}

function formatDate(value: string | null) {
  if (!value) return "Not scanned yet";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}

function relativeTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const mins = Math.max(0, Math.floor(diffMs / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AdminSystemHealthPage() {
  const [state, setState] = useState<HealthState>({ issues: [], summary: emptySummary });
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [reviewIssueId, setReviewIssueId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | IssueSeverity | IssueStatus>("All");

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("gdh_admin_token") || "";
  }, []);

  const requestHeaders = useCallback(() => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }, [token]);

  const loadHealth = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/system-health", {
        headers: requestHeaders(),
        credentials: "include",
      });
      if (response.status === 401) {
        setError("Sign in through the admin portal first, then open System Health again.");
        return;
      }
      if (!response.ok) throw new Error("System health request failed.");
      setState(await response.json() as HealthState);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load system health.");
    } finally {
      setLoading(false);
    }
  }, [requestHeaders]);

  useEffect(() => {
    void loadHealth();
  }, [loadHealth]);

  const runAction = async (action: string, issueId?: string) => {
    setBusyAction(issueId ? `${action}:${issueId}` : action);
    setError("");
    try {
      const response = await fetch("/api/admin/system-health", {
        method: "POST",
        headers: requestHeaders(),
        credentials: "include",
        body: JSON.stringify({ action, issueId }),
      });
      if (response.status === 401) throw new Error("Your admin session is not authorized for this action.");
      if (!response.ok) throw new Error("System health action failed.");
      const data = await response.json();
      setState({ issues: data.issues || state.issues, summary: data.summary || state.summary });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Action failed.");
    } finally {
      setBusyAction(null);
    }
  };

  const filteredIssues = state.issues.filter((issue) => {
    if (filter === "All") return true;
    return issue.severity === filter || issue.status === filter;
  });

  return (
    <main className="min-h-screen bg-[#09090b] text-[#fafafa]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-[#3f3f46] pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to admin
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3b82f6]/10 text-[#3b82f6]">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">System Health</h1>
                <p className="text-sm text-[#a1a1aa]">Automated error monitor and safe auto-fix controls.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => runAction("scan")}
              disabled={Boolean(busyAction)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#3f3f46] bg-[#18181b] px-4 py-2 text-sm font-semibold text-white hover:border-[#3b82f6] disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", busyAction === "scan" && "animate-spin")} />
              Scan Now
            </button>
            <button
              onClick={() => runAction("fix-safe")}
              disabled={Boolean(busyAction)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#fafafa] px-4 py-2 text-sm font-bold text-[#09090b] hover:bg-white disabled:opacity-50"
            >
              <Wrench className="h-4 w-4" />
              Fix Safe Issues
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-[#ef4444]/30 bg-[#ef4444]/10 p-4 text-sm text-[#fecaca]">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <HealthCard title="Total open issues" value={String(state.summary.totalOpen)} icon={AlertTriangle} tone="text-[#eab308]" />
          <HealthCard title="Critical issues" value={String(state.summary.criticalIssues)} icon={XCircle} tone="text-[#ef4444]" />
          <HealthCard title="Auto-fixed today" value={String(state.summary.autoFixedToday)} icon={Sparkles} tone="text-[#22c55e]" />
          <HealthCard title="Failed fixes" value={String(state.summary.failedFixes)} icon={RotateCcw} tone="text-[#f97316]" />
          <HealthCard title="Last system scan" value={formatDate(state.summary.lastSystemScan)} icon={Clock} tone="text-[#3b82f6]" compact />
          <HealthCard title="API health" value={state.summary.apiHealth} icon={Server} tone={healthClass(state.summary.apiHealth)} />
          <HealthCard title="Database health" value={state.summary.databaseHealth} icon={Database} tone={healthClass(state.summary.databaseHealth)} />
          <HealthCard title="Cache health" value={state.summary.cacheHealth} icon={RefreshCw} tone={healthClass(state.summary.cacheHealth)} />
        </section>

        <section className="rounded-xl border border-[#3f3f46] bg-[#18181b]">
          <div className="flex flex-col gap-3 border-b border-[#3f3f46] p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold">Detected Issues</h2>
              <p className="text-sm text-[#a1a1aa]">
                Safe fixes are deterministic. Critical/destructive changes require owner review.
              </p>
            </div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as typeof filter)}
              className="rounded-lg border border-[#3f3f46] bg-[#09090b] px-3 py-2 text-sm text-white outline-none focus:border-[#3b82f6]"
            >
              {["All", "Critical", "Error", "Warning", "Info", "Open", "AutoFixed", "FixFailed", "Ignored", "Resolved", "RolledBack"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="p-8 text-center text-[#a1a1aa]">Scanning live systems...</div>
          ) : filteredIssues.length === 0 ? (
            <div className="flex flex-col items-center gap-3 p-10 text-center text-[#a1a1aa]">
              <CheckCircle2 className="h-10 w-10 text-[#22c55e]" />
              <p>No issues match the current filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#3f3f46]">
              {filteredIssues.map((issue) => (
                <article key={issue.id} className="p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wide", severityClass(issue.severity))}>
                          {issue.severity}
                        </span>
                        <span className="rounded-full border border-[#3f3f46] bg-[#09090b] px-2.5 py-1 text-xs font-semibold text-[#a1a1aa]">
                          {issue.status}
                        </span>
                        <span className="text-xs text-[#71717a]">{relativeTime(issue.detectedAt)}</span>
                      </div>
                      <h3 className="font-semibold text-white">{issue.message}</h3>
                      <p className="mt-1 text-sm text-[#a1a1aa]">{issue.recommendedFix}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#71717a]">
                        <span>Type: {issue.type}</span>
                        <span>Affected: {issue.affected}</span>
                        {issue.route && <span>Route: {issue.route}</span>}
                        <span>{issue.autoFixAllowed && !issue.approvalRequired ? "Auto-fix allowed" : "Review required"}</span>
                      </div>
                      {reviewIssueId === issue.id && (
                        <pre className="mt-4 overflow-x-auto rounded-lg border border-[#3f3f46] bg-[#09090b] p-3 text-xs text-[#d4d4d8]">
                          {JSON.stringify(issue, null, 2)}
                        </pre>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <IssueButton label="Review Fix" onClick={() => setReviewIssueId(reviewIssueId === issue.id ? null : issue.id)} />
                      <IssueButton label="Ignore" onClick={() => runAction("ignore", issue.id)} busy={busyAction === `ignore:${issue.id}`} />
                      <IssueButton label="Mark Resolved" onClick={() => runAction("mark-resolved", issue.id)} busy={busyAction === `mark-resolved:${issue.id}`} />
                      <IssueButton label="Retry" onClick={() => runAction("retry", issue.id)} busy={busyAction === `retry:${issue.id}`} />
                      <IssueButton label="Roll Back" onClick={() => runAction("rollback", issue.id)} busy={busyAction === `rollback:${issue.id}`} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function HealthCard({
  title,
  value,
  icon: Icon,
  tone,
  compact = false,
}: {
  title: string;
  value: string;
  icon: typeof AlertTriangle;
  tone: string;
  compact?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#3f3f46] bg-[#18181b] p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#a1a1aa]">{title}</p>
        <Icon className={cn("h-5 w-5", tone)} />
      </div>
      <p className={cn("font-bold tracking-tight", compact ? "text-base leading-snug" : "text-3xl", tone)}>{value}</p>
    </div>
  );
}

function IssueButton({
  label,
  onClick,
  busy = false,
}: {
  label: string;
  onClick: () => void;
  busy?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="rounded-lg border border-[#3f3f46] bg-[#09090b] px-3 py-2 text-xs font-semibold text-[#d4d4d8] hover:border-[#3b82f6] hover:text-white disabled:opacity-50"
    >
      {busy ? "Working..." : label}
    </button>
  );
}
