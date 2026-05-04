import { beforeEach, describe, expect, it } from "vitest";
import { loadBrowserScript } from "./helpers/loadBrowserScript";

describe("MoodMapExport", () => {
  beforeEach(() => {
    delete window.MoodMapExport;
    loadBrowserScript("js/export.js");
  });

  it("quotes CSV values and escapes inner double quotes", () => {
    expect(window.MoodMapExport.escapeCsvValue('He said "hello"')).toBe("\"He said \"\"hello\"\"\"");
  });

  it("prefixes potentially dangerous spreadsheet values", () => {
    expect(window.MoodMapExport.escapeCsvValue("=SUM(A1:A2)")).toBe("\"'=SUM(A1:A2)\"");
    expect(window.MoodMapExport.escapeCsvValue("-2+3")).toBe("\"'-2+3\"");
  });

  it("creates a CSV string with the expected header and row order", () => {
    const entries = [
      {
        date: "2026-05-04",
        mood: 5,
        sleep: 4,
        hydration: 3,
        energy: 2,
        note: "Steady day"
      }
    ];

    expect(window.MoodMapExport.toCsv(entries)).toBe(
      [
        "date,mood,sleep,hydration,energy,note",
        "\"2026-05-04\",\"5\",\"4\",\"3\",\"2\",\"Steady day\""
      ].join("\n")
    );
  });
});
