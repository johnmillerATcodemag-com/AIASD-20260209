---
slice_id: VS-20
phase: 4
priority: P2
dependencies: VS-01
---

# Prompt: Implement VS-20 - Haptic & Audio Feedback

## Goal

Provide optional haptic vibration and audio clicks for button presses.

## User Story

As a user, I want tactile and audio feedback so I know my input was registered.

## Implementation Steps

1. Add Settings panel with toggles for haptic and audio
2. Implement haptic feedback using Vibration API (mobile)
3. Add button click sounds (short, subtle beeps)
4. Different sounds for numbers, operators, equals, error
5. Store preferences in localStorage
6. Provide volume control for audio
7. Check for API support, degrade gracefully

## Acceptance Criteria

- [ ] Settings panel with haptic/audio toggles
- [ ] Haptic vibration on button press (mobile)
- [ ] Audio clicks play on button press
- [ ] Different sounds for button types
- [ ] Volume adjustable
- [ ] Preferences persist
- [ ] Works gracefully when APIs not supported

## Verification Steps

1. Open settings → Enable haptic feedback
2. Press buttons on mobile device → Feel vibration
3. Enable audio feedback → Hear clicks
4. Adjust volume → Sound level changes
5. Different button types → Different sounds
6. Disable both → Silent operation
7. Refresh → Preferences remembered

## Showcase (2 min)

- Show settings panel
- Press buttons with haptic → Feel response
- Enable audio → Hear satisfying clicks
- "Just like physical calculator!"
- **Key Message**: "Sensory feedback makes the digital feel physical. Optional for those who love it, off for those who don't."
- **MILESTONE: Phase 4 (V1.3) Complete!**
