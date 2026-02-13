---
slice_id: VS-14
phase: 3
priority: P1
dependencies: VS-03
---

# Prompt: Implement VS-14 - Undo/Redo Functionality

## Goal

Implement undo (Ctrl+Z) and redo (Ctrl+Y) to reverse and reapply the last 20 operations.

## User Story

As a user, I want to undo mistakes without starting over, and redo if I undo too far.

## Implementation Steps

1. **Implement history stack** (`app.js`)
   - Add undoStack array (max 20 states)
   - Add redoStack array
   - Store complete calculator state snapshots:
     ```javascript
     {
       currentInput, previous Input, operator,
       memoryValue, timestamp
     }
     ```
   - Push state before each operation that changes calculator state

2. **Implement undo function**
   - When Ctrl+Z pressed:
     - Save current state to redoStack
     - Pop last state from undoStack
     - Restore calculator to that state
     - Update display
   - If undoStack empty, do nothing

3. **Implement redo function**
   - When Ctrl+Y pressed:
     - Save current state to undoStack
     - Pop last state from redoStack
     - Restore calculator to that state
     - Update display
   - If redoStack empty, do nothing

4. **Clear redo on new action**
   - Any new operation clears redoStack
   - Only undo clears redo history

5. **Add UI indicators** (optional)
   - Add undo/redo buttons with enabled/disabled states
   - Show number of available undos in tooltip

6. **Add keyboard listeners**
   - Ctrl+Z for undo
   - Ctrl+Y or Ctrl+Shift+Z for redo
   - Prevent default browser behavior

7. **Limit stack size**
   - Keep max 20 states in undoStack
   - Remove oldest when exceeding limit (FIFO)

8. **Add tests**
   - Test undo restores previous state
   - Test redo reapplies undone action
   - Test max 20 states maintained
   - Test redo cleared on new action

## Acceptance Criteria

- [ ] Ctrl+Z undoes last operation
- [ ] Ctrl+Y redoes last undo
- [ ] Maintains last 20 states
- [ ] Redo stack cleared on new operation
- [ ] Undo/redo buttons show enabled/disabled state
- [ ] Memory operations can be undone/redone
- [ ] Works smoothly without lag

## Verification Steps

### Manual Tests

1. Calculate "5 + 3 = 8"
2. Press Ctrl+Z → Returns to "3" (before equals)
3. Press Ctrl+Z → Returns to "+" (before second operand)
4. Press Ctrl+Z → Returns to "5" (before operator)
5. Press Ctrl+Y → Reapplies "+", shows operator state
6. Press Ctrl+Y → Reapplies "3", ready for equals
7. Type "9" (new action) → Can't redo anymore
8. Perform 25 operations, Ctrl+Z repeatedly → Can undo 20 states

### Automated Tests

```javascript
test("Undo restores previous state", () => {
  pushState(); // Save initial
  state.currentInput = "5";
  pushState();
  state.currentInput = "10";

  undo();
  expect(state.currentInput).toBe("5");
});

test("Redo reapplies undone action", () => {
  state.currentInput = "5";
  pushState();
  state.currentInput = "10";
  pushState();

  undo(); // Back to 5
  redo(); // Forward to 10
  expect(state.currentInput).toBe("10");
});

test("New action clears redo stack", () => {
  pushState();
  undo();
  expect(redoStack.length).toBeGreaterThan(0);

  inputDigit("5"); // New action
  expect(redoStack.length).toBe(0);
});

test("Maintains max 20 states", () => {
  for (let i = 0; i < 30; i++) {
    pushState();
  }
  expect(undoStack.length).toBe(20);
});
```

## Showcase (4 min)

**Setup**: Calculator ready

**Script**:

1. **Setup mistake**: "Let me calculate 25 × 4..."
   - Type "25", "×", "9" → "Oops, meant 4"

2. **Undo series**: Press Ctrl+Z
   - "9 disappears, back to just the ×"
   - Press Ctrl+Z again → "× disappears too"
   - "Now I can fix it!"

3. **Correct and continue**: Type "×", "4", "=" → "100"
   - "Fixed without starting over!"

4. **Redo demo**: Press Ctrl+Z 3 times → Back to "25"
   - "Oops, went too far!"
   - Press Ctrl+Y → Steps forward
   - Press Ctrl+Y → Steps forward again
   - "Redo brings it back!"

5. **Complex undo**: Perform multi-step calc with memory
   - 10, MS, +, 5, =, MR, ×, 2, =
   - Undo several steps → "Every operation tracked"
   - Redo forward → "Full control over history"

**Real World Use Cases**:

- "Exploring 'what-if' scenarios"
- "Recovering from mistakes"
- "Comparing different calculations"
- "Learning: see each step forward/backward"

**Q&A Preview**:

- "Does undo work with history?" → Yes! All operations including memory, clear, etc.
- "More than 20 levels?" → 20 is generous and keeps performance smooth. Could make configurable.
- "Can I see the undo history?" → Currently no visual display, just step through. Could add in future.

**Key Message**: "Full editorial control over calculations. Make mistakes fearlessly - undo and redo have you covered."

## Files to Modify

- `app.js` - Implement undo/redo logic and state management

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Undo functioning for all operations
- [ ] Redo functioning correctly
- [ ] Stack limits enforced
- [ ] Tests passing
- [ ] No performance issues
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
