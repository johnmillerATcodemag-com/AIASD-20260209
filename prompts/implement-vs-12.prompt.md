---
slice_id: VS-12
phase: 2
priority: P2
dependencies: VS-04
---

# Prompt: Implement VS-12 - Advanced Operations

## Goal

Add advanced mathematical operations: percentage (%), square root (√), and square (x²).

## User Story

As a user, I want access to advanced math functions so I can perform more complex calculations without switching tools.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add button for % (percentage)
   - Add button for √ (square root)
   - Add button for x² (square)
   - Create "advanced" button row or section
   - Note: Reciprocal (1/x) is optional and can be added as an enhancement

2. **Update CSS** (`style.css`)
   - Style advanced operation buttons
   - Differentiate from basic operators
   - Consider secondary color scheme

3. **Implement in calculator.js**
   - Add percentage(value, base) function:
     - For "what is 15% of 200": percentage(15, 200) = 30
     - Handle contextual percentage (in calc: 200 + 15% = 230)
   - Add squareRoot(value) function:
     - Return Math.sqrt(value)
     - Throw error for negative numbers
   - Add square(value) function:
     - Return value \* value or Math.pow(value, 2)
   - Export all functions
   - Optional: Add reciprocal(value) function if desired

4. **Implement UI handlers in app.js**
   - Add event listeners for advanced operation buttons
   - Implement percentage logic (contextual based on pending operation)
   - Implement unary operation handler for √, x²:
     - Apply immediately to current display value
     - Update display with result
     - Can be used in further calculations
   - Handle errors (√ of negative, 1/0)

5. **Handle percentage context**
   - If pending operation: 100 + 20% = 120 (adds 20% of 100)
   - No pending operation: 20% = 0.2 (convert to decimal)
   - 100 - 15% = 85 (subtracts 15% of 100)

6. **Add tests**
   - Test percentage calculations
   - Test square root (including negative error)
   - Test square
   - Test reciprocal (including zero error)
   - Test using results in further calculations

## Acceptance Criteria

- [ ] % button calculates percentages contextually
- [ ] √ button calculates square root
- [ ] x² button squares the number
- [ ] 1/x button calculates reciprocal
- [ ] √ of negative shows error
- [ ] 1/0 shows error
- [ ] Results can be used in further calculations
- [ ] All functions tested and working

## Verification Steps

### Manual Tests

**Percentage:**

1. "100", "+", "20", "%" → Shows 20 (20% of 100)
2. Continue to "=" → Shows 120
3. "200", "-", "15", "%" → Shows 30 (15% of 200)
4. Continue to "=" → Shows 170
5. "20", "%" → Shows 0.2 (percent as decimal)

**Square Root:**

1. "144", "√" → Shows 12
2. "2", "√" → Shows " ~1.414
3. "-9", "√" → Shows error

**Square:**

1. "5", "x²" → Shows 25
2. "0.5", "x²" → Shows 0.25
3. "-3", "x²" → Shows 9

**Reciprocal:**

1. "4", "1/x" → Shows 0.25
2. "0.5", "1/x" → Shows 2
3. "0", "1/x" → Shows error

**Chaining:**

1. "4", "√", "+", "2", "=" → Shows 4 (√4=2, 2+2=4)
2. "5", "x²", "×", "2", "=" → Shows 50 (5²=25, 25×2=50)

### Automated Tests

```javascript
test("Percentage calculates correctly", () => {
  expect(percentage(20, 100)).toBe(20); // 20% of 100
  expect(percentage(15, 200)).toBe(30); // 15% of 200
});

test("Square root calculates correctly", () => {
  expect(squareRoot(144)).toBe(12);
  expect(squareRoot(2)).toBeCloseTo(1.414, 2);
});

test("Square root throws error for negative", () => {
  expect(() => squareRoot(-9)).toThrow();
});

test("Square calculates correctly", () => {
  expect(square(5)).toBe(25);
  expect(square(-3)).toBe(9);
});

test("Reciprocal calculates correctly", () => {
  expect(reciprocal(4)).toBe(0.25);
  expect(reciprocal(0.5)).toBe(2);
});

test("Reciprocal throws error for zero", () => {
  expect(() => reciprocal(0)).toThrow();
});
```

## Showcase (5 min)

**Setup**: Calculator ready

**Script**:

1. **Percentage - tip calc**: "Bill is $50, want to tip 20%"
   - Click 50, ×, 20, % → Shows 10
   - = → Shows 500 (wait, that's wrong!)
   - _Correct to_: 50, +, 20, % → Shows 10
   - = → Shows 60 → "Total with tip!"

2. **Square root**: "Find side of square with area 144"
   - 144, √ → Shows 12 → "Each side is 12 units."

3. **Square**: "Area of 7×7 square"
   - 7, x² → Shows 49 → "49 square units."

4. **Reciprocal**: "Cookies recipe for 4, have 2"
   - 4, 1/x → Shows 0.25
   - × recipe amounts → "Scale recipe by 0.25"

5. **Error handling**: Try √ of -9 → Error message → "Handles impossible operations gracefully."

**Real World Use Cases**:

- "Discounts: Original price," - X%, "= sale price"
- "Tips: Bill amount, +, tip%, "= total"
- Measurements and conversions"
- "Recipe scaling with reciprocals"

**Q&A Preview**:

- "Why not more functions (sin, cos, log)?" → Scientific mode (VS-21) adds those
- "Cube and higher powers?" → Future enhancement or use x² repeatedly
- "Percentage of percentage?" → Yes! Just chain: 100 + 10% = 110, - 5% = ...

**Key Message**: "From basic to advanced in one slice. Now handles real-world scenarios like tips, discounts, and measurements."

## Files to Modify

- `index.html` - Add advanced operation buttons
- `style.css` - Style advanced buttons
- `calculator.js` - Add advanced math functions
- `app.js` - Add UI handlers
- `calculator.test.js` - Add tests

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All four operations working
- [ ] Error handling correct
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
- [ ] **MILESTONE: Phase 2 (V1.1) Complete!**
