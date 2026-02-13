---
slice_id: VS-30
phase: 6
priority: P4
dependencies: VS-21
---

# Prompt: Implement VS-30 - Matrix Calculator

## Goal

Matrix operations for linear algebra (2×2 and 3×3 matrices).

## User Story

As a math/engineering student, I want to perform matrix operations for coursework.

## Implementation Steps

1. Add "Matrix" mode
2. Create matrix input interface:
   - Grid for entering matrix elements
   - Support 2×2 and 3×3 matrices
   - Multiple matrix storage (A, B, C)
3. Implement matrix operations:
   - Addition/Subtraction (same dimensions)
   - Scalar multiplication
   - Matrix multiplication
   - Transpose
   - Determinant
   - Inverse (if exists)
4. Visual matrix display
5. Step-by-step calculation display (optional)
6. Save matrices for repeated operations

## Acceptance Criteria

- [ ] Can enter 2×2 and 3×3 matrices
- [ ] Matrix addition/subtraction works
- [ ] Scalar multiplication works
- [ ] Matrix multiplication calculates correctly
- [ ] Determinant calculation correct
- [ ] Inverse calculation correct (with singular matrix detection)
- [ ] Transpose operation functional
- [ ] Clean matrix display/visualization

## Verification Steps

1. Enter Matrix mode
2. Create matrix A: [[1,2],[3,4]]
3. Create matrix B: [[5,6],[7,8]]
4. Calculate A + B = [[6,8],[10,12]] ✓
5. Calculate A × B = [[19,22],[43,50]] ✓
6. Calculate det(A) = -2 ✓
7. Calculate A⁻¹ = [[-2,1],[1.5,-0.5]] ✓
8. Test 3×3: [[1,0,0],[0,1,0],[0,0,1]] → Identity matrix
9. Transpose: [[1,2],[3,4]]ᵀ = [[1,3],[2,4]] ✓
10. Singular matrix detection: [[1,1],[1,1]] → No inverse

## Showcase (4 min)

- Show matrix input interface
- Enter 2×2 matrices: A and B
- Add matrices → Result displayed
- Multiply matrices → Explain application (transformations)
- Calculate inverse → "Solving systems of equations"
- Determinant → "Is this matrix invertible?"
- **Key Message**: "Linear algebra in your pocket. From homework to machine learning."
- **MILESTONE: Phase 6 (V3.0) Complete! ALL 30 SLICES DONE!**
