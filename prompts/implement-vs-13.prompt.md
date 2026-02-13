---
slice_id: VS-13
phase: 3
priority: P1
dependencies: VS-01
---

# Prompt: Implement VS-13 - Copy/Paste Support

## Goal

Enable users to copy results and paste numbers into the calculator using Ctrl+C and Ctrl+V.

## User Story

As a user, I want to copy calculation results to use in other applications, and paste numbers from other sources into the calculator.

## Implementation Steps

1. **Implement Copy (Ctrl+C)**
   - Add keyboard event listener for Ctrl+C
   - Copy current display value to clipboard using Navigator.clipboard API
   - Add "Copy" button near display for mouse users
   - Show brief confirmation ("Copied!")

2. **Implement Paste (Ctrl+V)**
   - Add keyboard event listener for Ctrl+V
   - Read from clipboard using Navigator.clipboard API
   - Validate pasted content is a valid number
   - Insert into current input or replace display
   - Handle invalid clipboard content gracefully

3. **Add UI elements** (`index.html`)
   - Add copy button (📋 icon) next to display
   - Add paste button or rely on keyboard shortcut
   - Add toast/notification element for feedback

4. **Update CSS** (`style.css`)
   - Style copy button (subtle, non-intrusive)
   - Style toast notification
   - Add copy animation/feedback

5. **Handle permissions**
   - Request clipboard permissions if needed
   - Handle permission denied gracefully
   - Provide fallback for browsers without Clipboard API

6. **Add tests**
   - Test copy functionality (mock clipboard)
   - Test paste with valid numbers
   - Test paste with invalid content (ignored/error)
   - Test keyboard shortcuts work

## Acceptance Criteria

- [ ] Ctrl+C copies current display value
- [ ] Ctrl+V pastes number into calculator
- [ ] Copy button visible and functional
- [ ] Brief confirmation shown on copy
- [ ] Invalid paste content handled gracefully
- [ ] Works with decimals, negatives
- [ ] clipboard permissions handled properly

## Verification Steps

### Manual Tests

1. Calculate "123 + 456 = 579"
2. Press Ctrl+C → Brief "Copied!" message
3. Open notepad, Ctrl+V → "579" pasted
4. Copy "789" in notepad
5. In calculator, press Ctrl+V → "789" appears in display
6. Can continue calculation: "+ 100 =" → "889"
7. Try paste invalid "abc text" → Ignored or friendly error
8. Click copy button → Same as Ctrl+C

### Automated Tests

```javascript
test("Copy puts value in clipboard", async () => {
  state.currentInput = "42";
  await copyToClipboard();
  const clipboardText = await navigator.clipboard.readText();
  expect(clipboardText).toBe("42");
});

test("Paste reads valid number from clipboard", async () => {
  await navigator.clipboard.writeText("789");
  await pasteFromClipboard();
  expect(state.currentInput).toBe("789");
});

test("Paste ignores invalid content", async () => {
  await navigator.clipboard.writeText("not-a-number");
  const before = state.currentInput;
  await pasteFromClipboard();
  expect(state.currentInput).toBe(before); // Unchanged
});
```

## Showcase (3 min)

**Setup**: Calculator and notepad/document open

**Script**:

1. **Copy demo**: Calculate 15 × 27 = 405
   - Press Ctrl+C → "Copied!" appears briefly
   - Switch to document, Ctrl+V → "405 pasted perfectly."

2. **Paste demo**: In document, copy "1234"
   - Switch to calculator, Ctrl+V → "1234 appears"
   - Continue: "÷ 2 =" → "617"

3. **Copy button**: Click 📋 button → "Also works with mouse!"

4. **Invalid paste**: Copy some text"abc"
   - Paste in calculator → "Ignores invalid content safely."

**Real World Use Cases**:

- "Calculate in calculator, copy to spreadsheet"
- "Copy invoice amount from email, paste to calculate"
- "Build formulas elsewhere, paste numbers to verify"
- "Share results in chat/document easily"

**Q&A Preview**:

- "Works on mobile?" → Mobile has native copy/paste gestures that should work
- "Paste full expressions?" → No, just numbers. VS-15 adds expression editing where that might make sense
- "Copy entire history?" → VS-19 adds history export

**Key Message**: "Seamless integration with your workflow. Copy results out, paste data in—no manual retyping."

## Files to Modify

- `index.html` - Add copy button
- `style.css` - Style copy features
- `app.js` - Implement copy/paste logic

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Clipboard API working
- [ ] Tests passing
- [ ] Manual verification completed
- [ ] Works across browsers
- [ ] Showcase script executed successfully
