---
slice_id: VS-21
phase: 5
priority: P3
dependencies: VS-15
---

# Prompt: Implement VS-21 - Scientific Mode

## Goal

Add scientific calculator mode with trigonometric, logarithmic, and exponential functions.

## User Story

As a user, I want advanced scientific functions for engineering and academic calculations.

## Implementation Steps

1. Add "Scientific Mode" toggle button
2. Extend button grid with scientific functions:
   - Trig: sin, cos, tan, asin, acos, atan
   - Logs: log (base 10), ln (natural log), log₂
   - Exponential: eˣ, 10ˣ, 2ˣ
   - Constants: π, e
   - Angle mode toggle: Degrees/Radians
3. Implement scientific functions in calculator.js
4. Handle domain errors (log of negative, etc.)
5. Add parentheses support for complex expressions
6. Update expression parser for parentheses
7. Add scientific notation display for large/small numbers

## Acceptance Criteria

- [ ] Scientific mode shows additional functions
- [ ] All trig functions work in degrees and radians
- [ ] Logarithmic functions handle errors properly
- [ ] Exponential functions calculate correctly
- [ ] Constants π and e available
- [ ] Parentheses work in expressions
- [ ] Scientific notation for results outside normal range

## Verification Steps

1. Enter Scientific Mode → New buttons appear
2. Calculate sin(30°) = 0.5 (degree mode)
3. Calculate sin(π/6) ≈ 0.5 (radian mode)
4. Calculate ln(e) = 1
5. Calculate log(100) = 2
6. Try log(-1) → Error handled
7. Calculate 2ˣ where x=10 = 1024
8. Use π: 2 × π ≈ 6.283
9. Complex: sin(π/4) × cos(π/4) ≈ 0.5

## Showcase (4 min)

- Toggle Scientific Mode → Interface transforms
- Demonstrate trig: sin(45°) = 0.707
- Show logs: log₁₀(1000) = 3
- Use constants: Calculate circle area with π
- Complex expression with parentheses
- **Key Message**: "From basic to university-grade. Scientific power when you need it."
