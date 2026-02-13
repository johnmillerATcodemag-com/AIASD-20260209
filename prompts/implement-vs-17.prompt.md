---
slice_id: VS-17
phase: 4
priority: P2
dependencies: VS-01
---

# Prompt: Implement VS-17 - Progressive Web App (PWA)

## Goal

Convert calculator to PWA for offline use and "Add to Home Screen" capability.

## User Story

As a user, I want to install the calculator on my device and use it offline.

## Implementation Steps

1. Create manifest.json - app name, icons, colors, display mode
2. Create service worker (sw.js) - cache assets, offline strategy
3. Register service worker in app.js
4. Add PWA meta tags to index.html
5. Create app icons (192×192, 512×512)
6. Test offline functionality
7. Test "Add to Home Screen" on mobile

## Acceptance Criteria

- [ ] Manifest.json configured correctly
- [ ] Service worker caches all assets
- [ ] Works offline after first visit
- [ ] "Add to Home Screen" prompt appears
- [ ] App icons display correctly
- [ ] Lighthouse PWA score > 90

## Verification Steps

1. Visit calculator online → Service worker installs
2. Go offline (airplane mode) → Calculator still works
3. On mobile, get "Add to Home Screen" prompt → Works as installed app
4. Run Lighthouse audit → PWA checks pass

## Showcase (3 min)

- Show online calculator
- Enable airplane mode → Still works!
- Install to home screen → Opens like native app
- **Key Message**: "No internet? No problem. Works anywhere, anytime."
