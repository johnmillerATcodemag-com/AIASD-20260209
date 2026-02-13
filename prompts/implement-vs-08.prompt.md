---
slice_id: VS-08
phase: 1
priority: P0
dependencies: VS-01, VS-02, VS-03, VS-04, VS-05, VS-06, VS-07
---

# Prompt: Implement VS-08 - Responsive Layout (Cross-Cutting)

## Goal

Implement mobile-first responsive design that adapts the calculator layout across all device sizes (320px to desktop 2560px+). Refine and optimize the responsive layout so it works on smallest mobile through large desktop.

## User Story

As a user on any device (mobile, tablet, desktop), I want the calculator to display properly, so that I can use it comfortably on my device.

## Technical Requirements (from slice)

**Viewport breakpoints:**

- **Mobile**: 320px–767px (base styles, portrait priority)
- **Tablet**: 768px–1023px (larger touch targets)
- **Desktop**: 1024px+ (mouse-optimized, larger display)

**Mobile-first CSS** – Implement or align with this spec in `style.css`:

```css
/* Base (Mobile): 320px+ */
.calculator {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
}

.calculator__display {
  font-size: 2rem;
  padding: 1rem;
}

.btn {
  min-height: 44px;
  min-width: 44px;
  font-size: 1.25rem;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .calculator {
    max-width: 400px;
  }

  .calculator__display {
    font-size: 2.5rem;
  }

  .btn {
    min-height: 60px;
    font-size: 1.5rem;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .calculator {
    max-width: 450px;
  }

  .calculator__display {
    font-size: 3rem;
  }

  .btn {
    min-height: 70px;
    font-size: 1.75rem;
  }
}
```

**Grid layout:** Standard calculator layout is a 4×5 grid. Ensure CSS Grid (or equivalent) matches this structure:

```
[  7  ][  8  ][  9  ][ ÷  ]
[  4  ][  5  ][  6  ][ ×  ]
[  1  ][  2  ][  3  ][ −  ]
[  0  ][  .  ][ ⌫  ][ +  ]
[    C    ]   [   =   ]
```

## Implementation Steps

1. **Create mobile-first base CSS**
   - Base styles for 320px+ (no min-width media query for default)
   - Implement CSS Grid button layout (4×5) in `style.css`
   - Ensure calculator, display, and buttons match the slice spec above

2. **Define media queries for tablet and desktop**
   - Tablet: `min-width: 768px` (max-width 400px for calculator, larger display and buttons)
   - Desktop: `min-width: 1024px` (max-width 450px, larger display and buttons)
   - Add max-width for very large screens (e.g. 2560px+) if needed to prevent over-stretching

3. **Ensure minimum 44×44px touch targets**
   - All interactive elements ≥44×44px on all devices
   - Adjust spacing so adjacent taps do not overlap

4. **Orientation and zoom**
   - Test portrait and landscape; use orientation media queries if necessary
   - Validate text scalability and readability at 200% zoom

5. **Accessibility**
   - Focus indicators visible at all sizes
   - WCAG 2.1 AA compliance verified (use WCAG tools)
   - ARIA labels and keyboard navigation functional at all breakpoints

6. **Cross-browser and performance**
   - Test on Chrome, Firefox, Safari, Edge (desktop and mobile where applicable)
   - Minimize CSS where possible; optimize assets; test on slow 3G if applicable
   - Optional: subtle hover effects on desktop (not required on touch)

7. **Audit and refine**
   - Test at 320px, 375px, 768px, 1024px, 1440px, 2560px
   - Verify no horizontal scrolling at any size
   - Refine breakpoints and spacing based on testing

## Acceptance Criteria

- [ ] Works on 320px minimum viewport (smallest mobile)
- [ ] Works on 375px viewport (common mobile)
- [ ] Works on 768px viewport (tablet)
- [ ] Works on 1024px+ viewport (desktop)
- [ ] No horizontal scrolling at any size
- [ ] Touch targets ≥44×44px on all devices
- [ ] Portrait and landscape orientations both work
- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] WCAG 2.1 AA compliance verified
- [ ] Focus indicators visible
- [ ] Readable at 200% zoom
- [ ] Text readable at all breakpoints; buttons properly sized and spaced

## Implementation Checklist

- [ ] Create mobile-first base CSS
- [ ] Implement CSS Grid button layout (4×5)
- [ ] Define media queries for tablet (768px+) and desktop (1024px+)
- [ ] Ensure minimum 44×44px touch targets
- [ ] Test on physical devices (if available)
- [ ] Test on browser DevTools responsive mode
- [ ] Test portrait and landscape orientations
- [ ] Verify no horizontal scrolling at any size
- [ ] Validate text scalability
- [ ] Test zoom levels up to 200%
- [ ] Verify accessibility with WCAG tools
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

## Verification Steps

### Critical Test Cases (from slice)

| Test Case | Viewport Size             | Expected Behavior                     | Test Type     |
| --------- | ------------------------- | ------------------------------------- | ------------- |
| TC-V8-01  | 320×568 (iPhone SE)       | Calculator fits, no horizontal scroll | Visual        |
| TC-V8-02  | 375×667 (iPhone 8)        | Buttons min 44×44px, touch-friendly   | Visual        |
| TC-V8-03  | 768×1024 (iPad portrait)  | Layout optimized for tablet           | Visual        |
| TC-V8-04  | 1024×768 (iPad landscape) | Layout adapts to landscape            | Visual        |
| TC-V8-05  | 1920×1080 (Desktop)       | Calculator centered, appropriate size | Visual        |
| TC-V8-06  | 3840×2160 (4K)            | Display remains readable              | Visual        |
| TC-V8-07  | Rotate device             | Layout adapts without breaking         | Visual        |
| TC-V8-08  | Zoom to 200%              | Content remains accessible            | Accessibility |

### Manual Testing - Screen Sizes

- [ ] iPhone SE (320×568) – portrait & landscape
- [ ] iPhone 8 / 14 (375×667, 390×844) – portrait & landscape
- [ ] iPad Mini (768×1024) – portrait & landscape
- [ ] iPad Pro (1024×1366) – portrait & landscape
- [ ] Desktop 1080p (1920×1080), 2K (2560×1440), 4K (3840×2160)

### Manual Testing - Browsers

- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Edge (desktop)

### Lighthouse (optional targets)

- [ ] Mobile performance score > 90
- [ ] Desktop performance score > 95
- [ ] Accessibility score = 100
- [ ] Best practices score > 90

## Showcase (5 min)

**Setup**: Multiple devices/windows ready

**Script**:

1. **Phone**: Show on actual device or emulator – "Perfect on mobile; buttons easy to tap, text clear." Rotate to landscape – "Works in both orientations."
2. **Tablet**: "Optimized for tablet; makes good use of the space."
3. **Desktop**: "Professional on desktop without over-stretching." Optional: hover effects.
4. **Resize**: DevTools responsive – drag 320px to 2560px; "Seamless scaling, no awkward breakpoints."
5. **Accessibility**: Tab through at different sizes – "Focus indicators and keyboard navigation at every size."

**Key Message**: "Production-quality responsive design. Works on any device your users have."

## Files to Modify

- `style.css` – Mobile-first responsive CSS, grid layout, media queries

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All critical test cases (TC-V8-01 through TC-V8-08) verified
- [ ] Tested on real devices and/or emulators
- [ ] No horizontal scroll at any size; touch targets ≥44×44px; readable at 200% zoom
- [ ] WCAG 2.1 AA verified; tested on Chrome, Firefox, Safari, Edge
- [ ] Manual verification and showcase completed
- [ ] **MILESTONE: Phase 1 (MVP) Complete!**
