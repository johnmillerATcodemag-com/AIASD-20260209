---
slice_id: VS-15
phase: 3
priority: P1
dependencies: VS-04
---

# Prompt: Implement VS-15 - Expression Display Mode

## Goal

Allow users to see and edit the entire mathematical expression before calculating, rather than only seeing the current number.

## User Story

As a user, I want to see my full calculation expression (like "5 + 3 × 2") so I can review and edit it before getting the result.

## Implementation Steps

1. **Add expression display** (`index.html`)
   - Add second display line above main display
   - Shows full expression: "5 + 3 × 2"
   - Main display shows current input or result

2. **Update state management** (`app.js`)
   - Add expressionString to state
   - Build expression as user types
   - Format with proper spacing and symbols

3. **Expression building logic**
   - As numbers/operators entered, build expression string
   - Example: "5" → "5", "+" → "5 +", "3" → "5 + 3"
   - On equals: show full expression and result

4. **Add editing capability**
   - Click on expression display → enters edit mode
   - Allow cursor positioning
   - Allow character insertion/deletion
   - Parse edited expression back to operations
   - Validate expression before calculation

5. **Expression validation**
   - Check for balanced operations
   - Ensure valid number/operator sequence
   - Show friendly errors for invalid expressions

6. **Update CSS** (`style.css`)
   - Style expression display (smaller, secondary font)
   - Add edit mode styling (cursor, selection)
   - Differentiate from result display

7. **Enhance history** (if VS-09 implemented)
   - Show full expressions in history
   - Click history item loads full expression

8. **Add tests**
   - Test expression building
   - Test expression parsing
   - Test expression validation
   - Test editing and re-calculation

## Acceptance Criteria

- [ ] Expression display shows full calculation as typed
- [ ] Expression updates in real-time
- [ ] Expression can be clicked/edited
- [ ] Edited expressions are validated before calculation
- [ ] Invalid expressions show clear errors
- [ ] Works with all operations including PEMDAS
- [ ] Expression clears on C button
- [ ] Expression shows in history

## Verification Steps

### Manual Tests

1. Type "5", "+", "3", "×", "2"
   - Expression shows: "5 + 3 × 2"
   - Press "=" → Shows "11" with expression still visible

2. Click on expression display
   - Cursor appears, can edit
   - Change "2" to "4" → "5 + 3 × 4"
   - Press Enter → Recalculates to "17"

3. Try invalid: Edit to "5 + + 3"
   - Shows error: "Invalid expression"

4. Complex: "10 ÷ 2 + 15 × 3 - 8"
   - Expression builds correctly
   - = → Calculates properly (PEMDAS)

5. Test editing:
   - Insert operator in middle
   - Delete numbers/operators
   - Add parentheses (if supported)

### Automated Tests

```javascript
test("Expression builds as operations entered", () => {
  inputDigit("5");
  expect(state.expressionString).toBe("5");

  selectOperator("+");
  expect(state.expressionString).match("5 +");

  inputDigit("3");
  expect(state.expressionString).toBe("5 + 3");
});

test("Expression validation catches errors", () => {
  const valid = validateExpression("5 + 3");
  expect(valid).toBe(true);

  const invalid = validateExpression("5 + + 3");
  expect(invalid).toBe(false);
});

test("Expression parsing converts to operations", () => {
  const tokens = parseExpression("5 + 3 × 2");
  expect(tokens).toEqual([
    { type: "number", value: 5 },
    { type: "operator", value: "+" },
    { type: "number", value: 3 },
    { type: "operator", value: "×" },
    { type: "number", value: 2 },
  ]);
});
```

## Showcase (5 min)

**Setup**: Calculator with expression mode

**Script**:

1. **Show feature**: Type "15 + 7 × 2"
   - Point to expression display → "See your full calculation!"
   - = → Shows "29" → "Expression stays visible for reference"

2. **Demonstrate editing**: Click expression
   - Cursor appears
   - Change "7" to "10" → "15 + 10 × 2"
   - Enter → Recalculates to "35"
   - "Edit anytime without retyping!"

3. **Show validation**: Edit to purposely invalid
   - "15 + × 2" → Error message
   - "Calculator catches mistakes before calculating"

4. **Complex expression**: Build multi-step
   - "100 ÷ 4 + 50 × 2 - 25"
   - Expression clearly shows each part
   - = → Correct PEMDAS result
   - "No mystery about what's being calculated"

5. **History integration**: Show past calculations
   -Each shows full expression
   - Click one → Loads back into expression editor
   - "Full reusability"

**Real World Use Cases**:

- "Verify complex calculations before running"
- "Edit one number without redoing whole expression"
- "Learn math - see exactly what's being calculated"
- "Share expressions with others"
- "Audit trail - see what was actually calculated"

**Comparison**:

- "Basic mode: Mystery - you only see current number"
- "Expression mode: Transparency - see everything"

**Q&A Preview**:

- "Can I copy the expression?" → Yes! Will work with copy function
- "Parentheses support?" → Future enhancement, PEMDAS handles most cases
- "Save expressions?" → Could add expression templates in future

**Key Message**: "From black box to glass box. See exactly what you're calculating with full visibility and editing power."

## Files to Modify

- `index.html` - Add expression display
- `style.css` - Style expression interface
- `app.js` - Implement expression management

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Expression display working
- [ ] Editing functional
- [ ] Validation working
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
