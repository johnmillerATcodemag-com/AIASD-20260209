---
slice_id: VS-05
phase: 1
priority: P0
dependencies: VS-03
---

# Prompt: Implement VS-05 - Decimal & Negative Support

## Goal

Add support for decimal numbers and negative numbers.

## User Story

As a user, I want to work with decimal numbers (3.14) and negative numbers (-5) for real-world calculations.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add decimal point button (.)
   - Add plus/minus toggle button (+/−)
   - Position appropriately in button grid

2. **Update CSS** (`style.css`)
   - Style new buttons consistently with other function buttons

3. **Implement decimal logic** (`app.js`)
   - Add event listener for decimal button
   - Implement inputDecimal() function:
     - Check if currentInput already contains "."
     - If yes, do nothing (only one decimal per number)
     - If awaitingOperand, set currentInput to "0."
     - Otherwise, append "." to currentInput
   - Update display

4. **Implement sign toggle** (`app.js`)
   - Add event listener for +/- button
   - Implement toggleSign() function:
     - Parse currentInput as number
     - Multiply by -1
     - Update currentInput with new value
     - Update display

5. **Handle floating point precision** (`calculator.js`)
   - Implement formatResult(number) function:
     - Round to 10 decimal places to avoid 0.1 + 0.2 = 0.30000000004
     - Remove trailing zeros
     - Return cleaned string
   - Apply to all calculation results

6. **Add tests**
   - Test decimal input (3.14, 0.5)
   - Test blocking multiple decimals in one number
   - Test floating point precision (0.1 + 0.2 = 0.3)
   - Test sign toggle (5 → -5 → 5)
   - Test calculations with negatives (-5 + 10 = 5)
   - Test calculations with decimals (5.5 × 2 = 11)

## Acceptance Criteria

- [ ] Decimal point button adds "." to number
- [ ] Can't add multiple decimal points to same number
- [ ] Numbers like 0.5, 3.14, 100.99 work correctly
- [ ] Plus/minus button toggles sign
- [ ] Negative numbers display correctly with - sign
- [ ] 0.1 + 0.2 displays as 0.3 (not 0.30000000004)
- [ ] All arithmetic works with decimals and negatives
- [ ] Trailing zeros removed from results (5.50 → 5.5)

## Verification Steps

### Manual Tests

1. Click "3", ".", "1", "4" - displays "3.14"
2. Click ".", "." again - only one decimal appears
3. Click "0", ".", "5" - displays "0.5"
4. Click "5", "+/-" - displays "-5", click "+/-" again - displays "5"
5. Calculate "-5", "+", "10", "=" - displays "5"
6. Calculate "5.5", "×", "2", "=" - displays "11"
7. Calculate "0.1", "+", "0.2", "=" - displays "0.3" (not 0.30000000004)
8. Calculate "10.50", "+", "0", "=" - displays "10.5" (trailing zero removed)

### Automated Tests

Run: `npm test`

- Decimal input tests pass
- Sign toggle tests pass
- Floating point precision tests pass
- Decimal arithmetic tests pass

## Showcase (3 min)

**Setup**: Open calculator

**Script**:

1. **Decimals**: Click 3, ., 1, 4 → "Decimal numbers now work!"
2. **Demo calculation**: 5.5, +, 2.3, = → Shows 7.8
3. **Show precision**: 0.1, +, 0.2, = → Shows 0.3
   - "We handle floating point precision. No weird 0.30000000004!"
4. **Negatives**: Click 10, +/- → Shows -10
   - "Toggle between positive and negative anytime."
5. **Negative calc**: -5, +, 15, = → Shows 10
   - "Full support for negative number arithmetic."

**Q&A Preview**:

- "Maximum decimal places?" → 10 places with intelligent rounding
- "Can I make result negative?" → Yes! Use +/- after any calculation
- "Scientific notation for huge numbers?" → Future enhancement

**Key Message**: "Real-world calculations now supported with decimals and negatives, including proper floating point handling."

## Files to Modify

- `index.html` - Add . and +/- buttons
- `style.css` - Style new buttons
- `app.js` - Add decimal and sign logic
- `calculator.js` - Add formatResult function
- Tests - Add decimal and negative tests

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] Floating point precision handled
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
