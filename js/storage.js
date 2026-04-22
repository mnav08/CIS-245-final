const MoodMapStorage = {
  key: "moodMapEntries",

  getEntries() {
    const savedEntries = localStorage.getItem(this.key);
    return savedEntries ? JSON.parse(savedEntries) : [];
  },

  saveEntries(entries) {
    localStorage.setItem(this.key, JSON.stringify(entries));
  }
};
