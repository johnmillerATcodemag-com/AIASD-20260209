---
slice_id: VS-06
phase: 1
priority: P0
dependencies: VS-03
---

# Prompt: Implement VS-06 - Keyboard Input

## Goal

Enable full keyboard support so users can perform all operations without touching the mouse.

## User Story

As a user, I want to use my keyboard to enter numbers and operations for faster, more efficient calculations.

## Implementation Steps

1. **Add keyboard event listener** (`app.js`)
   - Add document-level keydown event listener
   - Map keyboard keys to calculator functions:
     - Numbers: 0-9 → inputDigit()
     - Operators: +, -, \*, / → selectOperator()
     - Enter or = → evaluateExpression()
     - Escape or C or Delete → clearCalculator()
     - Decimal: . → inputDecimal()
     - Backspace → deleteLastDigit() (if implemented in VS-07, else skip)
   - Prevent default browser behavior where appropriate

2. **Implement key mapping** (`app.js`)
   - Create keyMap object:
     ```javascript
     const keyMap = {
       '0'-'9': 'digit',
       '+': 'add',
       '-': 'subtract',
       '*': 'multiply',
       '×': 'multiply',
       '/': 'divide',
       '÷': 'divide',
       'Enter': 'equals',
       '=': 'equals',
       'Escape': 'clear',
       'c': 'clear',
       'C': 'clear',
       '.': 'decimal'
     };
     ```
   - Route key events to appropriate handlers

3. **Add visual feedback** (`app.js`)
   - When key pressed, temporarily highlight corresponding button
   - Add/remove "pressed" class with CSS animation
   - Show which button was activated

4. **Update CSS** (`style.css`)
   - Add .pressed class for button animation
   - Create brief highlight effect (e.g., scale or brightness change)

5. **Add tests**
   - Test number key input
   - Test operator keys
   - Test Enter key for equals
   - Test Escape for clear
   - Test that invalid keys are ignored

## Acceptance Criteria

- [ ] Number keys 0-9 input digits
- [ ] +, -, \*, / keys work for operations
- [ ] Enter or = key evaluates expression
- [ ] Escape, C, or Delete clears calculator
- [ ] . key inputs decimal point
- [ ] Buttons visually respond to keyboard input
- [ ] Invalid keys are ignored gracefully
- [ ] Tab navigation still works

## Verification Steps

### Manual Tests

1. Type "5" + "3" on keyboard - displays as expected
2. Press "Enter" -evaluates to 8
3. Type "1" "0" "/" "2" "Enter" - displays 5
4. Press "Escape" - clears to 0
5. Type "3" "." "1" "4" - displays 3.14
6. Type "\*" (asterisk) - works as multiply
7. Type "/" (forward slash) - works as divide
8. Watch buttons - should highlight briefly as keys pressed
9. Press random letter keys - ignored, no errors
10. Tab through buttons - still works alongside keyboard input

### Automated Tests

```javascript
test("Keyboard number input works", () => {
  simulateKeyPress("5");
  expect(state.currentInput).toBe("5");
});

test("Keyboard operators work", () => {
  state.currentInput = "5";
  simulateKeyPress("+");
  expect(state.operator).toBe("+");
});

test("Enter key triggers evaluation", () => {
  setupCalculation(5, "+", 3);
  simulateKeyPress("Enter");
  expect(state.currentInput).toBe("8");
});
```

## Showcase (3 min)

**Setup**: Calculator open, focus on it

**Script**:

1. **Demo typing**: Type "5+3" quickly on keyboard → "Watch - I never touched the mouse!"
2. **Press Enter** → Shows 8 → "Enter key evaluates, just like a real calculator."
3. **Type complex**: "10" "/" "2" "\*" "5" Enter → Shows 25 → "Full expression via keyboard."
4. **Show Escape**: Press Esc → Clears → "Escape key quickly resets."
5. **Show feedback**: Type slowly "1" "2" "3" → Buttons highlight → "Visual feedback shows what's happening."
6. **Show mixed**: Mouse click "6", type "+4" Enter → "Mouse and keyboard work together seamlessly."

**Q&A Preview**:

- "What about copy/paste?" → VS-13 adds that feature
- "Custom keyboard shortcuts?" → Future enhancement possibility
- "Works on mobile?" → This is for physical keyboards; touch buttons still work on mobile

**Key Message**: "Power users can now calculate at full speed with keyboard support. No compromises—both mouse and keyboard work perfectly."

## Files to Modify

- `app.js` - Add keyboard event handling
- `style.css` - Add keyboard visual feedback

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All keyboard keys working correctly
- [ ] Visual feedback implemented
- [ ] Manual verification completed
- [ ] No regressions in mouse input
- [ ] Showcase script executed successfully
