document.addEventListener("DOMContentLoaded", () => {
  const entries = MoodMapEntries.getAll();

  markActiveNavigation();
  setupCheckInForm();
  setupSimulationButton();
  renderDashboard(entries);
  renderHistory(entries);
  renderInsights(entries);
  setupExport(entries);
});

function markActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function setupCheckInForm() {
  const form = document.getElementById("check-in-form");

  if (!form) {
    return;
  }

  const today = MoodMapEntries.getTodayDate();
  const message = document.getElementById("check-in-message");

  if (MoodMapEntries.hasEntryForDate(today)) {
    form.querySelector("button[type='submit']").disabled = true;
    message.textContent = "You already completed today's check-in.";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const todayDate = MoodMapEntries.getTodayDate();

    if (MoodMapEntries.hasEntryForDate(todayDate)) {
      message.textContent = "You already completed today's check-in.";
      return;
    }

    const formData = new FormData(form);
    const entry = {
      date: todayDate,
      mood: formData.get("mood"),
      sleep: formData.get("sleep"),
      hydration: formData.get("hydration"),
      energy: formData.get("energy"),
      note: formData.get("note").trim()
    };

    const wasSaved = MoodMapEntries.save(entry);

    if (wasSaved) {
      form.querySelector("button[type='submit']").disabled = true;
      message.textContent = "Today's check-in is saved.";
    }
  });
}

function setupSimulationButton() {
  const simulationButton = document.getElementById("generate-simulation");
  const simulationMessage = document.getElementById("simulation-message");

  if (!simulationButton) {
    return;
  }

  simulationButton.addEventListener("click", () => {
    const simulatedEntries = createSimulatedEntries(30);

    MoodMapEntries.replaceAll(simulatedEntries);

    if (simulationMessage) {
      simulationMessage.textContent = "30 days of sample entries were saved.";
    }

    window.setTimeout(() => {
      window.location.reload();
    }, 500);
  });
}

function createSimulatedEntries(days) {
  const notes = [
    "Steady day.",
    "A little tired.",
    "Good focus.",
    "Low energy.",
    "Felt balanced."
  ];
  const entries = [];

  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);

    entries.push({
      date: date.toISOString().slice(0, 10),
      mood: getSimulatedRating(index, 1),
      sleep: getSimulatedRating(index, 2),
      hydration: getSimulatedRating(index, 3),
      energy: getSimulatedRating(index, 4),
      note: notes[index % notes.length]
    });
  }

  return entries;
}

function getSimulatedRating(index, offset) {
  const wave = Math.sin((index + offset) / 3) * 1.2;
  const variation = ((index + offset) % 3) - 1;
  const rating = Math.round(3 + wave + variation * 0.35);

  return Math.min(Math.max(rating, 1), 5);
}

function renderDashboard(entries) {
  if (typeof MoodMapHeatmap !== "undefined") {
    MoodMapHeatmap.render("dashboard-heatmap", entries, { limit: 7 });
  }

  const streakCount = document.getElementById("streak-count");
  const quickStats = document.getElementById("quick-stats");

  if (streakCount && typeof MoodMapInsights !== "undefined") {
    streakCount.textContent = MoodMapInsights.getStreak(entries);
  }

  if (quickStats && typeof MoodMapInsights !== "undefined") {
    if (!entries.length) {
      quickStats.textContent = "No entries yet.";
      return;
    }

    quickStats.innerHTML = `
      <span><strong>Average mood</strong> ${MoodMapInsights.getAverage(entries, "mood")} out of 5</span>
      <span><strong>Streak</strong> ${MoodMapInsights.getStreak(entries)} days</span>
      <span><strong>Average energy</strong> ${MoodMapInsights.getAverage(entries, "energy")} out of 5</span>
    `;
  }
}

function renderHistory(entries) {
  const list = document.getElementById("entries-list");
  const fullHeatmap = document.getElementById("history-heatmap");

  if (fullHeatmap && typeof MoodMapHeatmap !== "undefined") {
    MoodMapHeatmap.render("history-heatmap", entries, {
      limit: Math.max(entries.length, 30),
      showEmptyCells: entries.length === 0
    });
  }

  if (!list) {
    return;
  }

  if (!entries.length) {
    list.textContent = "No entries yet.";
    return;
  }

  list.innerHTML = entries.map((entry) => `
    <article class="entry-card">
      <h3>${escapeHtml(entry.date)}</h3>
      <div class="entry-metrics">
        <span class="entry-metric mood-text">Mood: ${escapeHtml(entry.mood)} out of 5</span>
        <span class="entry-metric sleep-text">Sleep: ${escapeHtml(entry.sleep)} out of 5</span>
        <span class="entry-metric hydration-text">Hydration: ${escapeHtml(entry.hydration)} out of 5</span>
        <span class="entry-metric energy-text">Energy: ${escapeHtml(entry.energy)} out of 5</span>
      </div>
      <p class="entry-note">${escapeHtml(entry.note || "No note added.")}</p>
      <div class="entry-actions">
        <button class="button" type="button" data-delete-date="${escapeHtml(entry.date)}" aria-label="Delete entry for ${escapeHtml(entry.date)}">Delete entry</button>
      </div>
    </article>
  `).join("");

  list.addEventListener("click", (event) => {
    const deleteDate = event.target.dataset.deleteDate;

    if (deleteDate) {
      MoodMapEntries.delete(deleteDate);
      window.location.reload();
    }
  });
}

function renderInsights(entries) {
  const panel = document.getElementById("insights-panel");

  if (!panel || typeof MoodMapInsights === "undefined") {
    return;
  }

  const remaining = Math.max(MoodMapInsights.requiredEntries - entries.length, 0);
  const progress = Math.min((entries.length / MoodMapInsights.requiredEntries) * 100, 100);

  if (entries.length < MoodMapInsights.requiredEntries) {
    panel.innerHTML = `
      <h2>Insights locked</h2>
      <p>You need at least <span class="insight-highlight mood-text">7 mood entries</span> to unlock insights.</p>
      <p>You have <span class="insight-highlight energy-text">${entries.length}</span> so far. <span class="insight-highlight sleep-text">${remaining}</span> to go.</p>
      <div class="progress-track" role="progressbar" aria-label="Insight unlock progress" aria-valuemin="0" aria-valuemax="${MoodMapInsights.requiredEntries}" aria-valuenow="${entries.length}" aria-valuetext="${entries.length} of ${MoodMapInsights.requiredEntries} entries saved">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <h2>Your Patterns</h2>
    <p><span class="insight-label mood-text">Average mood</span> ${MoodMapInsights.getAverage(entries, "mood")}/5</p>
    <p><span class="insight-label sleep-text">Average sleep quality</span> ${MoodMapInsights.getAverage(entries, "sleep")}/5</p>
    <p><span class="insight-label energy-text">Average energy</span> ${MoodMapInsights.getAverage(entries, "energy")}/5</p>
  `;
}

function setupExport(entries) {
  const exportButton = document.getElementById("export-csv");

  if (!exportButton || typeof MoodMapExport === "undefined") {
    return;
  }

  exportButton.addEventListener("click", () => {
    MoodMapExport.downloadCsv(entries);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
