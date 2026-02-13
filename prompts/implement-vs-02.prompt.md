---
slice_id: VS-02
phase: 1
priority: P0
dependencies: VS-01
---

# Prompt: Implement VS-02 - Basic Arithmetic Logic

## Goal

Add operator buttons (+, -, ×, ÷) and implement the calculation logic.

## User Story

As a user, I want to select an arithmetic operation to perform a calculation between two numbers.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add four operator buttons (+, -, ×, ÷) to the grid
   - Update grid to 4 columns to accommodate operators
   - Add proper ARIA labels for operators

2. **Update CSS** (`style.css`)
   - Change grid layout to 4 columns
   - Style operator buttons distinctly (different color)
   - Add "active" state styling for selected operator

3. **Create calculation module** (`calculator.js`)
   - Implement add(a, b) function
   - Implement subtract(a, b) function
   - Implement multiply(a, b) function
   - Implement divide(a, b) function with zero-division check
   - Implement calculate(a, operator, b) dispatcher function
   - Export all functions

4. **Update app logic** (`app.js`)
   - Extend state to include previousInput, operator, awaitingOperand
   - Add event listeners for operator buttons
   - Implement selectOperator(operator) function
   - Store first operand when operator clicked
   - Clear display for second operand input
   - Handle chained operations (auto-calculate when new operator clicked)
   - Update visual feedback (highlight active operator)

5. **Create unit tests** (`calculator.test.js`)
   - Test all four arithmetic operations
   - Test edge cases (negatives, decimals, zero)
   - Test division by zero error
   - Achieve 100% coverage on calculator.js

## Acceptance Criteria

- [ ] Four operator buttons visible and styled distinctly
- [ ] Clicking operator stores first operand and prepares for second
- [ ] Selected operator is visually highlighted
- [ ] All four operations implemented and tested
- [ ] Chained operations work (e.g., 5 + 3 - 2)
- [ ] Division by zero throws proper error

## Verification Steps

### Manual Tests

1. Click "5", "+", "3" - display shows "3", plus button highlighted
2. Refresh, click "10", "-", "4" - minus button highlighted
3. Refresh, click "6", "×", "7" - display prepared for second operand
4. Test chained: "5", "+", "3", "-" - should show "8" (auto-calculated 5+3)
5. Click different operators - only one should be highlighted

### Automated Tests

Run: `npm test calculator.test.js`

- All arithmetic tests pass
- Division by zero test passes
- Edge case tests pass
- 100% code coverage achieved

## Showcase (4 min)

**Setup**: Open calculator in browser

**Script**:

1. **Show operators**: "We've added the four arithmetic operator buttons in purple."
2. **Demo basic operation**: Click 5, +, 3 → "The plus button highlights, showing it's active."
3. **Show each operator**: Demo -, ×, ÷ → "All four operations ready to use."
4. **Demo chaining**: Click 5, +, 3, - → Shows 8 → "Chained operations work - it calculated 5+3 automatically."
5. **Show tests**: Display test results → "100% test coverage on calculation logic."

**Key Message**: "The arithmetic brain of the calculator is complete and thoroughly tested. Next slice adds the equals button to complete calculations."

## Files to Create/Modify

- `index.html` - Add operator buttons
- `style.css` - Style operators
- `app.js` - Add operator handling
- `calculator.js` - NEW: Pure calculation logic
- `calculator.test.js` - NEW: Unit tests

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All unit tests passing (100% coverage)
- [ ] Manual verification completed
- [ ] Chained operations working
- [ ] Showcase script executed successfully
