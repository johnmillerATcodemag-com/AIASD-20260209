# Web Calculator - User Guide

## 🧮 Calculator Layout

```
┌─────────────────────────────────┐
│         Display: 0              │
├─────────────────────────────────┤
│   C    │   ⌫    │               │
├────────┼────────┼────────┼──────┤
│   7    │   8    │   9    │  ÷   │
├────────┼────────┼────────┼──────┤
│   4    │   5    │   6    │  ×   │
├────────┼────────┼────────┼──────┤
│   1    │   2    │   3    │  −   │
├────────┼────────┼────────┼──────┤
│      0       │   .    │  +   │
├──────────────┴────────┴──────┤
│              =                 │
└────────────────────────────────┘
```

## 📋 Button Reference

### Number Buttons
- **0-9**: Input digits
- **.**: Decimal point (only one per number)

### Operation Buttons
- **+**: Addition
- **−**: Subtraction (proper minus symbol)
- **×**: Multiplication (proper times symbol)
- **÷**: Division (proper division symbol)

### Function Buttons
- **=**: Calculate result (green)
- **C**: Clear everything (red, double-width)
- **⌫**: Delete last digit (orange, double-width)

## ⌨️ Keyboard Shortcuts

| Key | Function | Visual Button |
|-----|----------|---------------|
| `0` - `9` | Input digits | Number buttons |
| `.` | Decimal point | . button |
| `+` | Addition | + button |
| `-` | Subtraction | − button |
| `*` | Multiplication | × button |
| `/` | Division | ÷ button |
| `Enter` | Calculate | = button |
| `=` | Calculate | = button |
| `Escape` | Clear all | C button |
| `Backspace` | Delete last digit | ⌫ button |
| `Delete` | Delete last digit | ⌫ button |

## 🎯 How to Use

### Basic Calculation
1. Click number buttons to enter first number (e.g., **5**)
2. Click an operator (e.g., **+**)
3. Enter second number (e.g., **3**)
4. Click **=** or press **Enter**
5. Result displays (e.g., **8**)

**Example**: `5` `+` `3` `=` → **8**

### With Keyboard
1. Type: `5` `+` `3`
2. Press: `Enter`
3. Result: **8**

### Decimal Numbers
- Click `.` to add decimal point
- Example: `3` `.` `1` `4` → **3.14**
- Only one decimal allowed per number

### Clear Calculator
- **C button** or **Escape key** - Clears everything
- Resets to initial state (0)

### Delete Last Digit
- **⌫ button** or **Backspace key** - Removes last digit
- Useful for correcting typos
- Example: `129` → `⌫` → `12` → `8` → **128**

### Chaining Calculations
Results automatically chain to next calculation:
- `5` `+` `3` `=` → **8**
- `+` `2` `=` → **10** (uses previous result)
- `×` `2` `=` → **20** (continues chaining)

## 💡 Tips & Tricks

### Leading Zeros
- Typing `0` `7` automatically becomes `7`
- Exception: `0` `.` `5` stays as `0.5`

### Maximum Length
- Numbers limited to 15 digits
- Extra digits are ignored
- Very large results shown in scientific notation

### Decimal Precision
- Up to 10 decimal places
- **0.1 + 0.2 correctly displays 0.3** (not 0.30000000000000004)
- Trailing zeros removed (5.50 → 5.5)

### Error Messages
- **Division by zero**: Shows error message in red
- **Invalid input**: Displays error
- **Recovery**: Press C or Escape to clear errors

## ⚡ Quick Examples

### Simple Math
```
5 + 3 = 8
10 - 4 = 6
7 × 6 = 42
20 ÷ 4 = 5
```

### Decimals
```
3.14 + 1.5 = 4.64
0.5 × 4 = 2
10 ÷ 3 = 3.3333333333
```

### Negatives
```
5 - 10 = -5
-5 + 15 = 10
```

### Precision Test
```
0.1 + 0.2 = 0.3 ✓ (handled correctly!)
```

### Chaining
```
5 + 3 = 8
+ 2 = 10
× 3 = 30
÷ 5 = 6
```

### Error Handling
```
10 ÷ 0 = "Cannot divide by zero"
(Press C to clear)
```

## 🛠️ Troubleshooting

### Calculator not responding
- **Check console**: Open browser DevTools (F12)
- **Refresh page**: Ctrl+R or Cmd+R
- **Clear cache**: Hard refresh Ctrl+Shift+R

### Display shows wrong value
- **Press C** to clear and start fresh
- Check you're using operators correctly

### Keyboard not working
- **Click calculator**: Make sure page has focus
- **Check key**: Some keys may be browser shortcuts

### Buttons too small on mobile
- **Zoom in**: Pinch to zoom
- All buttons are 44×44px minimum (touch-friendly)

## ♿ Accessibility

### Screen Reader Support
- Display has `role="status"`
- Updates announced with `aria-live="polite"`
- All buttons have descriptive labels

### Keyboard Navigation
- **Tab**: Move between buttons
- **Shift+Tab**: Move backward
- **Space/Enter**: Activate focused button
- **Arrow keys**: Navigate (browser default)

### Visual
- High contrast display (4.5:1 ratio minimum)
- Large font size (32px display, 20px buttons)
- Clear focus indicators
- Works at 200% zoom

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Mobile Chrome | Latest | ✅ Full support |
| Mobile Safari | Latest | ✅ Full support |

## 📱 Mobile Usage

### Portrait Mode
- Buttons optimized for thumb reach
- Display large and clear
- Works from 320px width (iPhone SE)

### Landscape Mode
- Automatically adapts
- More comfortable for tablets

### Touch Gestures
- **Tap**: Activate button
- **Visual feedback**: Button animation on tap

## 🎓 Features Explained

### awaitingOperand Flag
When you press an operator, the calculator sets `awaitingOperand = true`. This means:
- Next digit **replaces** the display (doesn't append)
- Example: `5` `+` (awaiting) `3` → Display shows `3` (not `53`)

### Result Chaining
After pressing `=`, the result stays and `awaitingOperand = true`:
- You can immediately use it in next calculation
- Or start fresh by typing a new number

### Smart Leading Zeros
- `0` `7` → `7` (removed)
- `0` `.` `5` → `0.5` (kept)
- Makes input feel natural

## 📊 Technical Specs

- **Max digits**: 15
- **Decimal precision**: 10 places
- **Display width**: 16 characters max
- **Operations**: +, -, ×, ÷
- **Error handling**: Division by zero
- **Floating point**: Precision-corrected

## 🆘 Common Questions

**Q: Why does 0.1 + 0.2 = 0.3 and not 0.30000000000000004?**
A: We round to 10 decimal places to fix JavaScript's floating point issues.

**Q: Can I do 5 + 3 × 2?**
A: Not yet! That requires PEMDAS (order of operations), which is a future enhancement. Currently it calculates left-to-right.

**Q: Can I use parentheses?**
A: Not in MVP. Future enhancement.

**Q: How do I calculate percentages?**
A: That's in VS-12 (Advanced Operations), coming soon!

**Q: Can I see my calculation history?**
A: That's in VS-09 (Calculation History), future enhancement.

## 🎉 Enjoy!

You now have a fully functional, accessible, keyboard-friendly calculator.

**Try it out and let the calculations begin!** 🧮✨
