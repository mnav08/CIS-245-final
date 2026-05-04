import { beforeEach, describe, expect, it } from "vitest";
import { loadBrowserScript } from "./helpers/loadBrowserScript";

describe("MoodMapHeatmap", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id=\"heatmap\"></div>";
    delete window.MoodMapHeatmap;
    loadBrowserScript("js/heatmap.js");
  });

  it("renders empty cells up to the requested limit by default", () => {
    window.MoodMapHeatmap.render("heatmap", [{ date: "2026-05-04", mood: 5 }], { limit: 3 });

    const cells = [...document.querySelectorAll(".heatmap-cell")];

    expect(cells).toHaveLength(3);
    expect(cells[0].getAttribute("aria-label")).toBe("No mood entry");
    expect(cells[2].getAttribute("aria-label")).toBe("2026-05-04, mood 5 out of 5");
  });

  it("renders entries in ascending date order within the visible range", () => {
    window.MoodMapHeatmap.render(
      "heatmap",
      [
        { date: "2026-05-03", mood: 3 },
        { date: "2026-05-01", mood: 1 },
        { date: "2026-05-02", mood: 2 }
      ],
      { limit: 3, showEmptyCells: false }
    );

    const cells = [...document.querySelectorAll(".heatmap-cell")];

    expect(cells.map((cell) => cell.title)).toEqual([
      "2026-05-01",
      "2026-05-02",
      "2026-05-03"
    ]);
  });

  it("uses the fallback style for missing mood colors", () => {
    window.MoodMapHeatmap.render("heatmap", [{ date: "2026-05-04", mood: 9 }], { showEmptyCells: false });

    const cell = document.querySelector(".heatmap-cell");

    expect(cell.style.backgroundColor).toBe("var(--color-surface-raised)");
  });
});
