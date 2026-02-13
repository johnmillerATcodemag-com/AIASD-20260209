---
slice_id: VS-03
phase: 1
priority: P0
dependencies: VS-02
---

# Prompt: Implement VS-03 - Equals & Clear Operations

## Goal

Add equals (=) and clear (C) buttons to complete the basic calculator functionality.

## User Story

As a user, I want to press "=" to see the result of my calculation and "C" to start fresh.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add equals button (=)
   - Add clear button (C)
   - Update grid layout to accommodate new buttons
   - Position strategically (C at top, = prominently placed)

2. **Update CSS** (`style.css`)
   - Style equals button in green (prominent, possibly larger)
   - Style clear button in red (indicates reset)
   - Add error state styling for display (.error class)
   - Update grid layout to 5 columns

3. **Update app logic** (`app.js`)
   - Add hasError and lastOperation to state
   - Add event listeners for equals and clear buttons
   - Implement evaluateExpression() function:
     - Retrieve operands and operator from state
     - Call calculator.calculate()
     - Handle errors (division by zero)
     - Display result
     - Store result as previousInput for chaining
     - Store lastOperation for repeat equals
   - Implement clearCalculator() function:
     - Reset all state variables to initial values
     - Clear error states
     - Update display to "0"
     - Clear visual indicators
   - Implement displayError(message) function:
     - Set hasError flag
     - Add error class to display
     - Show error message
   - Update number/operator handlers to clear errors automatically

4. **Extend tests** (`calculator.test.js`, `app.test.js`)
   - Test division by zero handling
   - Test result chaining
   - Test clear functionality
   - Test repeat equals feature
   - Test error state recovery

## Acceptance Criteria

- [ ] Equals button evaluates and displays result
- [ ] Clear button resets all state
- [ ] Division by zero shows error message in red
- [ ] Results can be used in next calculation
- [ ] Pressing equals multiple times repeats last operation
- [ ] Entering new number after error auto-clears error
- [ ] All operator indicators cleared after calculation

## Verification Steps

### Manual Tests

1. Click "5", "+", "3", "=" - displays "8"
2. Continue with "×", "2", "=" - displays "16" (chained from result)
3. Click "10", "÷", "0", "=" - shows "Cannot divide by zero" in red
4. Click any number after error - error clears
5. Click "C" - resets to "0"
6. Click "5", "+", "3", "=" (shows 8), "=" again (shows 11), "=" again (shows 14) - repeat equals works
7. After calculation, operator highlight is cleared

### Automated Tests

Run: `npm test`

- evaluateExpression tests pass
- clearCalculator tests pass
- Error handling tests pass
- Repeat equals tests pass

## Showcase (5 min)

**Setup**: Open calculator

**Script**:

1. **Complete calculation**: Click 5, +, 3, = → "First complete calculation! Shows 8."
2. **Result chaining**: Continue ×, 2, = → "Result chains naturally. 8 × 2 = 16."
3. **All operations**: Demo subtract ion and division calculations
4. **Error handling**: Click 10, ÷, 0, = → "Clear error message instead of crashing."
5. **Auto-recovery**: Click 5 → "Smart recovery - just start typing."
6. **Clear button**: Demo C button → "One-click reset anytime."
7. **Repeat equals**: 5, +, 3, =, =, = → "Keep pressing equals to repeat: 8, 11, 14."

**Key Message**: "We now have a fully functional basic calculator! Users can perform complete calculations end-to-end."

**Q&A Preview**:

- "When will decimals work?" → VS-05, coming soon
- "What about order of operations?" → VS-04, next up
- "Ready for users?" → Basic functionality is complete and testable!

## Files to Modify

- `index.html` - Add equals and clear buttons
- `style.css` - Style new buttons and error state
- `app.js` - Add evaluation and clear logic
- `calculator.test.js` & `app.test.js` - Extend tests

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] Manual verification completed
- [ ] Error handling working
- [ ] Showcase script executed successfully
- [ ] **MILESTONE: Basic calculator fully functional**
