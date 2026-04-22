const MoodMapExport = {
  toCsv(entries) {
    const header = ["date", "mood", "sleep", "hydration", "energy", "note"];
    const rows = entries.map((entry) => header.map((field) => `"${String(entry[field] || "").replaceAll('"', '""')}"`));
    return [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
  },

  downloadCsv(entries) {
    const csv = this.toCsv(entries);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "mood-map-entries.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
};
