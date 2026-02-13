---
slice_id: VS-01
phase: 1
priority: P0
dependencies: none
---

# Prompt: Implement VS-01 - Display Current Value

## Goal

Create the foundational display component that shows the current calculator value and updates when state changes. This is a read-only query slice that forms the foundation for all calculator interactions.

## User Story

As a user, I want to see the numbers I input and calculation results so that I can verify my entries and view outcomes.

## Implementation Steps

1. **Create HTML structure** (`index.html`)
   - Add calculator container with display area
   - Use semantic HTML with proper ARIA attributes
   - Include `role="status"` and `aria-live="polite"` for accessibility
   - Structure: calculator container > display wrapper > value span

2. **Style the display** (`style.css`)
   - Use monospace font for number clarity (minimum 2rem/32px)
   - Right-align text for natural number display
   - High contrast background/text (minimum 4.5:1 WCAG AA)
   - Add visual separation border from button area
   - Ensure readability at 200% zoom
   - Make display responsive (works from 320px+ screens)

3. **Implement state management** (`app.js`)
   - Create `calculatorState` object with:
     - `currentValue` (string, defaults to "0")
     - `displayError` (boolean, defaults to false)
   - Implement `updateDisplay()` function that:
     - Reads `calculatorState.currentValue`
     - Checks `calculatorState.displayError` for error state
     - Renders "0" if currentValue is empty
     - Formats and truncates long numbers gracefully
     - Updates DOM element with formatted value

4. **Implement number formatting logic**
   - Handle empty string → display "0"
   - Truncate numbers exceeding display width (e.g., 16+ digits)
   - Format error messages clearly
   - Preserve decimal places in display

## Acceptance Criteria

- [ ] Display shows "0" on initial page load
- [ ] Display updates to show `currentValue` from calculator state
- [ ] Display has minimum font size of 24px (2rem = 32px preferred)
- [ ] Display has 4.5:1 contrast ratio minimum (WCAG 2.1 AA)
- [ ] Long numbers (16+ digits) are truncated or formatted gracefully
- [ ] Error messages display clearly when `displayError` is true
- [ ] Display is readable from 2 feet away
- [ ] Display remains readable at 200% zoom
- [ ] ARIA attributes present (`role="status"`, `aria-live="polite"`)

## Verification Steps

### Manual Tests

1. Open index.html in browser - display shows "0"
2. Use browser console to set `calculatorState.currentValue = "42"` and call `updateDisplay()` - display shows "42"
3. Set `currentValue = "0.123"` - display shows "0.123"
4. Set `currentValue = "12345678901234567890"` (20 digits) - display truncates gracefully
5. Set `displayError = true` and `currentValue = "Error"` - display shows error message
6. Use browser zoom to 200% - display remains readable
7. Tab to display area - screen reader announces status updates

### Automated Tests

Create test file (`app.test.js`) to verify:

```javascript
// Test cases from VS-01 spec
// TC-V1-01: Empty currentValue displays "0"
// TC-V1-02: currentValue "42" displays "42"
// TC-V1-03: currentValue "0.123" displays "0.123"
// TC-V1-04: Long numbers truncate gracefully
// TC-V1-05: Error state displays error message
// TC-V1-06: Screen reader announces value changes
// TC-V1-07: Display readable at various zoom levels
```

### Accessibility Tests

1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Verify display announces value changes
3. Use WebAIM Contrast Checker to validate 4.5:1 ratio
4. Test at 200% browser zoom

## Showcase (3 min)

**Setup**: Open index.html in browser at 1024px width, open browser console

**Script**:

1. **Show initial state**: "Here's our calculator display showing the default '0' value."
2. **Demo state updates**: Open console, run `calculatorState.currentValue = "123"; updateDisplay();` → "The display updates reactively when state changes"
3. **Demo long numbers**: Set `currentValue = "12345678901234567890"` → "Long numbers are handled gracefully with truncation"
4. **Show accessibility**: Open DevTools Accessibility panel → "Notice the ARIA role='status' and aria-live='polite' attributes"
5. **Demo zoom**: Zoom to 200% → "Display remains readable at high zoom levels, meeting accessibility standards"

**Key Message**: "We have a solid, accessible foundation display that reads calculator state and announces changes to screen readers. This is the foundation all features will build upon."

## Files to Create

- `index.html` - HTML structure with display component
- `style.css` - Display styling with accessibility compliance
- `app.js` - State object and updateDisplay() function
- `app.test.js` - Unit tests for display logic (optional but recommended)

## Technical Notes

**State Object Structure:**
```javascript
const calculatorState = {
  currentValue: "0",      // Current display value (string)
  displayError: false     // Whether to show error message
};
```

**updateDisplay() Function:**
```javascript
function updateDisplay() {
  const displayElement = document.getElementById('display');
  const valueSpan = displayElement.querySelector('.display__value');

  // Read state
  let value = calculatorState.currentValue;
  const isError = calculatorState.displayError;

  // Apply rendering logic
  if (isError) {
    valueSpan.textContent = value; // Show error message
    displayElement.classList.add('display--error');
  } else if (!value || value === "") {
    valueSpan.textContent = "0"; // Default to zero
    displayElement.classList.remove('display--error');
  } else {
    // Truncate if too long (e.g., max 16 characters)
    if (value.length > 16) {
      value = value.substring(0, 16) + "…";
    }
    valueSpan.textContent = value;
    displayElement.classList.remove('display--error');
  }
}
```

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Passes WebAIM contrast checker (4.5:1 minimum)
- [ ] Screen reader announces display updates
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Display is responsive (320px to desktop)
- [ ] Showcase script executed successfully
- [ ] Unit tests pass (if implemented)

## Dependencies

**This slice has NO dependencies** - it is the foundational slice that all other slices depend on.

## Next Steps

After VS-01 is complete, proceed to:
- **VS-02**: Input Digit - Add number button input functionality
- **VS-03**: Select Operation - Add operation buttons
