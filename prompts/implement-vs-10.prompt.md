---
slice_id: VS-10
phase: 2
priority: P1
dependencies: VS-03
---

# Prompt: Implement VS-10 - Memory Functions (MS, MR, MC)

## Goal

Implement basic memory functions: Memory Store (MS), Memory Recall (MR), and Memory Clear (MC).

## User Story

As a user, I want to store a value in memory so I can use it later in different calculations.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add three memory buttons: MS, MR, MC
   - Add memory indicator (shows "M" when memory has value)
   - Position in dedicated memory row or section

2. **Update CSS** (`style.css`)
   - Style memory buttons distinctly
   - Style memory indicator (small "M" badge or icon)
   - Highlight indicator when memory contains value

3. **Implement memory storage** (`app.js`)
   - Add memoryValue to state (initially null)
   - Add hasMemory boolean flag
   - Store memory in localStorage for persistence

4. **Implement MS (Memory Store)** (`app.js`)
   - Add event listener for MS button
   - Store current display value in memoryValue
   - Set hasMemory = true
   - Update memory indicator
   - Save to localStorage

5. **Implement MR (Memory Recall)** (`app.js`)
   - Add event listener for MR button
   - Load memoryValue into display
   - Set as currentInput (can be used in calculations)
   - If no memory, do nothing or show message

6. **Implement MC (Memory Clear)** (`app.js`)
   - Add event listener for MC button
   - Set memoryValue = null
   - Set hasMemory = false
   - Update memory indicator
   - Clear from localStorage

7. **Add visual feedback**
   - Memory indicator appears/disappears based on hasMemory
   - Button states reflect memory status

8. **Add tests**
   - Test MS stores value correctly
   - Test MR recalls stored value
   - Test MC clears memory
   - Test localStorage persistence
   - Test memory persists across page reloads

## Acceptance Criteria

- [ ] MS button stores current display value
- [ ] MR button recalls stored value
- [ ] MC button clears memory
- [ ] Memory indicator shows when memory has value
- [ ] Memory persists across page reloads
- [ ] Memory works with all number types (decimals, negatives)
- [ ] MR with no memory does nothing gracefully
- [ ] Memory value survives calculator clears (C button)

## Verification Steps

### Manual Tests

1. Display shows "42", click MS → Memory indicator appears
2. Do different calculation "5 + 5 = 10"
3. Click MR → Display shows "42" (recalled)
4. Use recalled value: "+ 8 =" → Shows 50
5. Click MC → Memory indicator disappears
6. Click MR → Nothing or message (no memory)
7. Store "3.14", refresh page, click MR → Shows "3.14" (persistent)
8. Store value, click C (clear), click MR → Memory still works

### Automated Tests

```javascript
test("MS stores value in memory", () => {
  state.currentInput = "42";
  memoryStore();
  expect(state.memoryValue).toBe(42);
  expect(state.hasMemory).toBe(true);
});

test("MR recalls memory value", () => {
  state.memoryValue = 42;
  memoryRecall();
  expect(state.currentInput).toBe("42");
});

test("MC clears memory", () => {
  state.memoryValue = 42;
  state.hasMemory = true;
  memoryClear();
  expect(state.memoryValue).toBe(null);
  expect(state.hasMemory).toBe(false);
});
```

## Showcase (3 min)

**Setup**: Calculator ready

**Script**:

1. **Store value**: Calculate 15 × 8 = 120, click MS → "M indicator appears - value stored!"
2. **Do other work**: Calculate 50 + 50 = 100 → "Memory holds 120 while we work."
3. **Recall**: Click MR → Shows 120 → "Instantly recalled."
4. **Use in calc**: ÷ 4 = → Shows 30 → "Memory values work in any calculation."
5. **Survives clear**: Click C, then MR → Still shows 120 → "Memory survives clear button."
6. **Clear memory**: Click MC → M indicator gone → "Clear when done."

**Real World Example**:
"Calculate sales tax on multiple items:

- Item 1: $25 × 1.08 = 27, MS (store tax)
- Item 2: $15 × 1.08 = 16.20, + MR = 43.20 (running total)
- Continue accumulating..."

**Q&A Preview**:

- "Can I have multiple memory slots?" → VS-18 adds variable storage (A-E)
- "M+ and M- buttons?" → Next slice (VS-11) adds memory arithmetic
- "See what's in memory?" → Currently just the indicator. Could add memory display in future.

**Key Message**: "Professional memory functions just like physical calculators. Store, recall, and reuse values efficiently."

## Files to Modify

- `index.html` - Add MS, MR, MC buttons and indicator
- `style.css` - Style memory controls
- `app.js` - Implement memory logic

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Memory persisting in localStorage
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
