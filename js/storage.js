const MoodMapStorage = {
  key: "moodMapEntriesV2",

  getEntries() {
    const savedEntries = localStorage.getItem(this.key);

    if (!savedEntries) {
      return [];
    }

    try {
      const parsedEntries = JSON.parse(savedEntries);
      return Array.isArray(parsedEntries) ? parsedEntries : [];
    } catch (error) {
      localStorage.removeItem(this.key);
      return [];
    }
  },

  saveEntries(entries) {
    localStorage.setItem(this.key, JSON.stringify(entries));
  }
};
