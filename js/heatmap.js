const MoodMapHeatmap = {
  moodColors: {
    1: "#ef4444",
    2: "#f97316",
    3: "#f6c56f",
    4: "#84cc16",
    5: "#31d5c6"
  },

  render(containerId, entries, options = {}) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const limit = options.limit || 30;
    const showEmptyCells = options.showEmptyCells !== false;
    const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    const visibleEntries = sortedEntries.slice(Math.max(sortedEntries.length - limit, 0));
    const cellCount = showEmptyCells ? Math.max(limit, visibleEntries.length) : visibleEntries.length;
    const emptyCells = Math.max(cellCount - visibleEntries.length, 0);

    for (let index = 0; index < cellCount; index += 1) {
      const cell = document.createElement("span");
      const entry = visibleEntries[index - emptyCells];
      const mood = entry ? Number(entry.mood) : 0;
      const color = this.moodColors[mood] || "var(--color-surface-raised)";

      cell.className = "heatmap-cell";
      cell.style.backgroundColor = color;

      if (entry) {
        cell.dataset.tooltip = entry.date;
        cell.title = entry.date;
        cell.tabIndex = 0;
        cell.setAttribute("aria-label", `${entry.date}, mood ${mood} out of 5`);
      } else {
        cell.classList.add("heatmap-cell-empty");
        cell.title = "No entry";
        cell.setAttribute("aria-label", "No mood entry");
      }

      container.appendChild(cell);
    }
  }
};
