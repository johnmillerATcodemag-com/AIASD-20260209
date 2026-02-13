/**
 * VS-08 Responsive Layout validation
 * Checks style.css for required breakpoints, touch targets, and no horizontal scroll
 * per prompts/implement-vs-08.prompt.md and .github/issues/slices/VS-08.md
 */

const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "style.css");
const css = fs.readFileSync(cssPath, "utf8");

const checks = [
  {
    id: "TC-V8-01",
    name: "Mobile base: calculator width 100%, max-width 100%",
    pass: /\.calculator\s*\{[\s\S]*?max-width:\s*100%/.test(css) && /\.calculator\s*\{[\s\S]*?width:\s*100%/.test(css),
  },
  {
    id: "TC-V8-02",
    name: "Touch targets ≥44×44px (min-height and min-width 44px)",
    pass: /min-height:\s*44px/.test(css) && /min-width:\s*44px/.test(css),
  },
  {
    id: "TC-V8-03",
    name: "Tablet breakpoint 768px+",
    pass: /@media\s*\(\s*min-width:\s*768px\s*\)/.test(css),
  },
  {
    id: "TC-V8-04",
    name: "Tablet: calculator max-width 400px",
    pass: /max-width:\s*400px/.test(css),
  },
  {
    id: "TC-V8-05",
    name: "Desktop breakpoint 1024px+",
    pass: /@media\s*\(\s*min-width:\s*1024px\s*\)/.test(css),
  },
  {
    id: "TC-V8-06",
    name: "Desktop: calculator max-width 450px",
    pass: /max-width:\s*450px/.test(css),
  },
  {
    id: "TC-V8-07",
    name: "No horizontal scroll (overflow-x: hidden)",
    pass: /overflow-x:\s*hidden/.test(css),
  },
  {
    id: "TC-V8-08",
    name: "Display font sizes: 2rem (base), 2.5rem (tablet), 3rem (desktop)",
    pass:
      /font-size:\s*2rem/.test(css) &&
      /font-size:\s*2\.5rem/.test(css) &&
      /font-size:\s*3rem/.test(css),
  },
  {
    id: "GRID",
    name: "CSS Grid 4 columns",
    pass: /grid-template-columns:\s*repeat\s*\(\s*4\s*/.test(css),
  },
];

let passed = 0;
console.log("\n=== VS-08 Responsive Layout Validation ===\n");
checks.forEach((c) => {
  const ok = c.pass;
  if (ok) passed++;
  console.log(`  ${ok ? "✅" : "❌"} ${c.id}: ${c.name}`);
});
console.log(`\n  Result: ${passed}/${checks.length} checks passed`);
const success = passed === checks.length;
console.log(success ? "  ✅ VS-08 validation PASSED\n" : "  ❌ VS-08 validation FAILED\n");
process.exit(success ? 0 : 1);
