---
slice_id: VS-29
phase: 6
priority: P4
dependencies: VS-01
---

# Prompt: Implement VS-29 - Fraction Mode

## Goal

Native fraction arithmetic support with proper fraction display and operations.

## User Story

As a student or cook, I want to work with fractions naturally without converting to decimals.

## Implementation Steps

1. Add "Fraction" mode toggle
2. Implement fraction input:
   - Numerator/denominator entry
   - Mixed numbers (e.g., 2 1/2)
   - Whole numbers treated as fractions
3. Implement fraction arithmetic:
   - Addition: Find common denominator, add numerators
   - Subtraction: Find common denominator, subtract numerators
   - Multiplication: Multiply numerators and denominators
   - Division: Multiply by reciprocal
4. Automatic simplification (reduce to lowest terms)
5. Convert between mixed numbers and improper fractions
6. Convert to/from decimals
7. Display fractions with proper formatting (using Unicode or HTML)

## Acceptance Criteria

- [ ] Can enter fractions and mixed numbers
- [ ] All fraction operations work correctly
- [ ] Fractions automatically simplified
- [ ] Can toggle between improper and mixed number display
- [ ] Can convert to decimals
- [ ] Proper fraction rendering (not just "1/2" text)
- [ ] Handles edge cases (divide by zero, negative fractions)

## Verification Steps

1. Enter Fraction mode
2. Calculate: 1/2 + 1/3 = 5/6 ✓
3. Calculate: 2/3 × 3/4 = 1/2 ✓ (simplified from 6/12)
4. Calculate: 1/2 ÷ 1/4 = 2 ✓
5. Mixed number: 2 1/2 + 1 1/4 = 3 3/4 ✓
6. Convert: 3/4 to decimal = 0.75
7. Complex: (1/2 + 1/3) × 3 = 2 1/2 ✓
8. Negative: -1/2 + 3/4 = 1/4 ✓

## Showcase (3 min)

- Cooking: "Recipe needs 2/3 cup flour, doubling it → 1 1/3 cups"
- Math homework: "1/2 + 2/3 = ?"
- Show automatic simplification: 6/12 → 1/2
- Mixed numbers: "2 1/4 inches + 3 3/8 inches"
- **Key Message**: "Real fractions, real math. No decimal conversions required."
