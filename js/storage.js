const MoodMapStorage = {
  key: "moodMapEntriesV2",

  getEntries() {
    const savedEntries = localStorage.getItem(this.key);
    return savedEntries ? JSON.parse(savedEntries) : [];
  },

  saveEntries(entries) {
    localStorage.setItem(this.key, JSON.stringify(entries));
  }
};
