---
slice_id: VS-06
phase: 1
priority: High
dependencies: VS-01, VS-02
---

# Prompt: Implement VS-06 - Delete Last Digit (Backspace)

## Goal

Implement backspace/delete functionality to remove the last entered digit, allowing users to correct mistakes without clearing everything.

## User Story

As a user, I want to delete the last digit I entered so that I can correct mistakes without clearing everything.

## Implementation Steps

1. **Create HTML delete button** (`index.html`)
   - Add delete/backspace button with symbol "⌫" or "DEL"
   - Position near clear button or in control row
   - Use semantic HTML with proper attributes
   - Ensure minimum 44×44px button size for touch targets
   - Add `id="deleteBtn"` for easy selection

2. **Style delete button** (`style.css`)
   - Style similar to clear but less prominent (maybe orange or gray)
   - Add hover state for desktop users
   - Add active state for visual feedback on press
   - Add focus state for keyboard navigation

3. **Implement delete logic** (`app.js`)
   - Create `deleteLastDigit()` function:
     - Check if `awaitingOperand` is true - if so, do nothing (awaiting new number)
     - Read `currentValue`
     - Remove last character using `.slice(0, -1)`
     - If result is empty string, leave as "" (will display as "0")
     - Update `calculatorState.currentValue`
     - Call `updateDisplay()`

4. **Add event listeners**
   - Add click event listener to delete button
   - Add keyboard event listeners for Backspace and Delete keys
   - Both should call `deleteLastDigit()`

5. **Handle edge cases**
   - Empty `currentValue` - do nothing
   - Single character - becomes empty (displays "0")
   - Decimal point - can be deleted (e.g., "5." → "5")
   - After operator selection (`awaitingOperand` = true) - no effect

## Acceptance Criteria

- [ ] Delete/Backspace button removes last character from `currentValue`
- [ ] Backspace key performs same action
- [ ] Delete key performs same action
- [ ] Handles empty value gracefully (shows "0" after deletion)
- [ ] Can delete decimal point
- [ ] Does not affect `previousValue` or stored operation
- [ ] No effect when `awaitingOperand` is true
- [ ] Visual feedback on button press

## Verification Steps

### Manual Tests

1. Enter "123", click delete → displays "12"
2. Click delete again → displays "1"
3. Click delete again → displays "0" (empty string displays as "0")
4. Enter "5", click delete → displays "0"
5. Enter "5.2", click delete → displays "5."
6. Click delete again → displays "5"
7. Enter "5", "+", click delete → no effect (awaiting operand)
8. Enter "123", press Backspace key → displays "12"
9. Enter "456", press Delete key → displays "45"
10. Tab to delete button - focus outline visible

### Automated Tests

Create test file or extend `app.test.js` to verify:

```javascript
// Test cases from VS-06 spec
// TC-V6-01: currentValue "123" + click delete → "12"
// TC-V6-02: currentValue "5" + click delete → "" (displays "0")
// TC-V6-03: currentValue "" + click delete → "" (no change)
// TC-V6-04: currentValue "5.2" + click delete → "5."
// TC-V6-05: currentValue "5." + click delete → "5"
// TC-V6-06: awaitingOperand true + click delete → no effect
// TC-V6-07: Press Backspace key → same as click
```

## Showcase (2 min)

**Setup**: Open calculator in browser at 1024px width

**Script**:

1. **Setup mistake scenario**: "Everyone makes typos. Let me show you how to fix them..."
2. **Type with mistake**: Enter 129 → "Oops, I meant 128, not 129"
3. **Demo backspace**: Click ⌫ button → displays 12 → "The 9 is gone!"
4. **Correct**: Click 8 → displays 128 → "Fixed without starting over"
5. **Multiple deletes**: Enter 555, click delete 3 times → back to 0 → "Delete as much as needed"
6. **Demo keyboard**: Enter 999, press Backspace key → "Keyboard backspace works too"

**Key Message**: "Simple but essential—users can now correct individual mistakes without clearing everything. Much more precise than the clear button."

## Files to Create/Modify

- `index.html` - Add delete button (⌫)
- `style.css` - Style delete button
- `app.js` - Add `deleteLastDigit()` function, event listeners
- `app.test.js` - Unit tests for delete functionality (optional)

## Technical Notes

**deleteLastDigit() Function:**
```javascript
function deleteLastDigit() {
  // Don't delete if awaiting new operand
  if (calculatorState.awaitingOperand) {
    return;
  }

  let value = calculatorState.currentValue;

  // Remove last character
  if (value.length > 0) {
    calculatorState.currentValue = value.slice(0, -1);
  }

  // If empty after deletion, stays empty (displays as "0")
  updateDisplay();
}
```

**Event Listeners:**
```javascript
// Delete button click event
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
  deleteLastDigit();
});

// Keyboard Backspace and Delete keys
document.addEventListener('keydown', (event) => {
  // ... existing key handlers ...

  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault(); // Prevent browser back navigation
    deleteLastDigit();
  }
});
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Delete button removes last character correctly
- [ ] Backspace key works identically to button
- [ ] Delete key works identically to button
- [ ] Edge cases handled (empty value, single character, decimal point)
- [ ] No effect when awaiting operand (correct behavior)
- [ ] Visual feedback clear (button active state)
- [ ] Touch targets meet WCAG 2.1 AA (44×44px minimum)
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Showcase script executed successfully
- [ ] Unit tests pass (if implemented)

## Dependencies

**Required**:
- VS-01 (Display Current Value) - For display updates
- VS-02 (Input Digit) - For `awaitingOperand` flag and `currentValue` management

## Next Steps

After VS-06 is complete:
- Users have fine-grained control over input (delete single digits)
- Combined with VS-05 (Clear), users have complete error recovery
- Calculator UX is more forgiving of mistakes

## Design Considerations

**Button Symbol Options:**
- ⌫ (Backspace symbol) - most clear visually
- DEL - text label
- ← (Left arrow) - alternative symbol
- × with smaller size - delete icon

**Behavior When Awaiting Operand:**
- After pressing an operator, `awaitingOperand` is true
- At this point, deleting doesn't make sense (we're about to start a new number)
- So `deleteLastDigit()` returns early and does nothing
- This prevents confusing behavior

**Difference from Clear:**
- Clear (VS-05): Resets entire calculator state
- Delete (VS-06): Removes last digit only, preserves operation
- Both are useful in different scenarios
