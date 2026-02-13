---
slice_id: VS-05
phase: 1
priority: High
dependencies: VS-01
---

# Prompt: Implement VS-05 - Clear Calculator State

## Goal

Implement a clear button (C) to reset all calculator state and start a fresh calculation. This command slice provides users with a quick way to recover from errors or start over.

## User Story

As a user, I want to clear the calculator so that I can start a new calculation from scratch.

## Implementation Steps

1. **Create HTML clear button** (`index.html`)
   - Add clear button with label "C" or "AC" (All Clear)
   - Position prominently (typically top-left or top-right of calculator)
   - Use semantic HTML with proper attributes
   - Ensure minimum 44×44px button size for touch targets
   - Add `id="clearBtn"` for easy selection

2. **Style clear button** (`style.css`)
   - Style distinctly from other buttons (often red or gray)
   - Make it visually prominent (users need to find it easily)
   - Add hover state for desktop users
   - Add active state for visual feedback on press
   - Add focus state for keyboard navigation
   - Consider making it slightly larger or double-width

3. **Implement clear logic** (`app.js`)
   - Create `clearCalculator()` function that:
     - Resets `currentValue` to "" (will display as "0")
     - Resets `previousValue` to null or ""
     - Resets `operation` to null
     - Resets `awaitingOperand` to false
     - Resets `displayError` to false
     - Calls `updateDisplay()` to show "0"
     - Clears any operator button highlights

4. **Add event listeners**
   - Add click event listener to clear button
   - Call `clearCalculator()` on button click
   - Provide visual feedback (active state)

5. **Add keyboard support**
   - Add keyboard event listener for Escape key
   - Map Escape → `clearCalculator()`
   - Provide same functionality as button click

6. **Handle edge cases**
   - Clear should work from any calculator state:
     - During number input
     - After operator selection
     - After calculation complete
     - From error states
   - Clear should remove all visual indicators (operator highlights, error styling)

## Acceptance Criteria

- [ ] Clear button (C) resets all state properties
- [ ] Display shows "0" after clear
- [ ] Escape key performs same action as clear button
- [ ] Works from any calculator state (input, operation, result, error)
- [ ] Works after error states (removes error styling)
- [ ] Visual feedback on button press (active state)
- [ ] All operator highlights cleared
- [ ] Calculator ready for new input immediately after clear

## Verification Steps

### Manual Tests

1. Enter "42", click "C" - display shows "0", all state reset
2. Enter "5", "+", "3", click "C" - display shows "0", operator not highlighted
3. Calculate "5", "+", "3", "=" to get "8", click "C" - display shows "0", ready for new input
4. Trigger an error (e.g., division by zero), click "C" - error cleared, display shows "0"
5. Enter "123", press Escape key - display shows "0" (keyboard clear works)
6. After clearing, enter new number - should work normally (calculator fully reset)
7. Tab to clear button - focus outline visible

### Automated Tests

Create test file or extend `app.test.js` to verify:

```javascript
// Test cases from VS-05 spec
// TC-V5-01: currentValue "42" + click "C" → all state reset, display "0"
// TC-V5-02: Mid-calculation (5 + 3) + click "C" → all state reset
// TC-V5-03: Error state + click "C" → error cleared, display "0"
// TC-V5-04: Any state + press Escape → same as click "C"
// TC-V5-05: After equals result + click "C" → ready for new calculation
```

## Showcase (3 min)

**Setup**: Open calculator in browser at 1024px width

**Script**:

1. **Show clear button**: "Here's the clear button, styled in red to stand out as a reset control."
2. **Demo basic clear**: Enter 42, click C → "Instantly back to zero and ready for new input"
3. **Demo clear mid-calculation**: Enter 5, +, 3, click C → "Clears the entire operation, not just the display"
4. **Demo clear after result**: Calculate 5 + 3 = 8, click C → "Start fresh after any calculation"
5. **Demo error recovery**: Trigger error, click C → "Quick recovery from error states"
6. **Demo keyboard**: Enter 999, press Escape → "Keyboard shortcut for fast clearing"

**Key Message**: "Users can always start fresh with a single button press or Escape key. The clear function resets all state and makes the calculator ready for the next calculation."

## Files to Create/Modify

- `index.html` - Add clear button (C)
- `style.css` - Style clear button distinctly (red/gray, prominent)
- `app.js` - Add `clearCalculator()` function, event listeners for button and Escape key
- `app.test.js` - Unit tests for clear functionality (optional but recommended)

## Technical Notes

**clearCalculator() Function:**
```javascript
function clearCalculator() {
  // Reset all state properties
  calculatorState.currentValue = "";
  calculatorState.previousValue = null;
  calculatorState.operation = null;
  calculatorState.awaitingOperand = false;
  calculatorState.displayError = false;

  // Clear any operator highlights
  document.querySelectorAll('.btn--operator').forEach(btn => {
    btn.classList.remove('btn--active');
  });

  // Clear error styling if present
  const displayElement = document.getElementById('display');
  displayElement.classList.remove('display--error');

  // Update display to show "0"
  updateDisplay();
}
```

**Event Listener for Clear Button:**
```javascript
// Clear button click event
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  clearCalculator();
});
```

**Keyboard Event Listener for Escape:**
```javascript
// Extend keyboard event listener to handle Escape
document.addEventListener('keydown', (event) => {
  // ... existing key handlers ...

  // Handle Escape key for clear
  if (event.key === 'Escape') {
    clearCalculator();
  }
});
```

**State Before Clear (Example):**
```javascript
{
  currentValue: "123",
  previousValue: "456",
  operation: "+",
  awaitingOperand: false,
  displayError: false
}
```

**State After Clear:**
```javascript
{
  currentValue: "",          // Empty, will display as "0"
  previousValue: null,
  operation: null,
  awaitingOperand: false,
  displayError: false
}
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Clear button resets all state correctly
- [ ] Escape key works identically to button
- [ ] Works from all calculator states (input, operation, result, error)
- [ ] Visual feedback clear (button active state)
- [ ] All operator highlights removed
- [ ] Error styling removed if present
- [ ] Touch targets meet WCAG 2.1 AA (44×44px minimum)
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Showcase script executed successfully
- [ ] Unit tests pass (if implemented)

## Dependencies

**Required**: VS-01 (Display Current Value)
- Depends on `updateDisplay()` function to show "0" after clear
- Depends on `calculatorState` object structure

**Note**: While this can work after VS-01 alone, it's most useful after VS-02, VS-03, and VS-04 are implemented (when there's actually state to clear).

## Next Steps

After VS-05 is complete:
- Calculator has basic error recovery mechanism
- Users can restart calculations easily
- Consider adding VS-06 (Delete Last Digit) for more precise corrections

## Design Considerations

**Clear vs All Clear (AC):**
- Simple calculator: Just use "C" that clears everything
- Advanced option: "CE" (Clear Entry) clears only current value, "C" clears all
- For this slice: Single "C" button that clears everything (All Clear behavior)

**Button Positioning:**
- Common placements: Top-left, top-right, or bottom-left
- Should be easily accessible but not accidentally pressed
- Consider double-width button for prominence

**Visual Styling:**
- Red: Indicates destructive action (common choice)
- Gray: Neutral, less alarming
- Both work well - choose based on overall design theme
