---
slice_id: VS-04
phase: 1
priority: P0
dependencies: VS-01, VS-02, VS-03
---

# Prompt: Implement VS-04 - Calculate Result

## Goal

Implement the equals button (=) to execute pending calculations and display results with correct precision. This command slice completes the basic calculator functionality by performing the actual arithmetic.

## User Story

As a user, I want to press equals to see the result of my calculation so that I can obtain the answer to my arithmetic problem.

## Implementation Steps

1. **Create HTML equals button** (`index.html`)
   - Add equals button with label "="
   - Position prominently (typically bottom-right or spanning bottom)
   - Use semantic HTML with proper attributes
   - Consider making it visually prominent (larger, different color like green)
   - Ensure minimum 44×44px button size for touch targets
   - Add `id="equalsBtn"` for easy selection

2. **Style equals button** (`style.css`)
   - Style distinctly (often green or blue to indicate "action")
   - Make it prominent (possibly larger or double-width)
   - Add hover state for desktop users
   - Add active state for visual feedback on press
   - Add focus state for keyboard navigation

3. **Implement calculation engine** (`app.js` or separate `calculator.js`)
   - Create `calculate(previousValue, currentValue, operation)` function:
     - Parse both values as floats
     - Validate inputs (check for NaN)
     - Perform operation based on operator type (+, -, *, /)
     - Handle division by zero error
     - Round result to 10 decimal places for floating point precision
     - Return result object: `{ error: boolean, result?: string, message?: string }`

4. **Implement arithmetic operations**
   ```javascript
   function calculate(prev, current, operation) {
     const a = parseFloat(prev);
     const b = parseFloat(current);

     if (isNaN(a) || isNaN(b)) {
       return { error: true, message: "Invalid input" };
     }

     let result;
     switch (operation) {
       case "+": result = a + b; break;
       case "-": result = a - b; break;
       case "*": result = a * b; break;
       case "/":
         if (b === 0) {
           return { error: true, message: "Cannot divide by zero" };
         }
         result = a / b;
         break;
       default:
         return { error: true, message: "Unknown operation" };
     }

     // Handle floating point precision (0.1 + 0.2 = 0.3)
     result = Math.round(result * 10000000000) / 10000000000;

     return { error: false, result: result.toString() };
   }
   ```

5. **Implement equals handler** (`app.js`)
   - Create `handleEquals()` function:
     - Check if operation exists (if null, do nothing)
     - Check if previousValue and currentValue exist
     - Call `calculate(previousValue, currentValue, operation)`
     - If error: set `displayError = true`, show error message
     - If success: set `currentValue = result`, clear `previousValue` and `operation`
     - Set `awaitingOperand = true` (allow chaining)
     - Clear operator button highlights
     - Call `updateDisplay()`

6. **Add event listeners**
   - Add click event listener to equals button
   - Add keyboard event listener for Enter key
   - Both should call `handleEquals()`

7. **Handle result chaining**
   - After equals, result becomes new `currentValue`
   - Set `awaitingOperand = true` so:
     - Next digit starts new number
     - Next operator uses result as first operand
   - This enables: 5 + 3 = 8, then + 2 = 10

## Acceptance Criteria

- [ ] Equals button (=) executes the pending calculation
- [ ] Result is mathematically correct for all four operations (+, -, ×, ÷)
- [ ] Division by zero displays error message "Cannot divide by zero"
- [ ] Result maintains decimal precision up to 10 places
- [ ] Handles negative results correctly (e.g., 5 - 10 = -5)
- [ ] Handles large numbers up to 15 digits
- [ ] Floating point accuracy: 0.1 + 0.2 = 0.3 (not 0.30000000000000004)
- [ ] Enter key triggers calculation identically to button
- [ ] Result can be used as input for next calculation (chaining)
- [ ] Pressing equals with no operation does nothing
- [ ] Error state displays in red with clear message

## Verification Steps

### Manual Tests

1. Calculate 5 + 3 = → displays "8"
2. Calculate 10 - 4 = → displays "6"
3. Calculate 7 × 6 = → displays "42"
4. Calculate 20 ÷ 4 = → displays "5"
5. Calculate 10 ÷ 0 = → displays "Cannot divide by zero" in red
6. Calculate 0.1 + 0.2 = → displays "0.3" (not 0.30000000000000004)
7. Calculate 5 - 10 = → displays "-5"
8. Test chaining: 5 + 3 = (shows 8), then + 2 = (shows 10)
9. Test chaining with operators: 5 + 3 = (shows 8), then × 2 = (shows 16)
10. Press Enter key after entering operation → same as clicking =
11. Press = without operation → nothing happens
12. After error, press clear → error removed, calculator ready

### Automated Tests

Create test file (`calculator.test.js`) to verify:

```javascript
// Test cases from VS-04 spec
// TC-V4-01: 5 + 3 = 8
// TC-V4-02: 10 - 4 = 6
// TC-V4-03: 7 × 6 = 42
// TC-V4-04: 20 ÷ 4 = 5
// TC-V4-05: 10 ÷ 0 = Error "Cannot divide by zero"
// TC-V4-06: 0.1 + 0.2 = 0.3 (floating point precision)
// TC-V4-07: 5 - 10 = -5 (negative result)
// TC-V4-08: Result chaining works correctly
// TC-V4-09: Enter key triggers calculation
// TC-V4-10: Equals without operation does nothing
// TC-V4-11: Large number handling (up to 15 digits)
// TC-V4-12: Error clears on new input
```

## Showcase (5 min)

**Setup**: Open calculator in browser at 1024px width

**Script**:

1. **Show equals button**: "Here's the equals button, styled in green to indicate it executes the calculation."
2. **Demo basic operations**:
   - 5 + 3 = → "Addition works: 8"
   - 10 - 4 = → "Subtraction: 6"
   - 7 × 6 = → "Multiplication: 42"
   - 20 ÷ 4 = → "Division: 5"
3. **Demo floating point precision**: 0.1 + 0.2 = → "Notice it shows 0.3, not 0.30000000000000004. We handle floating point precision correctly."
4. **Demo error handling**: 10 ÷ 0 = → "Division by zero shows a clear error message instead of crashing"
5. **Demo chaining**: 5 + 3 = → shows 8, then + 2 = → shows 10 → "Results chain naturally into next calculation"
6. **Demo keyboard**: Enter 5 + 3, press Enter → "Full keyboard support including Enter key"

**Key Message**: "The calculator now performs complete calculations with proper error handling and precision. Users can chain results naturally, making it a fully functional basic calculator."

## Files to Create/Modify

- `index.html` - Add equals button (=)
- `style.css` - Style equals button prominently
- `app.js` - Add `handleEquals()` function, `calculate()` function, event listeners
- `calculator.js` - Optional: Separate calculation logic into its own module
- `calculator.test.js` - Unit tests for calculation logic
- `app.test.js` - Integration tests for equals functionality

## Technical Notes

**State Object (Complete):**
```javascript
const calculatorState = {
  currentValue: "0",        // Current display value (string)
  displayError: false,      // Whether to show error message
  awaitingOperand: false,   // If true, next digit replaces currentValue
  previousValue: null,      // First operand for calculation (string or null)
  operation: null           // Selected operation: "+", "-", "*", "/" (or null)
};
```

**calculate() Function:**
```javascript
function calculate(previousValue, currentValue, operation) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  // Validate inputs
  if (isNaN(prev) || isNaN(current)) {
    return { error: true, message: "Invalid input" };
  }

  let result;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        return { error: true, message: "Cannot divide by zero" };
      }
      result = prev / current;
      break;
    default:
      return { error: true, message: "Unknown operation" };
  }

  // Round to 10 decimal places to handle floating point precision
  // This ensures 0.1 + 0.2 = 0.3
  result = Math.round(result * 10000000000) / 10000000000;

  // Check if result exceeds maximum digit length
  const resultStr = result.toString();
  if (resultStr.replace(".", "").replace("-", "").length > 15) {
    // Optionally convert to scientific notation
    result = parseFloat(result.toExponential(10));
  }

  return { error: false, result: result.toString() };
}
```

**handleEquals() Function:**
```javascript
function handleEquals() {
  // Check if there's an operation to perform
  if (!calculatorState.operation || !calculatorState.previousValue) {
    return; // Nothing to calculate
  }

  // Get values
  const previousValue = calculatorState.previousValue;
  const currentValue = calculatorState.currentValue || "0";
  const operation = calculatorState.operation;

  // Perform calculation
  const result = calculate(previousValue, currentValue, operation);

  if (result.error) {
    // Handle error
    calculatorState.displayError = true;
    calculatorState.currentValue = result.message;
    updateDisplay();
  } else {
    // Handle success
    calculatorState.currentValue = result.result;
    calculatorState.previousValue = null;
    calculatorState.operation = null;
    calculatorState.awaitingOperand = true;
    calculatorState.displayError = false;

    // Clear operator highlights
    document.querySelectorAll('.btn--operator').forEach(btn => {
      btn.classList.remove('btn--active');
    });

    updateDisplay();
  }
}
```

**Event Listeners:**
```javascript
// Equals button click event
const equalsBtn = document.getElementById('equalsBtn');
equalsBtn.addEventListener('click', () => {
  handleEquals();
});

// Keyboard Enter key
document.addEventListener('keydown', (event) => {
  // ... existing key handlers ...

  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission if in form
    handleEquals();
  }
});
```

## Floating Point Precision

**The Problem:**
JavaScript has floating point precision issues:
```javascript
0.1 + 0.2 === 0.30000000000000004 // true (unwanted)
```

**The Solution:**
Round to 10 decimal places:
```javascript
Math.round(result * 10000000000) / 10000000000
```

This ensures user-visible precision while maintaining computational accuracy.

**Alternative:** For complex applications, consider using a library like `decimal.js` or `big.js`.

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed for all test cases
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] All four arithmetic operations work correctly
- [ ] Division by zero handled with clear error message
- [ ] Floating point precision correct (0.1 + 0.2 = 0.3)
- [ ] Negative results display correctly
- [ ] Result chaining works (can use result in next calculation)
- [ ] Enter key works identically to equals button
- [ ] Equals with no operation does nothing gracefully
- [ ] Error states display in red with clear messages
- [ ] Errors clear on new input or clear button
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Unit tests pass (if implemented)
- [ ] Showcase script executed successfully
- [ ] **MILESTONE: Basic calculator fully functional** ✓

## Dependencies

**Required**:
- VS-01 (Display Current Value) - For display updates
- VS-02 (Input Digit) - For number input
- VS-03 (Select Operation) - For operation selection and state setup

## Next Steps

After VS-04 is complete:
- **MILESTONE ACHIEVED**: Basic calculator with +, -, ×, ÷ operations fully functional
- Users can perform complete calculations end-to-end
- Ready for enhancement slices (VS-05: Clear, VS-06: Backspace, etc.)

## Important Notes

**This slice does NOT include:**
- PEMDAS multi-operation order of operations (5 + 3 × 2)
- That would require expression parsing and is a future enhancement
- This slice handles single operation calculations: A [op] B = result
- Chaining works: result [op] C = new result, but still one operation at a time

**Focus:** Complete the basic calculator loop:
1. Enter first number (VS-02)
2. Select operation (VS-03)
3. Enter second number (VS-02)
4. Calculate result (VS-04) ← **This slice**
5. Display result (VS-01)
