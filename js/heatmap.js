const MoodMapHeatmap = {
  render(containerId, entries) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = "";

    // MVP preview: render the latest 28 days as simple mood intensity squares.
    for (let index = 0; index < 28; index += 1) {
      const cell = document.createElement("span");
      const entry = entries[index];
      const mood = entry ? Number(entry.mood) : 0;
      const opacity = mood ? 0.25 + mood / 14 : 0.18;

      cell.className = "heatmap-cell";
      cell.style.backgroundColor = `rgba(49, 213, 198, ${opacity})`;
      container.appendChild(cell);
    }
  }
};
