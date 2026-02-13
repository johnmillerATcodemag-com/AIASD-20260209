---
slice_id: VS-02
phase: 1
priority: P0
dependencies: VS-01
---

# Prompt: Implement VS-02 - Input Digit & Decimal Point

## Goal

Enable users to input numbers (0-9) and decimal points through both button clicks and keyboard input. This command slice modifies calculator state and triggers display updates.

## User Story

As a user, I want to input numbers using buttons or keyboard so that I can build the calculations I need.

## Implementation Steps

1. **Create HTML button structure** (`index.html`)
   - Add number buttons 0-9 in calculator grid layout
   - Add decimal button (.)
   - Use `data-digit` attributes for button values
   - Ensure minimum 44×44px button size for touch targets
   - Organize in standard calculator number pad layout:
     ```
     7 8 9
     4 5 6
     1 2 3
     0 .
     ```

2. **Style number buttons** (`style.css`)
   - Set minimum button size: 44×44px (WCAG touch target)
   - Add hover state for desktop users
   - Add active state for visual feedback on press
   - Add focus state for keyboard navigation (visible outline)
   - Use CSS Grid for responsive button layout
   - Style number buttons distinctly from operators (different color)
   - Ensure adequate spacing between buttons (min 8px gap)

3. **Implement digit input logic** (`app.js`)
   - Extend `calculatorState` object with:
     - `awaitingOperand` (boolean, tracks if new number should replace display)
   - Implement `handleDigitInput(digit)` function:
     - Clear error state if present
     - If `awaitingOperand` is true, replace `currentValue` with digit
     - If `awaitingOperand` is false, append digit to `currentValue`
     - Remove leading zeros (except for "0.xxx" cases)
     - Enforce maximum length (15 digits)
     - Set `awaitingOperand` to false
     - Call `updateDisplay()` to reflect changes

4. **Implement decimal point logic**
   - Add `handleDecimalInput()` function:
     - Check if `currentValue` already contains "."
     - If decimal present, ignore input (only one decimal allowed)
     - If no decimal, append "."
     - If `awaitingOperand` is true, start new number with "0."
     - Call `updateDisplay()` to reflect changes

5. **Add keyboard support**
   - Add `keydown` event listener to document
   - Map keyboard keys 0-9 to digit input
   - Map keyboard "." or "NumPad Decimal" to decimal input
   - Call same `handleDigitInput()` and `handleDecimalInput()` functions
   - Provide visual feedback on corresponding button when key pressed

6. **Add event listeners**
   - Query all number buttons with `.btn--number` class
   - Add click event listeners calling `handleDigitInput()`
   - Query decimal button with `.btn--decimal` class
   - Add click event listener calling `handleDecimalInput()`

## Acceptance Criteria

- [ ] Clicking number buttons (0-9) appends digit to display
- [ ] Clicking decimal button (.) adds decimal point
- [ ] Only one decimal point allowed per number
- [ ] Leading zero is removed (e.g., "07" becomes "7")
- [ ] Exception: "0.5" keeps leading zero
- [ ] Keyboard input (0-9, .) functions identically to buttons
- [ ] Numbers can be up to 15 digits
- [ ] Decimal precision up to 10 places
- [ ] Visual feedback on button press (active state)
- [ ] Buttons are minimum 44×44px (touch target requirement)
- [ ] Focus outline visible for keyboard navigation

## Verification Steps

### Manual Tests

1. Open calculator, click "5" - display shows "5" (replaces default "0")
2. Click "3", "7" - display shows "537" (digits append)
3. Click "0", "8" - display shows "08" then "8" (leading zero removed)
4. Click "0", ".", "5" - display shows "0.5" (leading zero preserved with decimal)
5. Click "5", ".", "." - second decimal ignored, display shows "5."
6. Enter 15 digits - all accepted; try 16th digit - rejected
7. Press keyboard "8" - display shows "8"
8. Press keyboard "." - display shows "8."
9. Tab to number buttons - focus outline visible
10. Test on touch device - buttons easily tappable (44×44px minimum)

### Automated Tests

Create test file (`app.test.js`) to verify:

```javascript
// Test cases from VS-02 spec
// TC-V2-01: currentValue "0" + click "5" → "5"
// TC-V2-02: currentValue "5" + click "3" → "53"
// TC-V2-03: currentValue "5" + click "." → "5."
// TC-V2-04: currentValue "5." + click "." → "5." (no change)
// TC-V2-05: Leading zero removal: "0" + "8" → "8"
// TC-V2-06: Leading zero preserved: "0" + "." + "5" → "0.5"
// TC-V2-07: Max length enforcement: 15 digits max
// TC-V2-08: Keyboard "8" → currentValue "8"
// TC-V2-09: Keyboard "." → appends decimal
// TC-V2-10: awaitingOperand true → replace value
// TC-V2-11: Visual feedback on button press
// TC-V2-12: Decimal precision up to 10 places
```

## Showcase (4 min)

**Setup**: Open calculator in browser at 1024px width

**Script**:

1. **Show number pad**: "Here's our number pad with digits 0-9 and decimal point, laid out like a standard calculator."
2. **Demo digit input**: Click 5, 3, 7 → "Digits append naturally to build numbers"
3. **Demo leading zero**: Refresh, click 0, 8 → "Leading zeros are automatically removed for cleaner display"
4. **Demo decimal**: Click 5, ., 2, 5 → "Decimal point works correctly"
5. **Demo decimal validation**: Click . again → "Only one decimal allowed per number"
6. **Demo keyboard**: Press keys 1, 2, 3 → "Full keyboard support for faster input"
7. **Show touch targets**: Open DevTools, inspect button → "44×44px minimum ensures easy tapping on mobile"

**Key Message**: "Users can now input any number using buttons or keyboard, with smart handling of leading zeros and decimals. The foundation is ready for arithmetic operations."

## Files to Create/Modify

- `index.html` - Add number buttons (0-9) and decimal button
- `style.css` - Style buttons with proper sizing and states
- `app.js` - Add `handleDigitInput()`, `handleDecimalInput()`, keyboard listeners
- `app.test.js` - Unit tests for digit input logic (optional but recommended)

## Technical Notes

**Updated State Object:**
```javascript
const calculatorState = {
  currentValue: "0",        // Current display value (string)
  displayError: false,      // Whether to show error message
  awaitingOperand: false    // If true, next digit replaces currentValue
};
```

**handleDigitInput() Function:**
```javascript
function handleDigitInput(digit) {
  // Clear error if present
  if (calculatorState.displayError) {
    calculatorState.displayError = false;
  }

  let currentValue = calculatorState.currentValue;

  // Replace value if awaiting new operand
  if (calculatorState.awaitingOperand) {
    calculatorState.currentValue = digit;
    calculatorState.awaitingOperand = false;
  } else {
    // Remove leading zero (except for "0.xxx")
    if (currentValue === "0" && digit !== ".") {
      calculatorState.currentValue = digit;
    } else {
      // Append digit if under max length
      if (currentValue.length < 15) {
        calculatorState.currentValue = currentValue + digit;
      }
    }
  }

  updateDisplay();
}
```

**handleDecimalInput() Function:**
```javascript
function handleDecimalInput() {
  let currentValue = calculatorState.currentValue;

  // Start new number with "0." if awaiting operand
  if (calculatorState.awaitingOperand) {
    calculatorState.currentValue = "0.";
    calculatorState.awaitingOperand = false;
    updateDisplay();
    return;
  }

  // Only add decimal if not already present
  if (!currentValue.includes(".")) {
    calculatorState.currentValue = currentValue + ".";
    updateDisplay();
  }
}
```

**Keyboard Event Listener:**
```javascript
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Handle number keys
  if (key >= '0' && key <= '9') {
    handleDigitInput(key);
    // Optional: highlight corresponding button
    highlightButton(`[data-digit="${key}"]`);
  }

  // Handle decimal point
  if (key === '.' || key === 'Decimal') {
    handleDecimalInput();
    highlightButton('.btn--decimal');
  }
});
```

## Validation Rules

- **Maximum length**: 15 digits total (including digits before and after decimal)
- **Only one decimal point** allowed per number
- **No non-numeric characters** (except decimal point)
- **Leading zero removal**: "07" → "7", but "0.7" → "0.7"

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Keyboard input works correctly (0-9, .)
- [ ] Touch targets meet WCAG 2.1 AA (44×44px minimum)
- [ ] Button states (hover, active, focus) clearly visible
- [ ] Leading zero logic works correctly
- [ ] Decimal point validation works (only one allowed)
- [ ] Maximum length enforced (15 digits)
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Showcase script executed successfully
- [ ] Unit tests pass (if implemented)

## Dependencies

**Required**: VS-01 (Display Current Value)
- Depends on `updateDisplay()` function to show input
- Depends on `calculatorState` object structure

## Next Steps

After VS-02 is complete, proceed to:
- **VS-03**: Select Operation - Add operator buttons (+, -, ×, ÷)
- **VS-04**: Calculate Result - Add equals button and calculation logic
