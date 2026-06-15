export type AdminAuditSeverity = "Info" | "Warning" | "Error" | "Critical";
export type AdminAuditStatus = "Recorded" | "Succeeded" | "Failed" | "RolledBack";

export type AdminAuditLogEntry = {
  id: string;
  action: string;
  actorEmail: string;
  actorRole: string;
  targetType: string;
  targetId: string;
  severity: AdminAuditSeverity;
  message: string;
  status: AdminAuditStatus;
  createdAt: string;
  before?: unknown;
  after?: unknown;
};

const auditLogs: AdminAuditLogEntry[] = [];

function createAuditId() {
  return `audit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function addAuditLog(entry: Omit<AdminAuditLogEntry, "id" | "createdAt">) {
  const auditEntry: AdminAuditLogEntry = {
    id: createAuditId(),
    createdAt: new Date().toISOString(),
    ...entry,
  };

  auditLogs.unshift(auditEntry);
  if (auditLogs.length > 300) auditLogs.length = 300;

  return auditEntry;
}

export function getAuditLogs(limit = 100) {
  return auditLogs.slice(0, limit);
}

export function resetAuditLogsForTests() {
  auditLogs.length = 0;
}
