---
slice_id: VS-09
phase: 2
priority: P1
dependencies: VS-03
---

# Prompt: Implement VS-09 - Calculation History

## Goal

Display the last 10 calculations in a history panel, allowing users to recall and reuse previous results.

## User Story

As a user, I want to see my recent calculations so I can reference or reuse previous results.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add history panel/sidebar to layout
   - Add "History" toggle button
   - Create history list container
   - Add "Clear History" button in panel

2. **Update CSS** (`style.css`)
   - Style history panel (collapsible sidebar or overlay)
   - Style history items (expression + result)
   - Add animation for panel show/hide
   - Ensure responsive (may stack below on mobile)

3. **Implement history storage** (`app.js`)
   - Add historyItems array to state (max 10 items)
   - Structure: `[{expression: "5 + 3", result: "8", timestamp: Date}, ...]`
   - After each successful calculation, add to history
   - Keep only last 10 (FIFO - remove oldest)
   - Store in localStorage for persistence

4. **Implement history UI** (`app.js`)
   - Create renderHistory() function to display items
   - Add click handlers to history items to recall values
   - Implement toggleHistory() to show/hide panel
   - Implement clearHistory() function

5. **Add recall functionality**
   - Clicking history item loads that result into display
   - Can be used as start of new calculation

6. **Add tests**
   - Test history storage (add, max 10 limit)
   - Test localStorage persistence
   - Test recall functionality
   - Test clear history

## Acceptance Criteria

- [ ] Last 10 calculations displayed in history panel
- [ ] Each item shows expression and result
- [ ] Clicking history item recalls that result
- [ ] History persists across page reloads (localStorage)
- [ ] Clear history button removes all items
- [ ] History toggle button shows/hides panel
- [ ] Oldest items removed when > 10
- [ ] History works on mobile (responsive)

## Verification Steps

### Manual Tests

1. Perform calculation "5 + 3 = 8" → appears in history
2. Perform 9 more calculations → all 10 shown
3. Perform 11th calculation → oldest removed, still only 10 shown
4. Click history item → that result recalled to display
5. Click "Clear History" → all items removed
6. Refresh page → history still there (localStorage)
7. Test on mobile - history panel accessible

### Automated Tests

```javascript
test("History stores last 10 calculations", () => {
  for (let i = 1; i <= 15; i++) {
    addToHistory(`${i} + 1`, i + 1);
  }
  expect(historyItems.length).toBe(10);
  expect(historyItems[0].expression).toBe("6 + 1"); // Oldest kept
});
```

## Showcase (3 min)

**Setup**: Calculator with history ready

**Script**:

1. **Show feature**: Click history button → Panel slides in → "Your calculation history!"
2. **Build history**: Do 5 + 3 =, 10 × 2 =, 100 ÷ 4 = → "Automatically tracked."
3. **Recall value**: Click "5 + 3 = 8" item → 8 loaded → "Recall any previous result."
4. **Continue from history**: × 2 = → 16 → "Build on previous work."
5. **Show persistence**: Refresh page → History still there → "Persists across sessions."
6. **Clear option**: Click "Clear History" → All gone → "Fresh start when needed."

**Q&A Preview**:

- "Can I edit history?" → No, it's read-only reference. VS-15 will add expression editing.
- "Export history?" → Yes! VS-19 will add CSV/text export.
- "More than 10 items?" → 10 strikes balance between usefulness and clutter. May make configurable later.

**Key Message**: "Never lose track of your work. Full calculation history with easy recall."

## Files to Modify

- `index.html` - Add history panel
- `style.css` - Style history
- `app.js` - Implement history logic

## Definition of Done

- [ ] All acceptance criteria met
- [ ] History persisting in localStorage
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Responsive design working
- [ ] Showcase script executed successfully
