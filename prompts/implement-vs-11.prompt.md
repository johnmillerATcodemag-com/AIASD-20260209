---
slice_id: VS-11
phase: 2
priority: P1
dependencies: VS-10
---

# Prompt: Implement VS-11 - Memory Arithmetic (M+, M-)

## Goal

Add M+ and M- buttons to add or subtract current display value from memory.

## User Story

As a user, I want to accumulate values in memory so I can sum multiple calculations without manual tracking.

## Implementation Steps

1. **Update HTML** (`index.html`)
   - Add M+ button (Memory Plus)
   - Add M- button (Memory Minus)
   - Position near other memory buttons

2. **Update CSS** (`style.css`)
   - Style M+ and M- buttons consistently with memory buttons

3. **Implement M+ (Memory Plus)** (`app.js`)
   - Add event listener for M+ button
   - Get current display value as number
   - If memory is null/empty, initialize to 0
   - Add current value to memoryValue
   - Set hasMemory = true
   - Update memory indicator
   - Save to localStorage
   - Optional: briefly show updated memory value

4. **Implement M- (Memory Minus)** (`app.js`)
   - Add event listener for M- button
   - Get current display value as number
   - If memory is null/empty, initialize to 0
   - Subtract current value from memoryValue
   - Set hasMemory = true
   - Update memory indicator
   - Save to localStorage

5. **Add visual feedback** (optional enhancement)
   - Briefly flash updated memory value
   - Or add small memory display showing current memory value

6. **Add tests**
   - Test M+ adds to memory
   - Test M- subtracts from memory
   - Test M+ starting with empty memory (initializes to 0)
   - Test accumulation: M+, M+, M+ then MR
   - Test persistence

## Acceptance Criteria

- [ ] M+ button adds current value to memory
- [ ] M- button subtracts current value from memory
- [ ] Works with empty memory (initializes to 0)
- [ ] Multiple M+ operations accumulate correctly
- [ ] Memory value persists in localStorage
- [ ] Works with decimals and negative numbers
- [ ] Can accumulate results from multiple calculations

## Verification Steps

### Manual Tests

1. Clear memory (MC), display shows "10", click M+ → Memory has 10
2. Calculate "5 + 5 = 10", click M+ → Memory now has 20
3. Click MR → Displays "20" (accumulated total)
4. Display "5", click M- → Memory now has 15
5. Click MR → Displays "15"
6. Test empty memory: MC, display "7", click M+ → Memory has 7
7. Accumulate complex: 100 MS, calculate 25, M+, calculate 30, M+, MR → Shows 155

### Automated Tests

```javascript
test("M+ adds to existing memory", () => {
  state.memoryValue = 10;
  state.currentInput = "5";
  memoryPlus();
  expect(state.memoryValue).toBe(15);
});

test("M+ initializes empty memory to 0", () => {
  state.memoryValue = null;
  state.currentInput = "10";
  memoryPlus();
  expect(state.memoryValue).toBe(10);
});

test("M- subtracts from memory", () => {
  state.memoryValue = 20;
  state.currentInput = "8";
  memoryMinus();
  expect(state.memoryValue).toBe(12);
});

test("Multiple M+ operations accumulate", () => {
  state.memoryValue = 0;
  state.currentInput = "5";
  memoryPlus(); // 5
  state.currentInput = "10";
  memoryPlus(); // 15
  state.currentInput = "3";
  memoryPlus(); // 18
  expect(state.memoryValue).toBe(18);
});
```

## Showcase (4 min)

**Setup**: Calculator ready

**Script**:

1. **Setup scenario**: "Let's calculate total expenses for the day."
2. **First item**: "Lunch: $12.50", click M+ → "Added to memory."
3. **Second item**: "Coffee: $5.75", click M+ → "Accumulated."
4. **Third item**: "Parking: $8.00", click M+ → "Running total in memory."
5. **Show total**: Click MR → Shows "26.25" → "Total expenses!"
6. **Deduction**: "Oh, got $5 reimbursed", display "5", click M- → "Subtracted."
7. **Final total**: MR → Shows "21.25" → "Final actual expense."

**Real World Use Case**:
"Perfect for:

- Shopping totals
- Invoice line items
- Expense tracking
- Multi-step calculations
- Running balances"

**Q&A Preview**:

- "Can I see memory value without recalling?" → Could add memory display panel in future enhancement
- "Maximum memory value?" → JavaScript number limits (very large)
- "Round memory automatically?" → Uses same precision as regular calculations

**Key Message**: "Memory arithmetic transforms the calculator into a powerful running total tool. Perfect for real-world accumulation tasks."

## Files to Modify

- `index.html` - Add M+ and M- buttons
- `style.css` - Style new buttons
- `app.js` - Implement M+ and M- logic

## Definition of Done

- [ ] All acceptance criteria met
- [ ] M+ and M- working correctly
- [ ] Tests passing
- [ ] localStorage persistence working
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
