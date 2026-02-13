---
slice_id: VS-04
phase: 1
priority: P0
dependencies: VS-03
---

# Prompt: Implement VS-04 - Order of Operations (PEMDAS)

## Goal

Implement proper mathematical order of operations so multiplication/division are evaluated before addition/subtraction.

## User Story

As a user, I want calculations to follow standard math rules (e.g., 5 + 3 × 2 = 11, not 16).

## Implementation Steps

1. **Update state management** (`app.js`)
   - Change from storing single operation to storing expression tokens
   - Add expressionTokens array to state: `[{type: 'number', value: 5}, {type: 'operator', value: '+'}, ...]`
   - Update selectOperator to append to tokens instead of immediate calculation
   - Update inputDigit to work with token-based storage

2. **Implement PEMDAS algorithm** (`calculator.js`)
   - Create evaluateExpression(tokens) function
   - **First pass**: Loop through tokens, evaluate all × and ÷ from left to right, replace with results
   - **Second pass**: Loop through remaining tokens, evaluate all + and - from left to right
   - Return final result
   - Add comprehensive tests for order of operations

3. **Update equals handler** (`app.js`)
   - Modify evaluateExpression() to use new token-based evaluation
   - Build tokens array from current expression state
   - Call calculator.evaluateExpression(tokens)
   - Handle results same as before

4. **Add tests** (`calculator.test.js`)
   - Test: 5 + 3 × 2 = 11 (not 16)
   - Test: 10 - 6 ÷ 2 = 7 (not 2)
   - Test: 2 × 3 + 4 × 5 = 26
   - Test: 100 ÷ 4 - 5 × 2 = 15
   - Test: Complex multi-operation expressions

## Acceptance Criteria

- [ ] Multiplication evaluated before addition
- [ ] Division evaluated before subtraction
- [ ] Operations of same precedence evaluated left-to-right
- [ ] 5 + 3 × 2 = 11 ✓
- [ ] 10 - 6 ÷ 2 = 7 ✓
- [ ] Existing simple calculations still work correctly
- [ ] All tests passing with PEMDAS scenarios

## Verification Steps

### Manual Tests

1. Click "5", "+", "3", "×", "2", "=" - displays "11" (not 16)
2. Click "10", "-", "6", "÷", "2", "=" - displays "7" (not 2)
3. Click "2", "×", "3", "+", "4", "×", "5", "=" - displays "26"
4. Click "100", "÷", "4", "-", "5", "×", "2", "=" - displays "15"
5. Verify simple operations still work: "5", "+", "3", "=" - displays "8"

### Automated Tests

Run: `npm test calculator.test.js`

- All PEMDAS tests pass
- No regressions in basic arithmetic tests

## Showcase (4 min)

**Setup**: Have calculator and examples ready

**Script**:

1. **Setup problem**: "A critical feature: proper order of operations."
2. **Show old behavior**: "Without PEMDAS, 5 + 3 × 2 would give 16 (wrong!)"
3. **Demo correct**: Click 5, +, 3, ×, 2, = → Shows 11
   - "The calculator does 3 × 2 = 6 first, then 5 + 6 = 11. Mathematically correct!"
4. **Show another**: Click 10, -, 6, ÷, 2, = → Shows 7
   - "Division first: 6 ÷ 2 = 3, then 10 - 3 = 7."
5. **Complex example**: 2, ×, 3, +, 4, ×, 5, = → Shows 26
   - "Multiplications first: (2×3=6) + (4×5=20) = 26."

**Q&A Preview**:

- "What about parentheses?" → Future enhancement, PEMDAS covers most cases now
- "Does this break anything?" → No! Simple calculations work exactly as before
- "Is this standard?" → Yes, matches all scientific and standard calculators

**Key Message**: "Calculations now follow universal mathematical rules. The calculator produces correct results for complex expressions."

## Files to Modify

- `app.js` - Update state to use tokens
- `calculator.js` - Add evaluateExpression with PEMDAS
- `calculator.test.js` - Add PEMDAS tests

## Definition of Done

- [ ] All acceptance criteria met
- [ ] PEMDAS algorithm correctly implemented
- [ ] All new tests passing
- [ ] No regressions in existing tests
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
