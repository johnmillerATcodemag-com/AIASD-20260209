/**
 * VS-09 App unit tests: history storage, limit, order, persistence, clear, recall.
 * Mocks localStorage for Node; requires app.js after mock.
 */

const storage = {};
const mockLocalStorage = {
  getItem: (key) => storage[key] ?? null,
  setItem: (key, value) => {
    storage[key] = value;
  },
  clear: () => {
    Object.keys(storage).forEach((k) => delete storage[k]);
  }
};

if (typeof global !== "undefined") {
  global.localStorage = mockLocalStorage;
}

const {
  historyState,
  addToHistory,
  clearHistory,
  loadHistoryFromStorage,
  saveHistoryToStorage,
  recallFromHistory,
  calculatorState,
  HISTORY_STORAGE_KEY
} = require("../app.js");

function runHistoryStorageTests() {
  console.log("\n=== History storage (add, max 20, newest first) ===\n");
  let passed = 0;
  let total = 0;

  clearHistory();
  for (let i = 1; i <= 25; i++) {
    addToHistory(`${i} + 1`, String(i + 1));
  }
  total++;
  if (historyState.items.length === 20) passed++;
  else console.log("  max 20 items: ❌ got", historyState.items.length);
  total++;
  if (historyState.items[0].expression === "25 + 1") passed++;
  else console.log("  newest first [0]: ❌ got", historyState.items[0].expression);
  total++;
  if (historyState.items[19].expression === "6 + 1") passed++;
  else console.log("  oldest of 20 [19]: ❌ got", historyState.items[19].expression);
  total++;
  const first = historyState.items[0];
  if (first.id && first.expression && first.result && first.timestamp) passed++;
  else console.log("  item shape (id, expression, result, timestamp): ❌", first);

  console.log(`  Storage: ${passed}/${total} passed\n`);
  return { passed, total };
}

function runHistoryClearTests() {
  console.log("\n=== Clear history ===\n");
  let passed = 0;
  let total = 0;

  addToHistory("1 + 1", "2");
  total++;
  if (historyState.items.length >= 1) passed++;
  clearHistory();
  total++;
  if (historyState.items.length === 0) passed++;
  else console.log("  clear: ❌ length", historyState.items.length);

  console.log(`  Clear: ${passed}/${total} passed\n`);
  return { passed, total };
}

function runRecallTests() {
  console.log("\n=== Recall from history ===\n");
  let passed = 0;
  let total = 0;

  calculatorState.currentValue = "0";
  calculatorState.currentInput = "0";
  calculatorState.awaitingOperand = false;
  calculatorState.displayError = true;
  calculatorState.displayErrorMessage = "Error";
  recallFromHistory("42");
  total++;
  if (calculatorState.currentValue === "42" && calculatorState.currentInput === "42") passed++;
  else console.log("  recall value: ❌", calculatorState.currentValue, calculatorState.currentInput);
  total++;
  if (calculatorState.awaitingOperand === true) passed++;
  else console.log("  awaitingOperand: ❌", calculatorState.awaitingOperand);
  total++;
  if (calculatorState.displayError === false) passed++;
  else console.log("  clear error on recall: ❌");

  console.log(`  Recall: ${passed}/${total} passed\n`);
  return { passed, total };
}

function runLocalStorageTests() {
  console.log("\n=== localStorage persistence ===\n");
  let passed = 0;
  let total = 0;

  mockLocalStorage.clear();
  clearHistory();
  addToHistory("7 + 8", "15");
  addToHistory("10 × 2", "20");
  const before = historyState.items.length;
  historyState.items = [];
  loadHistoryFromStorage();
  total++;
  if (historyState.items.length === before && historyState.items[0].expression === "10 × 2") passed++;
  else console.log("  load from storage: ❌", historyState.items.length, historyState.items[0]);

  console.log(`  Persistence: ${passed}/${total} passed\n`);
  return { passed, total };
}

function runAllTests() {
  console.log("\n=== VS-09 App (history) tests ===\n");
  mockLocalStorage.clear();
  const s = runHistoryStorageTests();
  const c = runHistoryClearTests();
  const r = runRecallTests();
  const p = runLocalStorageTests();
  const totalPassed = s.passed + c.passed + r.passed + p.passed;
  const totalTests = s.total + c.total + r.total + p.total;
  console.log("=== Summary ===");
  console.log(`Total: ${totalPassed}/${totalTests} passed`);
  console.log(totalPassed === totalTests ? "✅ ALL TESTS PASSED\n" : "❌ SOME TESTS FAILED\n");
  return totalPassed === totalTests;
}

if (require.main === module) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runAllTests, runHistoryStorageTests, runHistoryClearTests, runRecallTests, runLocalStorageTests };
