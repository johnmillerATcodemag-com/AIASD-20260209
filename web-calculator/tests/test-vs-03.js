/*
AI-Generated: true
Model: anthropic/claude-3.5-sonnet@2024-10-22
Operator: chrisrockwell
Chat ID: vs-03-implementation-20260213
Prompt: Create unit tests for VS-03 to verify equals button evaluation, clear button reset, division by zero error handling, result chaining, repeat equals functionality, and error state recovery
Started: 2026-02-13T00:30:00Z
Ended: 2026-02-13T00:32:00Z
Task Duration: 00:02:00
AI Log: ai-logs/2026/02/13/vs-03-implementation-20260213/conversation.md
Source: chrisrockwell
*/

/**
 * VS-03 Unit Tests
 * Tests for Equals & Clear Operations functionality
 */

// Mock DOM for testing
if (typeof document === 'undefined') {
    global.document = {
        readyState: 'complete',
        getElementById: () => ({ 
            textContent: '0',
            classList: {
                add: () => {},
                remove: () => {}
            }
        }),
        querySelectorAll: () => [],
        addEventListener: () => {}
    };
}

const { 
    calculatorState, 
    inputDigit, 
    updateDisplay,
    evaluateExpression,
    clearCalculator,
    displayError,
    repeatLastOperation
} = require('../app.js');

// Test Suite
console.log('\n=== VS-03 Unit Tests ===\n');

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, testFn) {
    try {
        const result = testFn();
        if (result) {
            testsPassed++;
        } else {
            testsFailed++;
        }
        return result;
    } catch (error) {
        console.log(`  ❌ EXCEPTION: ${error.message}\n`);
        testsFailed++;
        return false;
    }
}

// Test 1: evaluateExpression performs addition correctly
function testEvaluateAddition() {
    console.log('Test 1: evaluateExpression performs addition correctly');
    
    // Reset state
    calculatorState.currentInput = '5';
    calculatorState.previousInput = '3';
    calculatorState.operator = '+';
    calculatorState.hasError = false;
    
    evaluateExpression();
    
    const result = calculatorState.currentInput === '8';
    console.log(`  3 + 5 = "${calculatorState.currentInput}" (expected "8")`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 2: evaluateExpression performs subtraction correctly
function testEvaluateSubtraction() {
    console.log('Test 2: evaluateExpression performs subtraction correctly');
    
    calculatorState.currentInput = '3';
    calculatorState.previousInput = '10';
    calculatorState.operator = '-';
    calculatorState.hasError = false;
    
    evaluateExpression();
    
    const result = calculatorState.currentInput === '7';
    console.log(`  10 - 3 = "${calculatorState.currentInput}" (expected "7")`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 3: evaluateExpression performs multiplication correctly
function testEvaluateMultiplication() {
    console.log('Test 3: evaluateExpression performs multiplication correctly');
    
    calculatorState.currentInput = '4';
    calculatorState.previousInput = '6';
    calculatorState.operator = '×';
    calculatorState.hasError = false;
    
    evaluateExpression();
    
    const result = calculatorState.currentInput === '24';
    console.log(`  6 × 4 = "${calculatorState.currentInput}" (expected "24")`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 4: evaluateExpression performs division correctly
function testEvaluateDivision() {
    console.log('Test 4: evaluateExpression performs division correctly');
    
    calculatorState.currentInput = '3';
    calculatorState.previousInput = '15';
    calculatorState.operator = '÷';
    calculatorState.hasError = false;
    
    evaluateExpression();
    
    const result = calculatorState.currentInput === '5';
    console.log(`  15 ÷ 3 = "${calculatorState.currentInput}" (expected "5")`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 5: Division by zero shows error
function testDivisionByZero() {
    console.log('Test 5: Division by zero shows error');
    
    calculatorState.currentInput = '0';
    calculatorState.previousInput = '10';
    calculatorState.operator = '÷';
    calculatorState.hasError = false;
    
    evaluateExpression();
    
    const result = calculatorState.hasError === true;
    console.log(`  10 ÷ 0: hasError = ${calculatorState.hasError} (expected true)`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 6: clearCalculator resets all state
function testClearCalculator() {
    console.log('Test 6: clearCalculator resets all state');
    
    // Set non-default state
    calculatorState.currentInput = '123';
    calculatorState.previousInput = '456';
    calculatorState.operator = '+';
    calculatorState.hasError = true;
    calculatorState.lastOperation = { value: 1, operator: '+', operand: 2 };
    
    clearCalculator();
    
    const checks = [
        calculatorState.currentInput === '0',
        calculatorState.previousInput === null,
        calculatorState.operator === null,
        calculatorState.hasError === false,
        calculatorState.lastOperation === null
    ];
    
    console.log(`  currentInput: "${calculatorState.currentInput}" (expected "0") - ${checks[0] ? '✅' : '❌'}`);
    console.log(`  previousInput: ${calculatorState.previousInput} (expected null) - ${checks[1] ? '✅' : '❌'}`);
    console.log(`  operator: ${calculatorState.operator} (expected null) - ${checks[2] ? '✅' : '❌'}`);
    console.log(`  hasError: ${calculatorState.hasError} (expected false) - ${checks[3] ? '✅' : '❌'}`);
    console.log(`  lastOperation: ${calculatorState.lastOperation} (expected null) - ${checks[4] ? '✅' : '❌'}`);
    
    const result = checks.every(check => check === true);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 7: Result chaining works (using result in next calculation)
function testResultChaining() {
    console.log('Test 7: Result chaining works');
    
    // First calculation: 5 + 3 = 8
    calculatorState.currentInput = '5';
    calculatorState.previousInput = '3';
    calculatorState.operator = '+';
    calculatorState.hasError = false;
    evaluateExpression();
    
    const step1 = calculatorState.currentInput === '8';
    console.log(`  Step 1: 3 + 5 = "${calculatorState.currentInput}" - ${step1 ? '✅' : '❌'}`);
    
    // Now previousInput should be "8" for chaining
    const step2 = calculatorState.previousInput === '8';
    console.log(`  Step 2: previousInput = "${calculatorState.previousInput}" (expected "8") - ${step2 ? '✅' : '❌'}`);
    
    const result = step1 && step2;
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 8: Repeat equals functionality
function testRepeatEquals() {
    console.log('Test 8: Repeat equals functionality');
    
    // Set up: 5 + 3 = 8
    calculatorState.currentInput = '5';
    calculatorState.previousInput = '3';
    calculatorState.operator = '+';
    calculatorState.hasError = false;
    calculatorState.waitingForOperand = false;
    
    evaluateExpression();
    const step1 = calculatorState.currentInput === '8';
    console.log(`  First equals: 3 + 5 = "${calculatorState.currentInput}" - ${step1 ? '✅' : '❌'}`);
    
    // Repeat: 8 + 5 = 13
    repeatLastOperation();
    const step2 = calculatorState.currentInput === '13';
    console.log(`  Second equals: 8 + 5 = "${calculatorState.currentInput}" - ${step2 ? '✅' : '❌'}`);
    
    // Repeat again: 13 + 5 = 18
    repeatLastOperation();
    const step3 = calculatorState.currentInput === '18';
    console.log(`  Third equals: 13 + 5 = "${calculatorState.currentInput}" - ${step3 ? '✅' : '❌'}`);
    
    const result = step1 && step2 && step3;
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 9: Error state recovery on new number input
function testErrorRecovery() {
    console.log('Test 9: Error state recovery on new number input');
    
    // Set error state
    calculatorState.hasError = true;
    calculatorState.currentInput = 'Error';
    
    // Input a new digit - should clear error and start fresh
    inputDigit('5');
    
    const step1 = calculatorState.hasError === false;
    const step2 = calculatorState.currentInput === '5';
    
    console.log(`  After error, inputDigit('5'): hasError = ${!calculatorState.hasError} (expected false) - ${step1 ? '✅' : '❌'}`);
    console.log(`  currentInput = "${calculatorState.currentInput}" (expected "5") - ${step2 ? '✅' : '❌'}`);
    
    const result = step1 && step2;
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 10: Equals with no operator does nothing
function testEqualsWithoutOperator() {
    console.log('Test 10: Equals without operator does nothing harmful');
    
    calculatorState.currentInput = '42';
    calculatorState.previousInput = null;
    calculatorState.operator = null;
    calculatorState.hasError = false;
    
    evaluateExpression();
    
    const result = calculatorState.currentInput === '42' && !calculatorState.hasError;
    console.log(`  Value remains: "${calculatorState.currentInput}" (expected "42")`);
    console.log(`  No error: ${!calculatorState.hasError}`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Run all tests
console.log('Running VS-03 Unit Tests...\n');

runTest('Test 1', testEvaluateAddition);
runTest('Test 2', testEvaluateSubtraction);
runTest('Test 3', testEvaluateMultiplication);
runTest('Test 4', testEvaluateDivision);
runTest('Test 5', testDivisionByZero);
runTest('Test 6', testClearCalculator);
runTest('Test 7', testResultChaining);
runTest('Test 8', testRepeatEquals);
runTest('Test 9', testErrorRecovery);
runTest('Test 10', testEqualsWithoutOperator);

// Summary
console.log('='.repeat(50));
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log('='.repeat(50));

// Exit with appropriate code
if (testsFailed > 0) {
    process.exit(1);
} else {
    console.log('\n✅ All VS-03 tests passed!\n');
    process.exit(0);
}
