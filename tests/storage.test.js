import { beforeEach, describe, expect, it } from "vitest";
import { loadBrowserScript } from "./helpers/loadBrowserScript";

describe("MoodMapStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.MoodMapStorage;
    loadBrowserScript("js/storage.js");
  });

  it("returns an empty array when storage is empty", () => {
    expect(window.MoodMapStorage.getEntries()).toEqual([]);
  });

  it("returns parsed entries when valid JSON is stored", () => {
    const entries = [{ date: "2026-05-04", mood: 4 }];
    localStorage.setItem(window.MoodMapStorage.key, JSON.stringify(entries));

    expect(window.MoodMapStorage.getEntries()).toEqual(entries);
  });

  it("returns an empty array when stored JSON is not an array", () => {
    localStorage.setItem(window.MoodMapStorage.key, JSON.stringify({ date: "2026-05-04" }));

    expect(window.MoodMapStorage.getEntries()).toEqual([]);
  });

  it("clears corrupted JSON and returns an empty array", () => {
    localStorage.setItem(window.MoodMapStorage.key, "{broken json");

    expect(window.MoodMapStorage.getEntries()).toEqual([]);
    expect(localStorage.getItem(window.MoodMapStorage.key)).toBeNull();
  });

  it("saves entries back to localStorage as JSON", () => {
    const entries = [{ date: "2026-05-04", mood: 5, note: "Great day" }];

    window.MoodMapStorage.saveEntries(entries);

    expect(localStorage.getItem(window.MoodMapStorage.key)).toBe(JSON.stringify(entries));
  });
});
