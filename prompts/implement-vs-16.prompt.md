---
slice_id: VS-16
phase: 3
priority: P1
dependencies: VS-01
---

# Prompt: Implement VS-16 - Calculation Templates

## Goal

Create pre-configured calculator templates for common calculations: tip calculator, discount calculator, and tax calculator.

## User Story

As a user, I want quick access to common calculation types without figuring out the math myself.

## Implementation Steps

1. **Create template selector UI** (`index.html`)
   - Add "Templates" button/menu
   - Show template options:
     - Standard Calculator (default)
     - Tip Calculator
     - Discount Calculator
     - Tax Calculator
   - Modal or dropdown to select template

2. **Design tip calculator template**
   - Inputs: Bill Amount, Tip Percentage, Number of People
   - Auto-calculates: Tip Amount, Total, Per Person
   - Presets: 15%, 18%, 20%, 25%
   - Show breakdown clearly

3. **Design discount calculator template**
   - Inputs: Original Price, Discount Percentage or Amount
   - Auto-calculates: Discount , Final Price, Savings
   - Common presets: 10%, 20%, 25%, 50% off

4. **Design tax calculator template**
   - Inputs: Amount, Tax Rate
   - Auto-calculates: Tax Amount, Total with Tax
   - Support both inclusive/exclusive modes
   - Presets for common tax rates (configurable by region)

5. **Implement template switching** (`app.js`)
   - Clear current state on template switch
   - Load template-specific UI
   - Save last used template in localStorage
   - Add "Back to Standard" option

6. **Create template-specific layouts**
   - Each template has custom button layout
   - Clear labels for inputs
   - Auto-calculation as values entered
   - Results prominently displayed

7. **Add presets for each template**
   - Quick-select common values
   - Remember user's last-used values

8. **Update CSS** (`style.css`)
   - Style template selector
   - Create layouts for each template
   - Ensure responsive on all devices

9. **Add tests**
   - Test calculation logic for each template
   - Test template switching
   - Test localStorage persistence

## Acceptance Criteria

- [ ] Template selector accessible from main UI
- [ ] Tip calculator with bill, tip%, people splits correctly
- [ ] Discount calculator shows original, discount, final price
- [ ] Tax calculator handles inclusive/exclusive correctly
- [ ] Each template has intuitive UI
- [ ] Preset buttons provide quick values
- [ ] Can switch between templates easily
- [ ] Last used template remembered across sessions
- [ ] All calculations accurate and tested

## Verification Steps

### Manual Tests

**Tip Calculator:**

1. Select Tip Calculator template
2. Enter bill: $50
3. Select 20% preset → Shows tip: $10, total: $60
4. Enter 4 people → Shows $15 per person
5. Try custom 22% → Calculates correctly

**Discount Calculator:**

1. Select Discount Calculator
2. Enter original price: $100
3. Select 25% off → Shows discount: $25, final: $75, saved: $25
4. Switch to $ amount: Enter $30 off → Shows 30% discount, final: $70

**Tax Calculator:**

1. Select Tax Calculator
2. Enter amount: $100
3. Enter tax rate: 8.5%
4. Exclusive mode → Shows tax: $8.50, total: $108.50
5. Inclusive mode → Shows breakdown differently

**Template Switching:**

1. Switch from Standard to Tip → UI changes
2. Calculate tip
3. Switch back to Standard → Regular calculator
4. Refresh page → Last used template loads

### Automated Tests

```javascript
test("Tip calculator calculates correctly", () => {
  const result = calculateTip(50, 20, 4);
  expect(result.tipAmount).toBe(10);
  expect(result.total).toBe(60);
  expect(result.perPerson).toBe(15);
});

test("Discount calculator handles percentage", () => {
  const result = calculateDiscount(100, 25, "percent");
  expect(result.discount).toBe(25);
  expect(result.finalPrice).toBe(75);
});

test("Tax calculator handles exclusive mode", () => {
  const result = calculateTax(100, 8.5, "exclusive");
  expect(result.taxAmount).toBe(8.5);
  expect(result.total).toBe(108.5);
});
```

## Showcase (6 min)

**Setup**: Calculator ready

**Script**:

1. **Introduce feature**: "Special templates for common calculations!"
   - Click Templates button
   - Show three options → "Each designed for specific use case"

2. **Tip Calculator Demo**:
   - Select Tip Calculator
   - "Dinner bill is $85, want to tip 20%, splitting with 3 friends"
   - Enter $85 → Click 20% button → Shows $17 tip
   - Enter 3 people → Shows $34 per person
   - "Instant calculation, no thinking required!"

3. **Discount Calculator Demo**:
   - Switch to Discount Calculator
   - "Jacket is $120, sale says 30% off"
   - Enter $120, click 30% → Shows: $36 saved, pay $84
   - "Know exactly what you'll pay before checkout"

4. **Tax Calculator Demo**:
   - Switch to Tax Calculator
   - "Item costs $50 before tax, rate is 7%"
   - Enter values → Shows $3.50 tax, $53.50 total
   - Toggle inclusive/exclusive → Shows different breakdown
   - "Handle either price-including or price-excluding tax"

5. **Convenience features**:
   - Show preset buttons → "Common values one-click"
   - Refresh page → Last template remembered
   - "Remembers which tool you use most"

**Real World Use Cases**:

- "Restaurant: quickly split bill with tip"
- "Shopping: calculate actual price during sales"
- "Business: add tax to invoices"
- "Budgeting: work backwards from total"

**Q&A Preview**:

- "Can I add custom templates?" → Future enhancement possibility
- "Mortgage calculator?" → Could add in future with more advanced templates
- "Save template results?" → History saves all calculations including templates

**Key Message**: "From general-purpose calculator to specialized tools in one click. The right tool for common tasks."

## Files to Modify

- `index.html` - Add template selector and template UIs
- `style.css` - Style templates
- `app.js` - Implement template logic and switching

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All three templates working correctly
- [ ] Template switching smooth
- [ ] Tests passing
- [ ] Responsive on all devices
- [ ] localStorage persistence working
- [ ] Manual verification completed
- [ ] Showcase script executed successfully
- [ ] **MILESTONE: Phase 3 (V1.2) Complete!**
