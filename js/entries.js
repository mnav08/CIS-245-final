const MoodMapEntries = {
  getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  },

  getAll() {
    return MoodMapStorage.getEntries().sort((a, b) => b.date.localeCompare(a.date));
  },

  hasEntryForDate(date) {
    return MoodMapStorage.getEntries().some((entry) => entry.date === date);
  },

  save(entry) {
    const entries = MoodMapStorage.getEntries();
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
