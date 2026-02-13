---
slice_id: VS-23
phase: 5
priority: P3
dependencies: VS-01
---

# Prompt: Implement VS-23 - Programmer Mode

## Goal

Add programmer calculator mode with binary, octal, hex, and bitwise operations.

## User Story

As a developer, I want to work with different number bases and perform bitwise operations.

## Implementation Steps

1. Add "Programmer Mode" option
2. Create number base selector:
   - Binary (BIN)
   - Octal (OCT)
   - Decimal (DEC)
   - Hexadecimal (HEX)
3. Add hex digit buttons (A-F)
4. Implement bitwise operators:
   - AND, OR, XOR, NOT
   - Left Shift (<<), Right Shift (>>)
5. Display number in all bases simultaneously (optional panel)
6. Implement base conversion functions
7. Handle bit width (8-bit, 16-bit, 32-bit, 64-bit selector)
8. Add binary display with bit grouping (nibbles/bytes)

## Acceptance Criteria

- [ ] Number base selector works (BIN/OCT/DEC/HEX)
- [ ] Input and display respect selected base
- [ ] All bitwise operators functional
- [ ] Can convert between bases easily
- [ ] Bit width selector limits values appropriately
- [ ] Binary display shows bit grouping
- [ ] Simultaneous multi-base display (optional)

## Verification Steps

1. Enter Programmer Mode
2. DEC: Enter 255 → Switch to HEX: shows FF
3. Switch to BIN: shows 11111111
4. Calculate: 5 AND 3 = 1 (binary: 101 AND 011 = 001)
5. Calculate: FF OR 0F = FF (hex)
6. Left shift: 2 << 3 = 16
7. Test 8-bit limit: Enter 256 → Overflow handled
8. Convert between bases seamlessly

## Showcase (4 min)

- Show mode switch → Programmer interface
- Demo bases: Enter "42" in DEC, see in HEX (2A), BIN (101010)
- Bitwise AND: `0xF0 AND 0x0F = 0x00`
- Shift operation: `1 << 8 = 256`
- Real use: "Calculate bit masks for hardware registers"
- **Key Message**: "Developers' calculator. Speak in bits, hex, and bases."
