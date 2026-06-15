import assert from "node:assert/strict";
import test from "node:test";
import { canUseSystemHealthAction } from "../src/lib/admin-auth";
import { getAuditLogs, resetAuditLogsForTests } from "../src/lib/admin-audit";
import {
  applySafeFix,
  cleanRepeatedTitleWords,
  hasDuplicatePlatformValues,
  hasRepeatedTitleWords,
  resetSystemHealthForTests,
  scanSystemHealth,
  type MutableGameDeal,
} from "../src/lib/system-health";

function createDeal(overrides: Partial<MutableGameDeal> = {}): MutableGameDeal {
  return {
    id: "deal-1",
    title: "Example Game",
    worth: "$19.99",
    thumbnail: "https://example.com/image.jpg",
    image: "https://example.com/image.jpg",
    description: "A useful description.",
    instructions: "Claim from the official storefront.",
    open_giveaway_url: "https://example.com/claim",
    published_date: "2026-06-01 00:00:00",
    type: "Game",
    platforms: "PC",
    start_date: "2026-06-01 00:00:00",
    end_date: "2026-06-20 00:00:00",
    users: 100,
    status: "Active",
    ...overrides,
  };
}

test("expired-deal auto-fix marks an active expired deal as expired", async () => {
  resetSystemHealthForTests();
  resetAuditLogsForTests();

  const deals = [
    createDeal({
      end_date: "2026-06-01 00:00:00",
      status: "Active",
    }),
  ];
  const issues = scanSystemHealth({ deals, now: new Date("2026-06-15T00:00:00Z") });
  const issue = issues.find((candidate) => candidate.type === "expired_deal_active");

  assert.ok(issue);
  const result = await applySafeFix(issue, deals);

  assert.equal(result.success, true);
  assert.equal(deals[0].status, "Expired");
  assert.equal(deals[0].active, false);
});

test("duplicate-platform cleanup preserves first platform values only", async () => {
  resetSystemHealthForTests();

  const deals = [createDeal({ platforms: "PC, Steam, PC, steam" })];
  const issues = scanSystemHealth({ deals, now: new Date("2026-06-15T00:00:00Z") });
  const issue = issues.find((candidate) => candidate.type === "duplicate_platform_values");

  assert.ok(issue);
  assert.equal(hasDuplicatePlatformValues(deals[0].platforms), true);

  const result = await applySafeFix(issue, deals);

  assert.equal(result.success, true);
  assert.equal(deals[0].platforms, "PC, Steam");
  assert.equal(hasDuplicatePlatformValues(deals[0].platforms), false);
});

test("repeated-title cleanup removes adjacent repeated words", async () => {
  resetSystemHealthForTests();

  const deals = [createDeal({ title: "Giveaway Giveaway Weekend Weekend" })];
  const issues = scanSystemHealth({ deals, now: new Date("2026-06-15T00:00:00Z") });
  const issue = issues.find((candidate) => candidate.type === "repeated_title_words");

  assert.ok(issue);
  assert.equal(hasRepeatedTitleWords(deals[0].title), true);
  assert.equal(cleanRepeatedTitleWords(deals[0].title), "Giveaway Weekend");

  const result = await applySafeFix(issue, deals);

  assert.equal(result.success, true);
  assert.equal(deals[0].title, "Giveaway Weekend");
  assert.equal(hasRepeatedTitleWords(deals[0].title), false);
});

test("failed auto-fix rolls the affected deal back", async () => {
  resetSystemHealthForTests();

  const deals = [createDeal({ platforms: "PC, PC" })];
  const originalPlatforms = deals[0].platforms;
  const issues = scanSystemHealth({ deals, now: new Date("2026-06-15T00:00:00Z") });
  const issue = issues.find((candidate) => candidate.type === "duplicate_platform_values");

  assert.ok(issue);
  const result = await applySafeFix(issue, deals, {
    validateOverride: () => false,
  });

  assert.equal(result.success, false);
  assert.equal(result.rolledBack, true);
  assert.equal(deals[0].platforms, originalPlatforms);
});

test("role authorization blocks non-owner safe auto-fixes", () => {
  assert.equal(canUseSystemHealthAction("Owner", "fix-safe"), true);
  assert.equal(canUseSystemHealthAction("Editor", "fix-safe"), false);
  assert.equal(canUseSystemHealthAction("Viewer", "fix-safe"), false);
  assert.equal(canUseSystemHealthAction("Viewer", "read"), true);
});

test("safe fixes create audit-log entries", async () => {
  resetSystemHealthForTests();
  resetAuditLogsForTests();

  const deals = [createDeal({ title: "Game Game" })];
  const issues = scanSystemHealth({ deals, now: new Date("2026-06-15T00:00:00Z") });
  const issue = issues.find((candidate) => candidate.type === "repeated_title_words");

  assert.ok(issue);
  await applySafeFix(issue, deals, {
    actorEmail: "owner@example.com",
    actorRole: "Owner",
  });

  const logs = getAuditLogs();
  assert.equal(logs.length >= 2, true);
  assert.equal(logs[0].actorEmail, "owner@example.com");
  assert.match(logs[0].action, /system-health:repeated_title_words/);
});
