---
slice_id: VS-18
phase: 4
priority: P2
dependencies: VS-03
---

# Prompt: Implement VS-18 - Variable Storage

## Goal

Allow users to store and recall up to 20 named variables with custom names.

## User Story

As a user, I want to store values as named variables so that I can reference them in complex calculations.

## Implementation Steps

1. **Create variable management UI**
   - Add "Store Variable" button/menu
   - Add variable name input field
   - Create variable list panel showing saved variables
   - Add "Recall" and "Delete" buttons for each variable

2. **Implement variable storage logic**
   - Create `variableState` object to manage variables
   - Implement `saveVariable(name, value)` function
   - Implement `recallVariable(name)` function
   - Implement `deleteVariable(name)` function
   - Validate variable names (alphanumeric, max 20 chars)
   - Enforce maximum of 20 variables

3. **Add localStorage persistence**
   - Save variables to localStorage on changes
   - Load variables on page load
   - Handle localStorage quota exceeded

4. **Create variable UI panel**
   - Display list of saved variables with names and values
   - Show "Save Variable" interface
   - Add quick-access buttons for common variables (optional: A-E presets)
   - Include "Clear All Variables" button

5. **Implement variable operations**
   - Store current display value to named variable
   - Recall variable value to display
   - Use variables in calculations
   - Display variable count (e.g., "5/20 variables used")

## Acceptance Criteria

- [ ] Can save current value to named variable
- [ ] Can recall variable by name
- [ ] Variable list displayed with names and values
- [ ] Can delete individual variables
- [ ] Variables persist in localStorage across sessions
- [ ] Variable names are validated (alphanumeric, reasonable length)
- [ ] Maximum 20 variables enforced
- [ ] Shows variable count (e.g., "12/20")
- [ ] Optional: Quick-access buttons for preset variables (A-E)
- [ ] Can clear all variables at once

## Verification Steps

1. Calculate "42", store as "subtotal1" → Variable list shows "subtotal1: 42"
2. Calculate "100", store as "subtotal2" → Variable list shows both variables
3. Clear calculator, recall "subtotal1" → Shows "42"
4. Manually enter values and recall: recall "subtotal1" + recall "subtotal2" = → Shows "142"
5. Refresh page → Variables still available in list
6. Try to save 21st variable → Error message "Maximum 20 variables reached"
7. Delete a variable → Removed from list
8. Clear all variables → List empties

## Showcase (3 min)

- Calculate complex project costs in steps
- Store each subtotal with descriptive names: "labor", "materials", "overhead"
- Recall and sum: "labor" + "materials" + "overhead"
- Show variable list with all 3 stored values
- **Key Message**: "Store up to 20 named variables for complex multi-step workflows. Give them meaningful names and organize your calculations."
