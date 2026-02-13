/**
 * VS-04 Calculator unit tests: calculate() and evaluateExpression()
 * Critical test cases TC-V4-01 through TC-V4-07 and PEMDAS tests.
 */

const { calculate, evaluateExpression } = require("../calculator.js");

function assertEqual(actual, expected, label) {
  const pass = actual === expected;
  console.log(`  ${label}: ${pass ? "✅" : "❌"} expected "${expected}", got "${actual}"`);
  return pass;
}

function assertError(result, expectedMessage, label) {
  const ok = result && result.error === true && result.message === expectedMessage;
  console.log(`  ${label}: ${ok ? "✅" : "❌"} expected error "${expectedMessage}", got ${JSON.stringify(result)}`);
  return ok;
}

// ---------- Critical test cases (slice) ----------

function runCriticalTests() {
  console.log("\n=== Critical test cases (TC-V4-01 to TC-V4-07) ===\n");
  let passed = 0;
  let total = 0;

  // TC-V4-01: 5 + 3 = 8
  total++;
  const r01 = calculate("5", "3", "+");
  if (r01 && !r01.error && r01.result === "8") passed++;
  else console.log("  TC-V4-01 5+3=8: ❌", r01);

  // TC-V4-02: 10 - 4 = 6
  total++;
  const r02 = calculate("10", "4", "-");
  if (r02 && !r02.error && r02.result === "6") passed++;
  else console.log("  TC-V4-02 10-4=6: ❌", r02);

  // TC-V4-03: 7 × 6 = 42 (internal *)
  total++;
  const r03 = calculate("7", "6", "*");
  if (r03 && !r03.error && r03.result === "42") passed++;
  else console.log("  TC-V4-03 7×6=42: ❌", r03);

  // TC-V4-04: 20 ÷ 4 = 5 (internal /)
  total++;
  const r04 = calculate("20", "4", "/");
  if (r04 && !r04.error && r04.result === "5") passed++;
  else console.log("  TC-V4-04 20÷4=5: ❌", r04);

  // TC-V4-05: 10 ÷ 0 = error
  total++;
  const r05 = calculate("10", "0", "/");
  if (r05 && r05.error && r05.message === "Cannot divide by zero") passed++;
  else console.log("  TC-V4-05 10÷0 error: ❌", r05);

  // TC-V4-06: 0.1 + 0.2 = 0.3
  total++;
  const r06 = calculate("0.1", "0.2", "+");
  if (r06 && !r06.error && r06.result === "0.3") passed++;
  else console.log("  TC-V4-06 0.1+0.2=0.3: ❌", r06);

  // TC-V4-07: 5 - 10 = -5
  total++;
  const r07 = calculate("5", "10", "-");
  if (r07 && !r07.error && r07.result === "-5") passed++;
  else console.log("  TC-V4-07 5-10=-5: ❌", r07);

  console.log(`  Critical: ${passed}/${total} passed\n`);
  return { passed, total };
}

// ---------- PEMDAS tests ----------

function runPemdasTests() {
  console.log("\n=== PEMDAS tests ===\n");
  let passed = 0;
  let total = 0;

  // 5 + 3 × 2 = 11
  total++;
  const t1 = [
    { type: "number", value: "5" },
    { type: "operator", value: "+" },
    { type: "number", value: "3" },
    { type: "operator", value: "×" },
    { type: "number", value: "2" }
  ];
  const r1 = evaluateExpression(t1);
  if (r1 && !r1.error && r1.result === "11") passed++;
  else console.log("  5+3×2=11: ❌", r1);

  // 10 - 6 ÷ 2 = 7
  total++;
  const t2 = [
    { type: "number", value: "10" },
    { type: "operator", value: "-" },
    { type: "number", value: "6" },
    { type: "operator", value: "÷" },
    { type: "number", value: "2" }
  ];
  const r2 = evaluateExpression(t2);
  if (r2 && !r2.error && r2.result === "7") passed++;
  else console.log("  10-6÷2=7: ❌", r2);

  // 2 × 3 + 4 × 5 = 26
  total++;
  const t3 = [
    { type: "number", value: "2" },
    { type: "operator", value: "×" },
    { type: "number", value: "3" },
    { type: "operator", value: "+" },
    { type: "number", value: "4" },
    { type: "operator", value: "×" },
    { type: "number", value: "5" }
  ];
  const r3 = evaluateExpression(t3);
  if (r3 && !r3.error && r3.result === "26") passed++;
  else console.log("  2×3+4×5=26: ❌", r3);

  // 100 ÷ 4 - 5 × 2 = 15
  total++;
  const t4 = [
    { type: "number", value: "100" },
    { type: "operator", value: "÷" },
    { type: "number", value: "4" },
    { type: "operator", value: "-" },
    { type: "number", value: "5" },
    { type: "operator", value: "×" },
    { type: "number", value: "2" }
  ];
  const r4 = evaluateExpression(t4);
  if (r4 && !r4.error && r4.result === "15") passed++;
  else console.log("  100÷4-5×2=15: ❌", r4);

  // Simple: 5 + 3 = 8 (two tokens + current)
  total++;
  const t5 = [
    { type: "number", value: "5" },
    { type: "operator", value: "+" },
    { type: "number", value: "3" }
  ];
  const r5 = evaluateExpression(t5);
  if (r5 && !r5.error && r5.result === "8") passed++;
  else console.log("  5+3=8: ❌", r5);

  // Single number
  total++;
  const t6 = [{ type: "number", value: "42" }];
  const r6 = evaluateExpression(t6);
  if (r6 && !r6.error && r6.result === "42") passed++;
  else console.log("  single 42: ❌", r6);

  console.log(`  PEMDAS: ${passed}/${total} passed\n`);
  return { passed, total };
}

// ---------- Edge cases ----------

function runEdgeTests() {
  console.log("\n=== Edge cases ===\n");
  let passed = 0;
  let total = 0;

  // Invalid input
  total++;
  const e1 = calculate("x", "3", "+");
  if (e1 && e1.error && e1.message === "Invalid input") passed++;
  else console.log("  invalid input: ❌", e1);

  total++;
  const e2 = calculate("5", "y", "-");
  if (e2 && e2.error && e2.message === "Invalid input") passed++;
  else console.log("  invalid input 2: ❌", e2);

  // Unknown operation
  total++;
  const e3 = calculate("5", "3", "%");
  if (e3 && e3.error && e3.message === "Unknown operation") passed++;
  else console.log("  unknown op: ❌", e3);

  // Empty tokens
  total++;
  const e4 = evaluateExpression([]);
  if (e4 && e4.error) passed++;
  else console.log("  empty tokens: ❌", e4);

  // Division by zero in expression
  total++;
  const e5 = evaluateExpression([
    { type: "number", value: "10" },
    { type: "operator", value: "/" },
    { type: "number", value: "0" }
  ]);
  if (e5 && e5.error && e5.message === "Cannot divide by zero") passed++;
  else console.log("  div by zero in expr: ❌", e5);

  console.log(`  Edge: ${passed}/${total} passed\n`);
  return { passed, total };
}

// ---------- Run all ----------

function runAllTests() {
  console.log("\n=== VS-04 Calculator tests ===\n");
  const c = runCriticalTests();
  const p = runPemdasTests();
  const e = runEdgeTests();
  const totalPassed = c.passed + p.passed + e.passed;
  const totalTests = c.total + p.total + e.total;
  console.log("=== Summary ===");
  console.log(`Total: ${totalPassed}/${totalTests} passed`);
  console.log(totalPassed === totalTests ? "✅ ALL TESTS PASSED\n" : "❌ SOME TESTS FAILED\n");
  return totalPassed === totalTests;
}

if (require.main === module) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runAllTests, runCriticalTests, runPemdasTests, runEdgeTests };
