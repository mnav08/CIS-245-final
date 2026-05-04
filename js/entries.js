const MoodMapEntries = {
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  },

  getTodayDate() {
    return this.formatDate(new Date());
  },

  getAll() {
    return MoodMapStorage.getEntries().sort((a, b) => b.date.localeCompare(a.date));
  },

  hasEntryForDate(date, entries = MoodMapStorage.getEntries()) {
    return entries.some((entry) => entry.date === date);
  },

  save(entry) {
    const entries = MoodMapStorage.getEntries();
    return this.saveWithEntries(entry, entries);
  },

  saveWithEntries(entry, entries) {
    const existingIndex = entries.findIndex((item) => item.date === entry.date);

    if (existingIndex >= 0) {
      return false;
    }

    entries.push(entry);
    MoodMapStorage.saveEntries(entries);
    return true;
  },

  replaceAll(entries) {
    MoodMapStorage.saveEntries(entries);
  },

  delete(date) {
    const entries = MoodMapStorage.getEntries().filter((entry) => entry.date !== date);
    MoodMapStorage.saveEntries(entries);
  }
};
