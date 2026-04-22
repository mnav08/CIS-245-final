# Mood Map Technical Design

## Overview

Mood Map is a vanilla HTML, CSS, and JavaScript web application for lightweight daily mood tracking. The application captures one emotional check-in per day, stores entries locally in the browser, visualizes recent moods through a heatmap preview, and unlocks basic insight summaries after enough data has been collected.

The current implementation is an MVP focused on simple static pages, browser-native APIs, and minimal dependencies. There is no build system, framework, backend service, or database.

## Product Goals

- Make daily mood tracking fast enough to complete in under 10 seconds.
- Store emotional baseline data without requiring a full journal entry.
- Show mood patterns visually through a heatmap-style dashboard component.
- Surface basic aggregate insights after 7 entries.
- Give users control over their stored data through review, deletion, and CSV export.

## Technical Stack

- HTML for page structure
- CSS for shared and page-specific styling
- Vanilla JavaScript for state, rendering, and browser interactions
- `localStorage` for client-side persistence
- Blob and object URL APIs for CSV download

## Application Structure

```text
.
├── index.html
├── check-in.html
├── history.html
├── insights.html
├── project-description.md
├── technical-design.md
├── assets/
│   └── images/
│       └── logo-moodMap.png
├── css/
│   ├── styles.css
│   ├── dashboard.css
│   ├── check-in.css
│   ├── history.css
│   └── insights.css
├── data/
│   └── sample-entries.json
└── js/
    ├── app.js
    ├── storage.js
    ├── entries.js
    ├── heatmap.js
    ├── insights.js
    └── export.js
```

## Pages

### Dashboard

File: `index.html`

The dashboard is the application landing page. It includes:

- Shared navigation
- Hero copy and check-in call to action
- Dashboard preview cards
- Heatmap preview
- Current streak count
- Quick average mood stat

The dashboard loads `storage.js`, `entries.js`, `heatmap.js`, `insights.js`, and `app.js`.

### Check-In

File: `check-in.html`

The check-in page contains the primary entry form. It captures:

- Mood, 1-10
- Sleep quality, 1-10
- Hydration, 1-10
- Energy, 1-10
- Optional note

Submitting the form creates or replaces the entry for the current date. This enforces the MVP rule that only one entry should exist per day.

### History

File: `history.html`

The history page displays saved entries in reverse chronological order. It currently supports:

- Viewing all saved entries
- Deleting an entry by date
- Exporting all loaded entries as CSV

The product requirements mention editing entries, but edit controls are not implemented yet.

### Insights

File: `insights.html`

The insights page displays a locked state until the user has at least 7 entries. Before unlock, it shows:

- Required entry count
- Current entry count
- Remaining entries
- Progress bar

After unlock, it displays averages for:

- Mood
- Sleep quality
- Energy

Hydration is collected and exported, but it is not currently shown in the unlocked insights panel.

## JavaScript Architecture

The application uses small global module objects rather than ES modules. Each HTML page loads only the scripts it needs, with `app.js` acting as the page coordinator.

### `MoodMapStorage`

File: `js/storage.js`

Responsible for reading from and writing to browser `localStorage`.

- Storage key: `moodMapEntries`
- `getEntries()` returns parsed saved entries or an empty array.
- `saveEntries(entries)` serializes the full entry array back to `localStorage`.

### `MoodMapEntries`

File: `js/entries.js`

Responsible for entry-level operations.

- `getTodayDate()` returns the current date as `YYYY-MM-DD`.
- `getAll()` returns all entries sorted newest first.
- `save(entry)` updates the existing entry for that date or inserts a new one.
- `delete(date)` removes an entry by date.

### `MoodMapHeatmap`

File: `js/heatmap.js`

Responsible for rendering the dashboard heatmap preview.

The current MVP renders 28 cells in a 7-column grid. Each cell maps the corresponding entry mood to a teal opacity value. Missing entries render as low-opacity cells.

### `MoodMapInsights`

File: `js/insights.js`

Responsible for derived calculations.

- `requiredEntries` is set to `7`.
- `getAverage(entries, field)` returns a one-decimal average for a numeric field.
- `getStreak(entries)` counts consecutive daily entries starting from today.

### `MoodMapExport`

File: `js/export.js`

Responsible for CSV generation and download.

- `toCsv(entries)` converts entries into quoted CSV rows.
- `downloadCsv(entries)` creates a CSV Blob and triggers a browser download named `mood-map-entries.csv`.

### `app.js`

File: `js/app.js`

Responsible for page initialization after `DOMContentLoaded`.

Initialization flow:

1. Load all entries with `MoodMapEntries.getAll()`.
2. Mark the active navigation link using `aria-current`.
3. Attach check-in form behavior if the form exists.
4. Render the dashboard if dashboard elements exist.
5. Render history if the entries list exists.
6. Render insights if the insights panel exists.
7. Attach CSV export behavior if the export button exists.

This DOM-presence pattern allows one shared coordinator file to support multiple pages without a router.

## Data Model

Entries are stored as an array under the `localStorage` key `moodMapEntries`.

```json
[
  {
    "date": "2026-04-15",
    "mood": 7,
    "sleep": 8,
    "hydration": 6,
    "energy": 7,
    "note": "Sample entry for future testing."
  }
]
```

### Field Definitions

| Field       | Type                     | Description                                   |
| ----------- | ------------------------ | --------------------------------------------- |
| `date`      | string                   | ISO-like calendar date in `YYYY-MM-DD` format |
| `mood`      | number or numeric string | User mood rating from 1 to 10                 |
| `sleep`     | number or numeric string | Sleep quality rating from 1 to 10             |
| `hydration` | number or numeric string | Hydration rating from 1 to 10                 |
| `energy`    | number or numeric string | Energy rating from 1 to 10                    |
| `note`      | string                   | Optional free-text note                       |

Form submissions currently store range values as strings because `FormData.get()` returns strings. Calculation modules convert values with `Number()` when needed.

## Styling Architecture

The CSS is split between shared global styles and page-specific files.

### Shared Styles

File: `css/styles.css`

Contains:

- Design tokens as CSS custom properties
- Base document styles
- Shared header and navigation layout
- Shared button, card, link, focus, and responsive rules

### Page Styles

- `css/dashboard.css`: dashboard card grid and heatmap grid
- `css/check-in.css`: check-in form layout and inputs
- `css/history.css`: history entry card layout
- `css/insights.css`: insights panel and progress bar

The visual direction uses a dark background, teal primary actions, gold accents, compact cards, and responsive layouts.

## Accessibility

Current accessibility support includes:

- Semantic page landmarks through `header`, `nav`, `main`, `section`, and `article`
- `aria-label` on navigation and heatmap preview
- `aria-current="page"` for active navigation state
- `aria-live` regions for history and insights updates
- Visible keyboard focus styles for links, buttons, inputs, and textareas
- Status message area for check-in save confirmation

Future improvements should include visible range values, clearer heatmap labels, and confirmation affordances for destructive delete actions.

## Key User Flows

### Save Daily Check-In

1. User opens `check-in.html`.
2. User adjusts range inputs and optionally writes a note.
3. Form submit is intercepted in `setupCheckInForm()`.
4. An entry is created with today's date.
5. `MoodMapEntries.save()` updates or inserts the entry.
6. Updated entries are persisted to `localStorage`.
7. A success message is shown.

### View Dashboard

1. User opens `index.html`.
2. Entries are loaded from `localStorage`.
3. Heatmap preview renders the latest 28 entry slots.
4. Streak count is calculated from consecutive dates ending today.
5. Average mood is displayed when entries exist.

### View and Delete History

1. User opens `history.html`.
2. Entries render as history cards.
3. User clicks a delete button.
4. Matching date is removed from storage.
5. Page reloads to reflect the updated list.

### Export CSV

1. User opens `history.html`.
2. User clicks `Export CSV`.
3. Current entries are converted to CSV.
4. A temporary object URL is created.
5. Browser download is triggered.
6. Object URL is revoked.

### Unlock Insights

1. User opens `insights.html`.
2. Entry count is compared against `MoodMapInsights.requiredEntries`.
3. If fewer than 7 entries exist, locked progress UI is shown.
4. If 7 or more entries exist, aggregate averages are shown.

## Current Constraints

- Data is limited to the user's current browser and device.
- Clearing browser data removes all entries.
- There is no validation beyond range input constraints.
- There is no server sync, authentication, account system, or backup.
- The app relies on global script load order.
- History supports deletion but not editing.
- Heatmap cells are based on entry array position rather than calendar-accurate date placement.
- Text inserted into history cards uses `innerHTML`, so future user-generated content handling should escape notes before rendering.

## Future Enhancements

- Add edit support for history entries.
- Add delete confirmation or undo.
- Display live numeric values beside range sliders.
- Normalize saved numeric fields to numbers at write time.
- Render a calendar-accurate heatmap with date-aware empty cells.
- Add hydration to the insights summary.
- Add trend insights such as best day, lowest mood day, and sleep-energy correlation.
- Add import support for exported CSV or JSON.
- Add automated tests for entry saving, streaks, averages, CSV escaping, and rendering states.
- Add a data reset control with clear confirmation.

## Testing Strategy

The current project does not include an automated test framework. Manual testing should cover:

- Saving today's check-in
- Re-saving today and confirming the entry is replaced
- Viewing dashboard heatmap, streak, and quick stats
- Viewing history entries
- Deleting an entry
- Exporting CSV
- Viewing locked insights with fewer than 7 entries
- Viewing unlocked insights with 7 or more entries
- Checking responsive layouts on mobile and desktop widths

When automated testing is added, priority should go to pure logic modules first: `entries.js`, `insights.js`, and `export.js`.
