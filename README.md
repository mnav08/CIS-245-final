# Mood Map

Mood Map is a vanilla front-end wellness tracker that helps users log one short check-in per day and turn that data into a visual mood history. The app stores entries in the browser, shows mood patterns with a heatmap, and unlocks summary insights after enough data has been collected.

## Features

- Daily check-in with ratings for mood, sleep, hydration, and energy
- Optional note for each entry
- One entry per day rule
- Dashboard with streak and quick stats
- Mood heatmap on the dashboard and history page
- Insights unlock after 7 saved entries
- CSV export for saved entries
- 30-day simulation button for demo/testing
- Local browser storage with no backend required

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- `localStorage` for persistence
- Vitest + JSDOM for tests

## Project Structure

```text
.
├── index.html
├── check-in.html
├── history.html
├── insights.html
├── css/
├── js/
├── tests/
├── assets/
├── data/
├── project-description.md
├── technical-design.md
├── package.json
└── vitest.config.js
```

## Pages

### Dashboard

- Landing page for the app
- Shows the check-in prompt, streak, quick stats, and heatmap preview
- Includes a button to generate 30 days of sample data

### Check-In

- Saves one entry for the current day
- Uses 1 to 5 ratings for mood, sleep, hydration, and energy
- Allows an optional short note

### History

- Lists saved entries in reverse chronological order
- Displays a larger heatmap
- Supports deleting entries
- Supports exporting all entries to CSV

### Insights

- Locked until at least 7 entries exist
- Shows progress toward unlock
- Displays average mood, sleep, and energy once unlocked

## Data Storage

Entries are stored in browser `localStorage` under the key `moodMapEntriesV2`.

Each entry follows this shape:

```json
{
  "date": "2026-05-04",
  "mood": "4",
  "sleep": "3",
  "hydration": "5",
  "energy": "4",
  "note": "Felt steady today."
}
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

This project is a static front-end app, so you can open `index.html` directly in a browser.

If you prefer a local server, you can use any static server you already have installed.

### 3. Run tests

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

## Test Coverage

The current test suite covers:

- localStorage read/write behavior
- entry sorting, saving, replacing, and deletion
- duplicate date protection
- heatmap rendering behavior
- insights averages and streak calculation
- CSV escaping and export formatting

## Current Limitations

- Data is stored locally in one browser only
- There is no sign-in, sync, or cloud backup
- History page text mentions editing, but edit functionality is not implemented yet
- Insights currently summarize mood, sleep, and energy only

## Documentation

- Product brief: [project-description.md](/home/admin-moi/Desktop/Front-end/final-project-Moodmap/project-description.md)
- Technical design: [technical-design.md](/home/admin-moi/Desktop/Front-end/final-project-Moodmap/technical-design.md)
- User guide: [USER_MANUAL.md](/home/admin-moi/Desktop/Front-end/final-project-Moodmap/USER_MANUAL.md)

## Future Improvements

- Add entry editing on the history page
- Add richer insight correlations
- Add import/restore flow
- Add persistent backend storage and multi-device sync
- Add filters for longer-term trend analysis
