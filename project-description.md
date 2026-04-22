# Mood Map App

## Problem

Humans remember extremes, not baselines. Daily emotional fluctuations go unnoticed, leaving self-reflective individuals without objective insight. Current journaling or wellness apps either require too much effort or fail to reveal actionable patterns.

## Solution

Mood Map solves this by:

- Capturing a frictionless daily emotional check-in
- Visualizing emotional patterns over time through heatmaps
- Surfacing insights that reveal hidden trends and correlations
  - Example:
    - You sleep more on Sundays
    - You feel more stressed on Mondays

---

## Target User

The primary user is someone who is self-reflective — they journal, meditate, or are in therapy — but has no data to back up their gut feelings.

They often say things like:

> "I've been feeling off lately"

…but can't pinpoint why or when it started.

---

## Key Screens

There are three core screens:

1. **Daily Check-In**
   - Dead simple
   - Takes ~10 seconds
   - Must be frictionless (2 taps max)

2. **Heatmap Calendar**
   - Core visual payoff
   - Similar to GitHub contributions graph
   - Displays emotional patterns over time

3. **Insights Panel**
   - Surfaces patterns and correlations
   - Provides real value from collected data

> ⚠️ Mood tracking can feel like a chore after day 3 — UX must stay effortless.

---

## Product Vision

For self-aware individuals who want to understand their emotional patterns but can't rely on memory alone, **Mood Map** is a personal wellness tracker that turns daily check-ins into meaningful insights.

Unlike generic journaling apps, it doesn’t just capture words — it reveals the patterns hidden within them.

---

## Functional Requirements

### Daily Check-In

- Mood scale (1–10)
- Sleep quality
- Hydration level
- Energy level
- Optional note
- Completion time: <10 seconds

### History

- Heatmap calendar visualization

### Data Control

- View entries
- Edit / delete entries
- Export data (CSV)

### Insights

- Minimal insights initially
- Unlock after **7 entries**

### Edge Cases

- Only one entry per day
- Missing days are skipped in averages

---

## Tech stack

- HTML, CSS AND JS. No frameworks or utility libraries. pure vanilla development.
- MVP. prioritize funcionality and simple approach over flashy and overcomplicated solutions.
- add comments to code for readability and future maintenance.

---

## Site Map

### Landing Page

- **Navbar**
  - Dashboard
  - Check-In
  - History
  - Insights

- **Hero Section**

- **Dashboard Preview (below hero)**
  - Check-in prompt
  - Heatmap
  - Streak (in days)
  - Quick stats

---

### Check-In Page

- Input section for:
  - Mood
  - Sleep
  - Hydration
  - Energy
- Save check-in

---

### History Page

- View past entries
- Edit entries
- Delete entries

---

### Insights Page

- Displays patterns and trends

#### Locked State (if < 7 entries)

> You need at least 7 mood entries to unlock insights.  
> You have 0 so far. Keep going!

- Progress/status bar showing:
  - Number of entries completed
  - Remaining entries to unlock insights (target: 7)
