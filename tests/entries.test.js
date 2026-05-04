import { beforeEach, describe, expect, it } from "vitest";
import { loadBrowserScript } from "./helpers/loadBrowserScript";

describe("MoodMapEntries", () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.MoodMapStorage;
    delete window.MoodMapEntries;
    loadBrowserScript("js/storage.js");
    loadBrowserScript("js/entries.js");
  });

  it("formats dates as YYYY-MM-DD", () => {
    const date = new Date(2026, 0, 5);

    expect(window.MoodMapEntries.formatDate(date)).toBe("2026-01-05");
  });

  it("returns entries sorted newest first", () => {
    window.MoodMapStorage.saveEntries([
      { date: "2026-05-01", mood: 2 },
      { date: "2026-05-03", mood: 4 },
      { date: "2026-05-02", mood: 3 }
    ]);

    expect(window.MoodMapEntries.getAll().map((entry) => entry.date)).toEqual([
      "2026-05-03",
      "2026-05-02",
      "2026-05-01"
    ]);
  });

  it("detects whether an entry exists for a given date", () => {
    const entries = [
      { date: "2026-05-03", mood: 4 },
      { date: "2026-05-04", mood: 5 }
    ];

    expect(window.MoodMapEntries.hasEntryForDate("2026-05-04", entries)).toBe(true);
    expect(window.MoodMapEntries.hasEntryForDate("2026-05-01", entries)).toBe(false);
  });

  it("saves a new entry when its date is unique", () => {
    const existingEntries = [{ date: "2026-05-03", mood: 4 }];
    const newEntry = { date: "2026-05-04", mood: 5, note: "New" };

    const wasSaved = window.MoodMapEntries.saveWithEntries(newEntry, existingEntries);

    expect(wasSaved).toBe(true);
    expect(window.MoodMapStorage.getEntries()).toEqual([
      { date: "2026-05-03", mood: 4 },
      { date: "2026-05-04", mood: 5, note: "New" }
    ]);
  });

  it("rejects duplicate entries for the same date", () => {
    const entries = [{ date: "2026-05-04", mood: 3 }];

    const wasSaved = window.MoodMapEntries.saveWithEntries(
      { date: "2026-05-04", mood: 5 },
      entries
    );

    expect(wasSaved).toBe(false);
    expect(window.MoodMapStorage.getEntries()).toEqual([]);
  });

  it("replaces all stored entries", () => {
    const entries = [
      { date: "2026-05-01", mood: 1 },
      { date: "2026-05-02", mood: 2 }
    ];

    window.MoodMapEntries.replaceAll(entries);

    expect(window.MoodMapStorage.getEntries()).toEqual(entries);
  });

  it("deletes the entry matching the requested date", () => {
    window.MoodMapStorage.saveEntries([
      { date: "2026-05-01", mood: 1 },
      { date: "2026-05-02", mood: 2 },
      { date: "2026-05-03", mood: 3 }
    ]);

    window.MoodMapEntries.delete("2026-05-02");

    expect(window.MoodMapStorage.getEntries()).toEqual([
      { date: "2026-05-01", mood: 1 },
      { date: "2026-05-03", mood: 3 }
    ]);
  });
});
