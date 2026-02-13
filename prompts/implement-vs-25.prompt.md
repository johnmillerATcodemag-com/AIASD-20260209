---
slice_id: VS-25
phase: 5
priority: P3
dependencies: VS-01
---

# Prompt: Implement VS-25 - Multi-Calculator Tabs

## Goal

Allow users to manage multiple independent calculation sessions in tabs.

## User Story

As a user, I want to work on multiple calculations simultaneously without losing my place.

## Implementation Steps

1. Add tab bar above calculator
2. "+" button to create new tab
3. Each tab has:
   - Name/label (editable)
   - Independent calculator state
   - Own history
   - Close button
4. Tab switching preserves state
5. Store all tabs in localStorage
6. Restore tabs on page load
7. Maximum 10 tabs
8. Drag-and-drop tab reordering (optional)

## Acceptance Criteria

- [ ] Can create multiple tabs (max 10)
- [ ] Each tab independent (state, history)
- [ ] Tab labels editable
- [ ] Tabs persist across sessions
- [ ] Can close individual tabs
- [ ] Smooth tab switching
- [ ] Always have at least one tab

## Verification Steps

1. Start with default tab
2. Calculate "10 + 5 = 15" in Tab 1
3. Create new tab (Tab 2)
4. Calculate "20 × 2 = 40" in Tab 2
5. Switch back to Tab 1 → Still shows "15"
6. Rename Tab 1 to "Budget", Tab 2 to "Taxes"
7. Refresh page → Both tabs restored
8. Close Tab 2 → Tab 1 still there
9. Try to close last tab → Warning or prevented

## Showcase (3 min)

- Start calculation: "Monthly budget..."
- Create new tab: "Need to calculate something else"
- Work on second calculation
- Switch back → "First calculation preserved!"
- Rename tabs: "Budget", "Sales Tax", "Expenses"
- **Key Message**: "Multitask like a pro. Multiple calculations, zero confusion."
