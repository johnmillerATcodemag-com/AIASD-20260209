---
slice_id: VS-26
phase: 5
priority: P3
dependencies: VS-09, VS-18
---

# Prompt: Implement VS-26 - Cloud Sync & Accounts

## Goal

Optional user accounts to sync history, settings, variables, and tabs across devices.

## User Story

As a user, I want my calculator state synced across all my devices.

## Implementation Steps

1. Implement authentication:
   - Email/password or OAuth (Google, Microsoft)
   - JWT token management
   - Secure API endpoints
2. Create backend (or use Firebase/Supabase):
   - User management
   - Data storage (history, settings, variables, tabs)
   - Real-time sync
3. Add "Sign In" option in calculator
4. Implement sync logic:
   - Upload on changes
   - Download on load
   - Conflict resolution (last-write-wins or merge)
5. Privacy controls:
   - Optional cloud sync (can use locally only)
   - Clear cloud data option
   - Data export for backup
6. Offline-first: Works without account, syncs when signed in

## Acceptance Criteria

- [ ] User can create account and sign in
- [ ] History syncs across devices
- [ ] Settings sync across devices
- [ ] Variables sync across devices
- [ ] Tabs sync across devices
- [ ] Works offline, syncs when online
- [ ] Privacy controls implemented
- [ ] Can delete account and all data

## Verification Steps

1. Create account on Device 1
2. Add calculations, change theme
3. Sign in on Device 2 → Everything synced
4. Make changes on Device 2
5. Refresh Device 1 → Changes appear
6. Sign out → Calculator still works locally
7. Sign back in → Syncs latest state
8. Test conflict: Edit offline on both, go online → Resolves

## Showcase (4 min)

- Sign in on desktop calculator
- Make calculations, adjust settings
- Open phone → Sign in → "Everything's here!"
- Make change on phone
- Check desktop → "Instantly synced"
- **Key Message**: "Your calculator, everywhere. Start on desktop, continue on phone. Always in sync."
- **MILESTONE: Phase 5 (V2.0) Complete!**
