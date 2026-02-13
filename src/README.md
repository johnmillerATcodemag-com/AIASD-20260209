# Web Calculator - MVP Implementation

## Overview

This is the complete MVP implementation of the Web Calculator, implementing vertical slices VS-01 through VS-07.

## Implementation Status

### ✅ Implemented Slices

- **VS-01: Display Current Value** ✅
  - Display component with ARIA attributes
  - State management
  - Error handling
  - Number truncation for long values

- **VS-02: Input Digit & Decimal Point** ✅
  - Number buttons (0-9)
  - Decimal point button
  - Leading zero handling
  - Maximum length enforcement (15 digits)
  - Keyboard support (0-9, .)

- **VS-03: Select Operation** ✅
  - Four operators (+, -, ×, ÷)
  - Operator state management
  - Visual feedback (active state)
  - Keyboard support (+, -, *, /)

- **VS-04: Calculate Result** ✅
  - Equals button
  - All four arithmetic operations
  - Floating point precision (0.1 + 0.2 = 0.3)
  - Division by zero error handling
  - Result chaining
  - Keyboard support (Enter, =)

- **VS-05: Clear Calculator State** ✅
  - Clear button (C)
  - Resets all state
  - Clears error states
  - Keyboard support (Escape)

- **VS-06: Delete Last Digit** ✅
  - Delete/Backspace button (⌫)
  - Removes last character
  - Keyboard support (Backspace, Delete)

- **VS-07: Keyboard Input Support** ✅
  - Complete keyboard shortcuts
  - All operations available via keyboard
  - Visual feedback on key press
  - Focus management

## File Structure

```
src/
├── index.html       # HTML structure with calculator UI
├── style.css        # Complete styling (mobile-first, responsive)
├── app.js           # Calculator logic (VS-01 through VS-07)
└── README.md        # This file
```

## Features

### Core Functionality
- ✅ Display with ARIA support
- ✅ Number input (0-9, decimal)
- ✅ Four operations (+, -, ×, ÷)
- ✅ Equals/Calculate
- ✅ Clear
- ✅ Backspace/Delete
- ✅ Full keyboard support

### Accessibility
- ✅ ARIA labels and roles
- ✅ `role="status"` on display
- ✅ `aria-live="polite"` for screen readers
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Touch targets (44×44px minimum)
- ✅ High contrast support

### Quality
- ✅ Floating point precision handling
- ✅ Error messages (division by zero)
- ✅ Leading zero removal
- ✅ Number truncation for long values
- ✅ Responsive design (320px to desktop)
- ✅ Cross-browser compatible

## How to Run

### Option 1: Open Directly
Simply open `index.html` in a web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
cd src
python -m http.server 8000

# Using Node.js
cd src
npx http-server

# Then open http://localhost:8000 in your browser
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Input digits |
| `.` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `Enter` or `=` | Calculate result |
| `Escape` | Clear calculator |
| `Backspace` or `Delete` | Delete last digit |

## Testing

### Manual Test Cases

**VS-01: Display**
- [x] Display shows "0" initially
- [x] Display updates with numbers
- [x] Long numbers truncated

**VS-02: Input**
- [x] Click number buttons → appends digits
- [x] Leading zero removed (07 → 7)
- [x] Decimal point works (0.5)
- [x] Only one decimal allowed
- [x] Keyboard input works

**VS-03: Operations**
- [x] Click operators → stores operation
- [x] Operator buttons highlight
- [x] Keyboard operators work

**VS-04: Calculate**
- [x] 5 + 3 = 8
- [x] 10 - 4 = 6
- [x] 7 × 6 = 42
- [x] 20 ÷ 4 = 5
- [x] 10 ÷ 0 → Error
- [x] 0.1 + 0.2 = 0.3 (not 0.30000000000000004)
- [x] Enter key works

**VS-05: Clear**
- [x] C button clears everything
- [x] Escape key works
- [x] Works from any state

**VS-06: Delete**
- [x] ⌫ button deletes last digit
- [x] Backspace key works
- [x] Delete key works

**VS-07: Keyboard**
- [x] All numbers via keyboard
- [x] All operators via keyboard
- [x] Enter for equals
- [x] Escape for clear
- [x] Backspace for delete

## Browser Support

Tested and working in:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Code Organization

### State Management
All calculator state is managed in a single `calculatorState` object:
```javascript
{
  currentValue: '0',       // What's shown on display
  displayError: false,     // Error state flag
  previousValue: null,     // First operand
  operation: null,         // Selected operation
  awaitingOperand: false   // Whether next digit starts new number
}
```

### Function Structure
- `updateDisplay()` - Updates UI from state (VS-01)
- `handleDigitInput()` - Digit input logic (VS-02)
- `handleDecimalInput()` - Decimal logic (VS-02)
- `handleOperatorInput()` - Operator selection (VS-03)
- `calculate()` - Arithmetic engine (VS-04)
- `handleEquals()` - Equals logic (VS-04)
- `clearCalculator()` - Clear state (VS-05)
- `deleteLastDigit()` - Backspace logic (VS-06)
- Keyboard event handlers (VS-07)

## Next Steps (Future Enhancements)

The following slices can be implemented next:

- **VS-08**: Responsive Layout Polish (already included in CSS)
- **VS-09**: Calculation History
- **VS-10**: Memory Functions (M+, M-, MR, MC)
- **VS-12**: Advanced Operations (%, √, x²)
- **VS-17**: Progressive Web App (PWA)

## Known Limitations

- Max 15 digits display
- No parentheses support
- No multi-operation expressions (PEMDAS)
- No expression history
- No memory functions yet

These are intentional MVP limitations that will be addressed in future slices.

## Credits

Built following the Vertical Slice Architecture approach.
Implements slices VS-01 through VS-07 from the specification.
