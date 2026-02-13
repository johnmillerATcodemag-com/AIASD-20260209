---
slice_id: VS-01
phase: 1
priority: P0
dependencies: none
---

# Prompt: Implement VS-01 - Display & Number Input

## Goal

Create the foundational UI for a web calculator with a display and number buttons (0-9).

## User Story

As a user, I want to see the numbers I press on a clear display so I can verify my input.

## Implementation Steps

1. **Create HTML structure** (`index.html`)
   - Add calculator container with display area
   - Add button grid with number buttons 0-9
   - Include proper semantic HTML and ARIA labels

2. **Style the interface** (`style.css`)
   - Create responsive grid layout (works on 320px+ screens)
   - Style display with large, high-contrast font
   - Style buttons with hover/active states
   - Use modern design (gradients, rounded corners, shadows)

3. **Implement JavaScript logic** (`app.js`)
   - Create state object to track currentInput
   - Add event listeners to number buttons
   - Implement inputDigit(digit) function to append digits
   - Implement updateDisplay() function
   - Handle replacing leading zero (e.g., "0" + "5" = "5", not "05")

## Acceptance Criteria

- [ ] Display shows "0" initially
- [ ] Clicking number buttons appends digits to display
- [ ] Leading zero is replaced by first non-zero digit
- [ ] Layout is responsive (320px to desktop)
- [ ] Buttons have clear hover/focus states
- [ ] ARIA labels are present for accessibility

## Verification Steps

### Manual Tests

1. Open index.html in browser - display shows "0"
2. Click "5" - display shows "5"
3. Click "3", "7" - display shows "537"
4. Refresh page, click "0", then "8" - display shows "8" (not "08")
5. Test responsive: resize browser to 320px, 768px, 1024px - all layouts work
6. Tab through buttons - focus indicator visible

### Automated Tests

Create test file to verify:

- Initial state is "0"
- inputDigit() appends digits correctly
- Leading zero replacement works

## Showcase (3 min)

**Setup**: Open index.html in browser at 1024px width

**Script**:

1. **Show design**: "Here's our modern calculator UI with a clean display and number grid."
2. **Demo input**: Click 5, 3, 7 → "See how numbers append naturally"
3. **Demo leading zero**: Refresh, click 0, 8 → "Leading zeros are handled intelligently"
4. **Show responsive**: Open DevTools, resize to 320px, 768px → "Works beautifully on all devices"
5. **Show accessibility**: Tab through buttons → "Full keyboard navigation support"

**Key Message**: "We have a solid, accessible foundation that all features will build upon."

## Files to Create

- `index.html` - HTML structure
- `style.css` - Styling
- `app.js` - State management and event handling

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Manual verification completed
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Code follows web standards (HTML5, CSS3, modern JavaScript)
- [ ] Showcase script executed successfully
