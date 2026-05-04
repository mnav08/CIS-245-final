import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadBrowserScript } from "./helpers/loadBrowserScript";

describe("MoodMapInsights", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-04T12:00:00Z"));
    delete window.MoodMapEntries;
    delete window.MoodMapInsights;
    loadBrowserScript("js/entries.js");
    loadBrowserScript("js/insights.js");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 0 for averages when there are no entries", () => {
    expect(window.MoodMapInsights.getAverage([], "mood")).toBe(0);
  });

  it("calculates averages to one decimal place", () => {
    const entries = [
      { mood: "5" },
      { mood: "4" },
      { mood: "2" }
    ];

    expect(window.MoodMapInsights.getAverage(entries, "mood")).toBe(3.7);
  });

  it("counts a streak of consecutive daily entries from today", () => {
    const entries = [
      { date: "2026-05-04" },
      { date: "2026-05-03" },
      { date: "2026-05-02" },
      { date: "2026-04-30" }
    ];

    expect(window.MoodMapInsights.getStreak(entries)).toBe(3);
  });

  it("returns zero when there is no entry for today", () => {
    const entries = [
      { date: "2026-05-03" },
      { date: "2026-05-02" }
    ];

    expect(window.MoodMapInsights.getStreak(entries)).toBe(0);
  });
});
