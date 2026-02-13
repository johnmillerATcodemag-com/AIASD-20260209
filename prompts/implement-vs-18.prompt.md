---
slice_id: VS-18
phase: 4
priority: P2
dependencies: VS-03
---

# Prompt: Implement VS-18 - Variable Storage

## Goal

Allow users to store and recall up to 5 named variables (A-E).

## User Story

As a user, I want to save multiple values in named variables for complex multi-step calculations.

## Implementation Steps

1. Add variable buttons (A, B, C, D, E) to UI
2. Implement Store Variable - long-press or menu assigns current value
3. Implement Recall Variable - click button loads value
4. Add visual indicators showing which variables have values
5. Store variables in localStorage
6. Add "Clear All Variables" option
7. Show variable values in tooltip or panel

## Acceptance Criteria

- [ ] 5 variable buttons (A-E) accessible
- [ ] Store current value to variable
- [ ] Recall variable value to display
- [ ] Visual indicator when variable has value
- [ ] Variables persist across sessions
- [ ] Can clear individual or all variables

## Verification Steps

1. Calculate "42", store to A → A indicator shows filled
2. Calculate "100", store to B → B indicator shows filled
3. Clear calculator, recall A → Shows "42"
4. Use in calculation: A + B = → Shows "142"
5. Refresh page → Variables still available

## Showcase (3 min)

- Calculate complex project costs in steps
- Store each subtotal in A, B, C
- Recall and sum: A + B + C
- **Key Message**: "5 memory slots for complex multi-step workflows. Name and organize your values."
