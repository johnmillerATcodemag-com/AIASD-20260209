---
slice_id: VS-28
phase: 6
priority: P4
dependencies: VS-01
---

# Prompt: Implement VS-28 - Date/Time Calculator

## Goal

Calculate time durations, date differences, and date arithmetic.

## User Story

As a user, I want to calculate time between dates or add/subtract days/hours.

## Implementation Steps

1. Add "Date/Time" mode
2. Implement date operations:
   - Difference between two dates (days, weeks, months, years)
   - Add/subtract days to a date
   - Add/subtract hours/minutes to a time
   - Business days calculator (excluding weekends)
3. Implement time operations:
   - Duration between two times
   - Add/subtract time periods
   - Convert between time units
4. Display results in multiple formats
5. Handle time zones (basic)
6. Age calculator (from date of birth)

## Acceptance Criteria

- [ ] Can select two dates and get difference
- [ ] Can add/subtract days from date
- [ ] Can calculate time durations
- [ ] Business days calculated correctly (excludes weekends)
- [ ] Multiple output formats (days, weeks, hours)
- [ ] Age calculator functional
- [ ] Easy date/time input (picker + manual)

## Verification Steps

1. Enter Date/Time mode
2. Calculate: Jan 1, 2024 to Jan 1, 2025 = 365 days
3. Add 30 days to Feb 1, 2024 = Mar 2, 2024
4. Business days: Mon Jan 1 + 5 business days = Mon Jan 8
5. Age: Born Jan 1, 2000 → Current age calculated
6. Time duration: 9:00 AM to 5:30 PM = 8.5 hours
7. Add 90 minutes to 3:00 PM = 4:30 PM

## Showcase (3 min)

- "How many days until vacation?" → Enter dates → Result
- "Project due in 3 weeks..." → Add 21 days to today
- "How old are you in days?" → Enter birthdate → Days alive
- Business days: "5 business days from today is..."
- **Key Message**: "Time and date math, simplified. Plan projects, track milestones."
