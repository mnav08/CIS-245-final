# Mood Map User Manual

## Overview

Mood Map helps you track daily emotional patterns with a short check-in. Each entry records your mood, sleep, hydration, energy, and an optional note. Your entries are stored in your browser and used to build heatmaps, streaks, and simple insights.

## Before You Start

- Your data is saved in the current browser only
- Clearing browser storage may remove your saved entries
- You can save only one check-in per calendar day

## Main Navigation

Mood Map includes four pages:

- `Dashboard` for summary cards, streak, and a heatmap preview
- `Check-In` for saving today’s entry
- `History` for reviewing, deleting, and exporting entries
- `Insights` for viewing progress and unlocked averages

## How To Use Mood Map

### 1. Save a Daily Check-In

1. Open `Check-In`.
2. Select a rating from `1` to `5` for:
   - Mood
   - Sleep quality
   - Hydration
   - Energy
3. Add an optional note if needed.
4. Click `Save check-in`.

After a successful save, the page will confirm that today’s check-in is stored. If you already saved an entry for the day, the form will show a message and prevent another submission.

### 2. Review Your Dashboard

The `Dashboard` gives you a quick summary of your recent data:

- `Today` card links you to the check-in page
- `Heatmap` shows recent mood entries as color-coded cells
- `Streak` shows how many consecutive days, including today, you have logged an entry
- `Quick Stats` shows averages for mood and energy plus your current streak

### 3. Generate Sample Data

If you want to preview the app without entering data manually:

1. Open `Dashboard`.
2. Click `Generate 30 days`.

This creates 30 days of sample entries and replaces any currently saved entries.

### 4. View Entry History

Open `History` to:

- See all saved entries in reverse chronological order
- View a larger heatmap
- Read saved notes
- Delete unwanted entries

Each history card shows:

- Date
- Mood
- Sleep
- Hydration
- Energy
- Note

### 5. Delete an Entry

1. Open `History`.
2. Find the entry you want to remove.
3. Click `Delete entry`.

The entry is removed immediately from local storage and the page refreshes automatically.

### 6. Export Your Data

1. Open `History`.
2. Click `Export CSV`.

Mood Map downloads a file named `mood-map-entries.csv`. You can open it in spreadsheet software for personal review or backup.

### 7. Unlock Insights

Open `Insights` to track your progress.

- Insights unlock after `7` saved entries
- Before unlock, you will see:
  - your current entry count
  - how many more entries you need
  - a progress bar
- After unlock, you will see average values for:
  - mood
  - sleep quality
  - energy

## Heatmap Color Meaning

The heatmap uses your mood rating for each saved day:

- `1` = red, lowest mood
- `2` = orange
- `3` = yellow
- `4` = green
- `5` = teal, highest mood

Empty cells mean there is no saved entry for that day.

## Troubleshooting

### My check-in will not save

Possible reasons:

- You already saved an entry today
- A required rating was not selected

### My old entries disappeared

Possible reasons:

- Browser storage was cleared
- Sample data replaced your previous entries
- You are using a different browser or device

### Export is empty

If no entries are stored, the CSV file may contain only the header row.

## Known Limitations

- Editing an existing entry is not available yet
- Data does not sync between devices
- Insights are intentionally minimal in this MVP

## Best Practices

- Complete the check-in around the same time each day
- Use short notes only when they help explain a pattern
- Export your CSV occasionally if you want an extra backup
