---
slice_id: VS-09
phase: 2
priority: P1
dependencies: VS-03
---

# Prompt: Implement VS-09 - Calculation History

## Goal

Display the last 20 calculations in a history panel (most recent at top), allowing users to recall and reuse previous results. History is accessible via mouse and keyboard and persists across sessions.

## Product Context (from slice)

- **Slice Type:** Feature Enhancement
- **Effort:** 8 hours
- **Risk:** Low
- **Dependencies:** VS-03 (operations must exist to store)

## User Story

As a user, I want to see my calculation history so that I can review and reuse previous calculations.

## Technical Requirements (merged)

**History state:**

```javascript
const historyState = {
  items: [], // Array of calculation objects, most recent first
  maxItems: 20
};

// History item structure
{
  id: "unique-id",
  expression: "5 + 3",
  result: "8",
  timestamp: "2026-02-12T10:30:00Z"  // ISO 8601 string
}
```

**localStorage:** Save on calculation completion; load on page load; clear when history cleared.

**Ordering:** Most recent calculations at top; when over 20 items, remove oldest (newest remains at index 0).

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add history panel/sidebar to layout
   - Add "History" toggle button (focusable)
   - Create history list container
   - Add "Clear History" button in panel

2. **Update CSS** (`style.css`)
   - Style history panel (collapsible sidebar or overlay)
   - Style history items (expression + result)
   - Add animation for panel show/hide
   - Ensure responsive (may stack below on mobile)

3. **Implement history storage** (`app.js`)
   - Add history state: `items` array, `maxItems: 20`
   - Use merged item structure: `id`, `expression`, `result`, `timestamp` (ISO string)
   - After each successful calculation, prepend new item (most recent at top)
   - Keep only last 20 (drop oldest when over limit)
   - Store in localStorage for persistence

4. **Implement history UI** (`app.js`)
   - Create `renderHistory()` to display items (newest first)
   - Add click handlers to history items to recall result
   - Implement `toggleHistory()` to show/hide panel
   - Implement `clearHistory()` and clear localStorage

5. **Recall and keyboard accessibility**
   - Clicking a history item loads that result into display (can be start of new calculation)
   - History toggle, panel, list items, and Clear History focusable and operable via keyboard (Tab, Enter/Space)
   - Focus management when panel opens/closes (e.g. trap focus in panel when open)

6. **Add tests**
   - Test history storage (add, max 20 limit, newest at top)
   - Test localStorage persistence
   - Test recall functionality
   - Test clear history
   - Test keyboard accessibility (focus, activate)

## Acceptance Criteria

- [ ] Last 20 calculations displayed in history panel
- [ ] Most recent calculations at top
- [ ] Each item shows expression and result
- [ ] Clicking history item recalls that result
- [ ] History persists across page reloads (localStorage)
- [ ] Clear history button removes all items and clears localStorage
- [ ] History toggle button shows/hides panel
- [ ] Oldest items removed when count > 20
- [ ] History works on mobile (responsive)
- [ ] History panel and controls accessible via keyboard (focus, activate)

## Verification Steps

### Manual Tests

1. Perform calculation "5 + 3 = 8" → appears in history (at top)
2. Perform 19 more calculations → all 20 shown, newest at top
3. Perform 21st calculation → oldest removed, still 20 shown, newest at top
4. Click history item → that result recalled to display
5. Tab to History toggle → Enter/Space opens panel; Tab to item → Enter recalls
6. Click "Clear History" → all items removed, localStorage cleared
7. Refresh page → history still there (localStorage)
8. Test on mobile — history panel accessible

### Automated Tests

```javascript
test("History stores last 20 calculations, newest first", () => {
  for (let i = 1; i <= 25; i++) {
    addToHistory(`${i} + 1`, String(i + 1));
  }
  expect(historyItems.length).toBe(20);
  expect(historyItems[0].expression).toBe("25 + 1"); // Newest at top
  expect(historyItems[19].expression).toBe("6 + 1"); // Oldest of 20
});
```

## Showcase (3 min)

**Setup:** Calculator with history ready

**Script:**

1. **Show feature:** Click history button → Panel slides in → "Your calculation history!"
2. **Build history:** Do 5 + 3 =, 10 × 2 =, 100 ÷ 4 = → "Automatically tracked."
3. **Recall value:** Click "5 + 3 = 8" item → 8 loaded → "Recall any previous result."
4. **Continue from history:** × 2 = → 16 → "Build on previous work."
5. **Show persistence:** Refresh page → History still there → "Persists across sessions."
6. **Clear option:** Click "Clear History" → All gone → "Fresh start when needed."
7. **Keyboard:** Tab to History → Enter to open; Tab to item → Enter to recall.

**Q&A Preview:**

- "Can I edit history?" → No, it's read-only reference. VS-15 will add expression editing.
- "Export history?" → Yes! VS-19 will add CSV/text export.
- "More than 20 items?" → 20 balances usefulness and clutter; may make configurable later.

**Key Message:** "Never lose track of your work. Full calculation history with easy recall."

## Files to Modify

- `index.html` — Add history panel
- `style.css` — Style history
- `app.js` — Implement history logic and keyboard support

## Definition of Done

- [ ] All acceptance criteria met
- [ ] History persisting in localStorage (20 items, newest first)
- [ ] Keyboard accessible (toggle, items, clear)
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Responsive design working
- [ ] Showcase script executed successfully
