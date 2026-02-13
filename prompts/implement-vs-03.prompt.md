---
slice_id: VS-03
phase: 1
priority: P0
dependencies: VS-01, VS-02
---

# Prompt: Implement VS-03 - Select Operation

## Goal

Implement operation buttons (+, -, ×, ÷) that store the operation and first operand for calculation. This command slice enables users to select arithmetic operations.

## User Story

As a user, I want to select an arithmetic operation (+, -, ×, ÷) so that I can perform calculations between two numbers.

## Implementation Steps

1. **Create HTML operator buttons** (`index.html`)
   - Add four operator buttons: +, -, ×, ÷
   - Use proper mathematical symbols (× not x, ÷ not /)
   - Use `data-operator` attributes for operator values
   - Position operators in calculator grid (typically right column)
   - Ensure minimum 44×44px button size for touch targets

2. **Style operator buttons** (`style.css`)
   - Style operators distinctly from number buttons (different color)
   - Add hover state for desktop users
   - Add active/selected state to show which operator is active
   - Add focus state for keyboard navigation
   - Consider making operators visually prominent (e.g., orange/blue)
   - Maintain consistent sizing with number buttons (44×44px min)

3. **Extend calculator state** (`app.js`)
   - Add to `calculatorState` object:
     - `previousValue` (string, stores first operand)
     - `operation` (string, stores selected operation: "+", "-", "*", "/")
   - Note: `awaitingOperand` already added in VS-02

4. **Implement operator selection logic**
   - Create `handleOperatorInput(operator)` function:
     - Read current `currentValue`
     - If `currentValue` is empty, default to "0"
     - Store `currentValue` in `previousValue`
     - Store selected operator in `operation`
     - Set `awaitingOperand` to true (next digit starts new number)
     - Optionally: keep `currentValue` displayed or clear for next input
     - Add visual feedback (highlight selected operator button)
     - Call `updateDisplay()` if needed

5. **Add operator button event listeners**
   - Query all operator buttons with `.btn--operator` class
   - Add click event listeners calling `handleOperatorInput(operator)`
   - Extract operator from `data-operator` attribute

6. **Add keyboard support for operators**
   - Extend keyboard event listener to map:
     - "+" → plus operation
     - "-" → minus operation
     - "*" → multiplication operation
     - "/" → division operation
   - Call same `handleOperatorInput()` function
   - Provide visual feedback on corresponding button

7. **Handle operator replacement**
   - If user selects different operator before entering second number:
     - Replace previous operator with new one
     - Don't trigger calculation
     - Update visual indicator

## Acceptance Criteria

- [ ] Clicking operation buttons (+, -, ×, ÷) stores the operation
- [ ] Current display value is saved as first operand (`previousValue`)
- [ ] Display is ready to accept next number (`awaitingOperand` = true)
- [ ] Keyboard input (+, -, *, /) functions identically to buttons
- [ ] Subsequent operation selection replaces previous operation
- [ ] Visual indication of selected operation (active/highlighted state)
- [ ] Operations use standard mathematical symbols (×, ÷)
- [ ] Buttons are minimum 44×44px (touch target requirement)

## Verification Steps

### Manual Tests

1. Open calculator, click "5", "+" - plus button highlighted, state shows `previousValue: "5"`, `operation: "+"`
2. Click "10", "-" - minus button highlighted, state shows `previousValue: "10"`, `operation: "-"`
3. Click "7", "×" - multiplication button highlighted
4. Click "8", "÷" - division button highlighted
5. Click "5", "+", then "-" before entering second number - minus replaces plus (no calculation yet)
6. Press keyboard "/" after entering "10" - division button highlights, state correct
7. Tab to operator buttons - focus outline visible

### Automated Tests

Create test file or extend `app.test.js` to verify:

```javascript
// Test cases from VS-03 spec
// TC-V3-01: currentValue "5" + click "+" → previousValue "5", operation "+", awaitingOperand true
// TC-V3-02: currentValue "10" + click "-" → previousValue "10", operation "-"
// TC-V3-03: currentValue "7" + click "×" → previousValue "7", operation "*"
// TC-V3-04: currentValue "8" + click "÷" → previousValue "8", operation "/"
// TC-V3-05: Empty currentValue + click "+" → previousValue "0", operation "+"
// TC-V3-06: operation "+", currentValue "5" + click "-" → operation "-" (replaces)
// TC-V3-07: currentValue "7" + press keyboard "/" → previousValue "7", operation "/"
// TC-V3-08: Visual feedback on operator button selection
// TC-V3-09: Keyboard operator mapping correct
```

## Showcase (4 min)

**Setup**: Open calculator in browser at 1024px width, open browser console for state inspection

**Script**:

1. **Show operator buttons**: "Here are our four arithmetic operator buttons, styled in orange to stand out from number buttons."
2. **Demo operator selection**: Click 5, + → "When I select plus, notice the button highlights and the first number is stored"
3. **Inspect state**: Open console, log `calculatorState` → "See how previousValue is '5' and operation is '+'"
4. **Demo each operator**: Click 10, -, then 7, ×, then 8, ÷ → "All four operations work the same way"
5. **Demo operator replacement**: Click 5, +, then - → "Changing operators before second number simply replaces the operation"
6. **Demo keyboard**: Press 9, then "/" → "Full keyboard support for operators too"

**Key Message**: "Users can now select arithmetic operations. The calculator remembers the first number and operation, ready to accept the second number. Next step: implementing the equals button to actually perform calculations."

## Files to Create/Modify

- `index.html` - Add operator buttons (+, -, ×, ÷)
- `style.css` - Style operator buttons with distinct visual treatment
- `app.js` - Add `handleOperatorInput()` function, extend state, add event listeners
- `app.test.js` - Unit tests for operator selection logic (optional but recommended)

## Technical Notes

**Updated State Object:**
```javascript
const calculatorState = {
  currentValue: "0",        // Current display value (string)
  displayError: false,      // Whether to show error message
  awaitingOperand: false,   // If true, next digit replaces currentValue
  previousValue: null,      // First operand for calculation (string or null)
  operation: null           // Selected operation: "+", "-", "*", "/" (or null)
};
```

**handleOperatorInput() Function:**
```javascript
function handleOperatorInput(operator) {
  const currentValue = calculatorState.currentValue || "0";

  // If no previousValue set, this is the first operator selection
  if (calculatorState.previousValue === null) {
    calculatorState.previousValue = currentValue;
  } else if (!calculatorState.awaitingOperand) {
    // If there's already a previousValue and we have a new operand,
    // we could auto-calculate here (optional, often done in VS-04)
    // For now, just update previousValue with current
    calculatorState.previousValue = currentValue;
  }
  // If awaitingOperand is true, user is just changing operators

  // Store the selected operation
  calculatorState.operation = operator;

  // Set flag so next digit starts new number
  calculatorState.awaitingOperand = true;

  // Update visual feedback (highlight operator button)
  updateOperatorHighlight(operator);
}
```

**Operator Symbol Mapping:**
```javascript
// Internal representation (JavaScript operators)
const OPERATORS = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVIDE: "/"
};

// Display symbols (mathematical notation)
const OPERATOR_SYMBOLS = {
  "+": "+",
  "-": "−",   // Use proper minus sign (U+2212)
  "*": "×",   // Use multiplication sign (U+00D7)
  "/": "÷"    // Use division sign (U+00F7)
};
```

**Keyboard Event Listener Extension:**
```javascript
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // ... existing number key handling ...

  // Handle operator keys
  if (key === '+') {
    handleOperatorInput('+');
    highlightButton('[data-operator="+"]');
  } else if (key === '-') {
    handleOperatorInput('-');
    highlightButton('[data-operator="-"]');
  } else if (key === '*') {
    handleOperatorInput('*');
    highlightButton('[data-operator="×"]');
  } else if (key === '/') {
    event.preventDefault(); // Prevent browser search
    handleOperatorInput('/');
    highlightButton('[data-operator="÷"]');
  }
});
```

**Visual Feedback Helper:**
```javascript
function updateOperatorHighlight(operator) {
  // Clear all operator highlights
  document.querySelectorAll('.btn--operator').forEach(btn => {
    btn.classList.remove('btn--active');
  });

  // Highlight selected operator
  const symbolMap = {'+': '+', '-': '−', '*': '×', '/': '÷'};
  const symbol = symbolMap[operator];
  const button = document.querySelector(`[data-operator="${symbol}"]`);
  if (button) {
    button.classList.add('btn--active');
  }
}
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Keyboard input works correctly (+, -, *, /)
- [ ] Touch targets meet WCAG 2.1 AA (44×44px minimum)
- [ ] Operator buttons visually distinct from number buttons
- [ ] Selected operator has clear visual indication
- [ ] Operator replacement works (no premature calculation)
- [ ] Button states (hover, active, focus) clearly visible
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Showcase script executed successfully
- [ ] Unit tests pass (if implemented)

## Dependencies

**Required**:
- VS-01 (Display Current Value) - For display updates
- VS-02 (Input Digit) - For `awaitingOperand` flag and number input flow

## Next Steps

After VS-03 is complete, proceed to:
- **VS-04**: Calculate Result - Add equals button to perform actual calculations
- **VS-05**: Clear Calculator State - Add clear button to reset calculator

## Important Notes

**This slice does NOT include:**
- Equals button (that's VS-04)
- Clear button (that's VS-05)
- Actual calculation logic (that's VS-04)
- Chain calculations (auto-calculate when operator pressed twice)

**Focus:** This slice is ONLY about selecting and storing the operation. The calculator should remember:
1. What the first number was (`previousValue`)
2. What operation was selected (`operation`)
3. That we're waiting for the second number (`awaitingOperand`)
