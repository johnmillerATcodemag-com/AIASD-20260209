---
slice_id: VS-04
phase: 1
priority: P0
dependencies: VS-03
---

# Prompt: Implement VS-04 - Calculate Result (Equals + PEMDAS)

## Goal

Implement the equals button (and Enter key) to execute the pending calculation and display the result with:

- **Correct math**: All four operations; multi-operation expressions follow PEMDAS (e.g. 5 + 3 × 2 = 11).
- **Precision and edge cases**: 10 decimal places, 0.1 + 0.2 = 0.3, negative results, large numbers (15 digits then scientific notation).
- **Error handling**: Division by zero and invalid input show a clear error message.
- **Chaining**: The result can be used as the first operand for the next calculation.

## User Story

As a user, I want to press equals (or Enter) to see the result of my calculation, and I want calculations to follow standard math rules (e.g. 5 + 3 × 2 = 11, not 16).

## Implementation Steps

### 1. Add equals button (HTML)

Add the equals button with the specified structure:

```html
<button class="btn btn--equals" id="equalsBtn">=</button>
```

### 2. Core calculation: `calculate(previousValue, currentValue, operation)` (`calculator.js`)

Implement the single-operation calculation used by the engine (and for simple two-value expressions):

- Parse both values with `parseFloat`; return `{ error: true, message: "Invalid input" }` if either is `NaN`.
- Support four operations: `+`, `-`, `*`, `/`.
- Division by zero: return `{ error: true, message: "Cannot divide by zero" }`.
- Unknown operation: return `{ error: true, message: "Unknown operation" }`.
- Round result to 10 decimal places: `Math.round(result * 10000000000) / 10000000000` (so 0.1 + 0.2 = 0.3).
- If result has more than 15 digits (excluding decimal and minus): format with `toExponential(10)`.
- Return `{ error: false, result: result.toString() }` on success.

Use this function for every binary operation inside the PEMDAS evaluator so precision and errors are consistent.

### 3. PEMDAS: `evaluateExpression(tokens)` (`calculator.js`)

- Token format: `[{ type: 'number', value: '5' }, { type: 'operator', value: '+' }, ...]`.
- **First pass**: Evaluate all `*` and `/` left to right, replacing each triple (left, op, right) with the result from `calculate(left, right, op)`. If `calculate` returns an error, abort and return that error.
- **Second pass**: Evaluate all `+` and `-` left to right the same way.
- Return `{ error: false, result }` or `{ error: true, message }`.

### 4. State management (`app.js`)

- **Token-based state**: Add `expressionTokens` (or equivalent) so multi-operation input is stored (e.g. 5, +, 3, ×, 2). Update digit and operator handlers to append to tokens instead of only storing a single pending operation.
- **On equals/Enter**:
  - **Read**: Current expression (tokens or `previousValue` / `currentValue` / `operation` as fallback for single-op).
  - Build token array from current state, call `calculator.evaluateExpression(tokens)` (or `calculate(previousValue, currentValue, operation)` for single-op if not using tokens yet).
  - **On success**: Set `currentValue` to result; clear `previousValue`, `operation`, and tokens; set `awaitingOperand` to `true`.
  - **On error**: Set `displayError` to the error message (e.g. "Cannot divide by zero").
- **Result chaining**: After "=", the displayed result is the first operand for the next calculation (user can press an operator or start typing digits).

### 5. Equals and Enter handlers (`app.js`)

- Wire `#equalsBtn` to run the same logic as "execute pending calculation."
- Add keyboard listener: Enter (when not in a text input) triggers the same calculation.

### 6. Tests (`calculator.test.js`)

- **Critical test cases from slice** (must pass):

| Test Case | Operation | Expected Result                | Priority |
| --------- | --------- | ------------------------------ | -------- |
| TC-V4-01  | 5 + 3     | 8                              | High     |
| TC-V4-02  | 10 - 4    | 6                              | High     |
| TC-V4-03  | 7 × 6     | 42                             | High     |
| TC-V4-04  | 20 ÷ 4    | 5                              | High     |
| TC-V4-05  | 10 ÷ 0    | Error: "Cannot divide by zero" | Critical |
| TC-V4-06  | 0.1 + 0.2 | 0.3 (not 0.30000000000000004)  | Critical |
| TC-V4-07  | 5 - 10    | -5                             | High     |

- **PEMDAS tests**: 5 + 3 × 2 = 11; 10 - 6 ÷ 2 = 7; 2 × 3 + 4 × 5 = 26; 100 ÷ 4 - 5 × 2 = 15; other multi-op expressions.
- **Edge cases**: Division by zero, invalid input, unknown operation, negative results, large numbers, floating point precision.
- **Integration**: Full workflows and result chaining (result → operator → next number → =).
- Aim for 15+ unit test cases covering all operations and edge cases.

## Acceptance Criteria

- [ ] Equals button (=) executes the pending calculation
- [ ] Enter key triggers the same calculation
- [ ] Result is mathematically correct for all operations (+, -, ×, ÷)
- [ ] Multi-operation expressions follow PEMDAS (× and ÷ before + and -; same precedence left-to-right)
- [ ] 5 + 3 × 2 = 11 and 10 - 6 ÷ 2 = 7 (and similar PEMDAS cases)
- [ ] Division by zero displays error message ("Cannot divide by zero")
- [ ] Result maintains decimal precision up to 10 places; 0.1 + 0.2 = 0.3
- [ ] Handles negative results correctly (e.g. 5 - 10 = -5)
- [ ] Handles large numbers up to 15 digits; scientific notation beyond that
- [ ] Result can be used as input for next calculation (chaining)
- [ ] All critical test cases (TC-V4-01 through TC-V4-07) and PEMDAS tests pass

## Implementation Checklist

- [ ] Create HTML equals button (`id="equalsBtn"`, `class="btn btn--equals"`)
- [ ] Implement `calculate(previousValue, currentValue, operation)` with slice spec (four ops, precision, errors, large numbers)
- [ ] Implement `evaluateExpression(tokens)` with PEMDAS (two-pass using `calculate()`)
- [ ] Update state to support expression tokens for multi-op input
- [ ] Wire equals button and Enter key to run evaluation
- [ ] Implement floating point precision (round to 10 decimal places) in `calculate()`
- [ ] Add division by zero and invalid/unknown operation error handling; set `displayError`
- [ ] Add scientific notation for results over 15 digits
- [ ] Implement result chaining (result becomes next operand)
- [ ] Write unit tests for all operations and edge cases (TC-V4-01 through TC-V4-07, 15+ cases)
- [ ] Write unit tests for PEMDAS (5+3×2=11, 10-6÷2=7, etc.)
- [ ] Write integration tests for workflows and chaining
- [ ] Test floating point precision (0.1 + 0.2 = 0.3) extensively

## Verification Steps

### Manual Tests

1. **Basic ops**: 5 + 3 = → 8; 10 - 4 = → 6; 7 × 6 = → 42; 20 ÷ 4 = → 5
2. **PEMDAS**: 5 + 3 × 2 = → 11; 10 - 6 ÷ 2 = → 7; 2 × 3 + 4 × 5 = → 26
3. **Division by zero**: 10 ÷ 0 = → error "Cannot divide by zero"
4. **Floating point**: 0.1 + 0.2 = → 0.3
5. **Negative**: 5 - 10 = → -5
6. **Enter key**: 5 + 3 then Enter → 8
7. **Chaining**: 8 = then "+", "2", "=" → 10

### Automated Tests

Run: `npm test calculator.test.js` — all critical and PEMDAS tests pass; no regressions.

## Showcase (4 min)

**Setup**: Have calculator and examples ready

**Script**:

1. **Equals and result**: "Equals and Enter run the calculation. 5 + 3 = → 8. Result chains: 8 + 2 = → 10."
2. **PEMDAS**: "Multi-op follows math rules: 5 + 3 × 2 = → 11 (not 16). 10 - 6 ÷ 2 = → 7."
3. **Edge case**: 10 ÷ 0 = → "Cannot divide by zero."
4. **Precision**: 0.1 + 0.2 = → 0.3.

**Key Message**: "Equals and Enter run the calculation with correct math, PEMDAS, precision, and error handling. Results chain into the next calculation."

## Files to Modify

- **HTML** – Add equals button (`id="equalsBtn"`, `class="btn btn--equals"`)
- `app.js` – Token-based state (or build tokens on =), equals and Enter handlers, state updates, result chaining
- `calculator.js` – `calculate(previousValue, currentValue, operation)` per slice spec; `evaluateExpression(tokens)` with PEMDAS
- `calculator.test.js` – Critical test cases (TC-V4-01–TC-V4-07), PEMDAS tests, edge cases, integration tests

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Equals button and Enter key trigger calculation
- [ ] `calculate()` implements slice spec (ops, precision, errors, large numbers)
- [ ] `evaluateExpression(tokens)` implements PEMDAS using `calculate()`
- [ ] State updated for tokens; result chaining works
- [ ] All new tests passing (critical + PEMDAS + edge cases)
- [ ] No regressions in existing tests
- [ ] Manual verification and showcase completed
