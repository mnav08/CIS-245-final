document.addEventListener("DOMContentLoaded", () => {
  const entries = MoodMapEntries.getAll();

  markActiveNavigation();
  setupCheckInForm();
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const entry = {
      date: MoodMapEntries.getTodayDate(),
      mood: formData.get("mood"),
      sleep: formData.get("sleep"),
      hydration: formData.get("hydration"),
      energy: formData.get("energy"),
      note: formData.get("note").trim()
    };

    MoodMapEntries.save(entry);
    document.getElementById("check-in-message").textContent = "Today's check-in is saved.";
  });
}

function renderDashboard(entries) {
  if (typeof MoodMapHeatmap !== "undefined") {
    MoodMapHeatmap.render("dashboard-heatmap", entries);
  }

  const streakCount = document.getElementById("streak-count");
  const quickStats = document.getElementById("quick-stats");

  if (streakCount && typeof MoodMapInsights !== "undefined") {
    streakCount.textContent = MoodMapInsights.getStreak(entries);
  }

  if (quickStats && entries.length && typeof MoodMapInsights !== "undefined") {
    quickStats.textContent = `Average mood: ${MoodMapInsights.getAverage(entries, "mood")}/10`;
  }
}

function renderHistory(entries) {
  const list = document.getElementById("entries-list");

  if (!list) {
    return;
  }

  if (!entries.length) {
    list.textContent = "No entries yet.";
    return;
  }

  list.innerHTML = entries.map((entry) => `
    <article class="entry-card">
      <h2>${entry.date}</h2>
      <p>Mood: ${entry.mood}/10 | Sleep: ${entry.sleep}/10 | Hydration: ${entry.hydration}/10 | Energy: ${entry.energy}/10</p>
      <p>${entry.note || "No note added."}</p>
      <div class="entry-actions">
        <button class="button" type="button" data-delete-date="${entry.date}">Delete</button>
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
      <p>You need at least 7 mood entries to unlock insights.</p>
      <p>You have ${entries.length} so far. ${remaining} to go.</p>
      <div class="progress-track" aria-label="Insight unlock progress">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <h2>Your Patterns</h2>
    <p>Average mood: ${MoodMapInsights.getAverage(entries, "mood")}/10</p>
    <p>Average sleep quality: ${MoodMapInsights.getAverage(entries, "sleep")}/10</p>
    <p>Average energy: ${MoodMapInsights.getAverage(entries, "energy")}/10</p>
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
