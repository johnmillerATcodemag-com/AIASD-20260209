---
slice_id: VS-22
phase: 5
priority: P3
dependencies: VS-01
---

# Prompt: Implement VS-22 - Themes & Customization

## Goal

Implement light/dark mode and custom color theme options.

## User Story

As a user, I want to customize the calculator's appearance to match my preferences and environment.

## Implementation Steps

1. Create theme system with CSS variables
2. Implement prebuilt themes:
   - Light (default)
   - Dark
   - Blue
   - Green
   - High Contrast
3. Add theme selector in settings
4. Store theme preference in localStorage
5. Support system preference detection (prefers-color-scheme)
6. Create custom theme editor (optional advanced feature):
   - Choose colors for background, buttons, display, text
   - Save custom themes
7. Smooth transitions between themes

## Acceptance Criteria

- [ ] Theme selector accessible in settings
- [ ] Light and dark modes functional
- [ ] Additional color themes available
- [ ] Theme persists across sessions
- [ ] Respects system dark mode preference
- [ ] Smooth transitions between themes
- [ ] All themes maintain accessibility (contrast ratios)

## Verification Steps

1. Open settings → See theme options
2. Select Dark theme → Interface darkens smoothly
3. Select Blue theme → Color scheme changes
4. Refresh page → Theme persists
5. System dark mode on → Auto-selects dark (if enabled)
6. Check contrast ratios → All themes meet WCAG AA
7. Test on mobile → Themes work across devices

## Showcase (3 min)

- Show default light theme
- Switch to dark → "Easy on the eyes at night"
- Show blue, green themes → "Match your style"
- High contrast → "Maximum readability"
- System sync → "Auto-adapts to your device"
- **Key Message**: "Your calculator, your way. Beautiful themes for every preference."
