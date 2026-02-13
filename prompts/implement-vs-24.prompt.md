---
slice_id: VS-24
phase: 5
priority: P3
dependencies: VS-01
---

# Prompt: Implement VS-24 - Unit Converter

## Goal

Implement unit conversion for length, weight, temperature, and other common measurements.

## User Story

As a user, I want to quickly convert between units without leaving the calculator.

## Implementation Steps

1. Add "Convert" mode/panel
2. Implement conversion categories:
   - Length: mm, cm, m, km, in, ft, yd, mi
   - Weight: mg, g, kg, oz, lb
   - Temperature: °C, °F, K
   - Volume: mL, L, fl oz, cup, gal
   - Speed: m/s, km/h, mph
   - Data: B, KB, MB, GB, TB (binary or decimal)
3. Create unit selector dropdowns for "from" and "to"
4. Auto-convert as numbers entered
5. Show conversion formula/explanation
6. Add favorite conversions
7. Bidirectional conversion support

## Acceptance Criteria

- [ ] All conversion categories available
- [ ] Accurate conversion factors
- [ ] Auto-converts as typing
- [ ] Can swap "from" and "to" units easily
- [ ] Common units easily accessible
- [ ] Temperature handles special conversion (offset)
- [ ] Data units handle binary (1024) vs decimal (1000)

## Verification Steps

1. Select Length conversion
2. From: 1 mile → To (km): 1.60934
3. Swap units → 1 km in miles: 0.62137
4. Temperature: 0°C → 32°F ✓, 100°C → 212°F ✓
5. Temperature: 0°F → -17.78°C ✓
6. Weight: 1 kg → 2.20462 lb
7. Data: 1 GB → Shows both 1000 MB and 1024 MB options

## Showcase (3 min)

- Show converter panel
- Convert recipe: "200g flour to cups"
- Convert temperature: "Oven at 350°F? That's 177°C"
- Convert distance: "5K race is 3.1 miles"
- Real-time: Type numbers, watch conversion update
- **Key Message**: "Stop Googling conversions. Built-in unit conversion for everything."
