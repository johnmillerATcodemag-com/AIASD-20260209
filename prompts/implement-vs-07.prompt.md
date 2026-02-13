---
slice_id: VS-07
phase: 1
priority: P0
dependencies: VS-01
---

# Prompt: Implement VS-07 - Backspace Functionality

## Goal

Add backspace/delete button to remove the last entered digit, allowing users to correct mistakes easily.

## User Story

As a user, I want to delete the last digit I entered so I can correct typing mistakes without starting over.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add backspace button (⌫ or DEL symbol)
   - Position near clear button or in control row

2. **Update CSS** (`style.css`)
   - Style backspace button (perhaps similar to clear but less prominent)

3. **Implement delete logic** (`app.js`)
   - Add event listener for backspace button
   - Implement deleteLastDigit() function:
     - If hasError, clear error and return
     - If currentInput length is 1, set to "0"
     - Otherwise, remove last character from currentInput
     - If result is empty or just "-", set to "0"
     - Update display
   - Add keyboard support for Backspace key (if VS-06 implemented)

4. **Handle edge cases**
   - Empty input → do nothing or show "0"
   - Single digit → becomes "0"
   - Decimal point → can be deleted
   - Negative sign → handle appropriately

5. **Add tests**
   - Test deleting from "123" → "12"
   - Test deleting single digit "5" → "0"
   - Test deleting decimal "3.14" → "3.1" → "3." → "3"
   - Test backspace on "0" → stays "0"
   - Test backspace after calculation → clears result

## Acceptance Criteria

- [ ] Backspace button removes last character
- [ ] Deleting last digit shows "0"
- [ ] Decimal point can be deleted
- [ ] Backspace key works (keyboard support)
- [ ] Visual feedback on button press
- [ ] Edge cases handled gracefully

## Verification Steps

### Manual Tests

1. Type "123", click backspace → displays "12"
2. Click backspace twice more → displays "1", then "0"
3. Type "3.14", backspace → "3.1", backspace → "3.", backspace → "3"
4. After calculation showing result, click backspace → clears result to "0"
5. Type "123", press Backspace key on keyboard → works same as button
6. Click backspace on "0" → stays "0" (doesn't error)

### Automated Tests

```javascript
test("Backspace removes last digit", () => {
  state.currentInput = "123";
  deleteLastDigit();
  expect(state.currentInput).toBe("12");
});

test("Backspace on single digit shows 0", () => {
  state.currentInput = "5";
  deleteLastDigit();
  expect(state.currentInput).toBe("0");
});
```

## Showcase (2 min)

**Setup**: Calculator ready

**Script**:

1. **Setup mistake**: "Everyone makes typos. Watch what happens..."
2. **Type with mistake**: Click 1, 2, 9 → "Oops, meant 128, not 129."
3. **Backspace**: Click ⌫ button → Shows 12 → "Gone!"
4. **Correct**: Click 8 → Shows 128 → "Fixed without starting over."
5. **Multiple deletes**: Type 555, backspace 3 times → Back to 0 → "Delete as much as needed."
6. **Keyboard too**: Type "999", press Backspace key → "Keyboard and button both work."

**Key Message**: "Simple but essential—users can now correct mistakes without clearing everything."

## Files to Modify

- `index.html` - Add backspace button
- `style.css` - Style button
- `app.js` - Add deleteLastDigit function

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Button and keyboard backspace working
- [ ] Edge cases handled
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
