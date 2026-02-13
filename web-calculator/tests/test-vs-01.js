/**
 * VS-01 Unit Tests
 * Tests for Display & Number Input functionality
 */

// Mock DOM for testing
if (typeof document === 'undefined') {
    global.document = {
        readyState: 'complete',
        getElementById: () => ({ textContent: '0' }),
        querySelectorAll: () => [],
        addEventListener: () => {}
    };
}

const { calculatorState, inputDigit, updateDisplay } = require('./app.js');

// Test Suite
console.log('\n=== VS-01 Unit Tests ===\n');

// Test 1: Initial state is "0"
function testInitialState() {
    console.log('Test 1: Initial state is "0"');
    const result = calculatorState.currentInput === '0';
    console.log(`  Expected: "0"`);
    console.log(`  Actual: "${calculatorState.currentInput}"`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 2: inputDigit() appends digits correctly
function testInputDigitAppend() {
    console.log('Test 2: inputDigit() appends digits correctly');
    
    // Reset state
    calculatorState.currentInput = '0';
    calculatorState.displayError = false;
    
    inputDigit('5');
    const step1 = calculatorState.currentInput === '5';
    console.log(`  After inputDigit('5'): "${calculatorState.currentInput}" - ${step1 ? '✅' : '❌'}`);
    
    inputDigit('3');
    const step2 = calculatorState.currentInput === '53';
    console.log(`  After inputDigit('3'): "${calculatorState.currentInput}" - ${step2 ? '✅' : '❌'}`);
    
    inputDigit('7');
    const step3 = calculatorState.currentInput === '537';
    console.log(`  After inputDigit('7'): "${calculatorState.currentInput}" - ${step3 ? '✅' : '❌'}`);
    
    const result = step1 && step2 && step3;
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 3: Leading zero replacement works
function testLeadingZeroReplacement() {
    console.log('Test 3: Leading zero replacement works');
    
    // Reset state to "0"
    calculatorState.currentInput = '0';
    calculatorState.displayError = false;
    
    inputDigit('8');
    const step1 = calculatorState.currentInput === '8';
    console.log(`  "0" + "8" = "${calculatorState.currentInput}" (expected "8") - ${step1 ? '✅' : '❌'}`);
    
    // Test that "0" + "0" stays as "0"
    calculatorState.currentInput = '0';
    inputDigit('0');
    const step2 = calculatorState.currentInput === '0';
    console.log(`  "0" + "0" = "${calculatorState.currentInput}" (expected "0") - ${step2 ? '✅' : '❌'}`);
    
    const result = step1 && step2;
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 4: Multiple digits without leading zero
function testMultipleDigits() {
    console.log('Test 4: Multiple digits work correctly');
    
    calculatorState.currentInput = '0';
    calculatorState.displayError = false;
    
    inputDigit('1');
    inputDigit('2');
    inputDigit('3');
    inputDigit('4');
    inputDigit('5');
    
    const result = calculatorState.currentInput === '12345';
    console.log(`  Expected: "12345"`);
    console.log(`  Actual: "${calculatorState.currentInput}"`);
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Test 5: Error state handling
function testErrorState() {
    console.log('Test 5: Error state clears on new input');
    
    calculatorState.currentInput = 'Error';
    calculatorState.displayError = true;
    
    inputDigit('5');
    
    const errorCleared = calculatorState.displayError === false;
    const valueReset = calculatorState.currentInput === '5';
    
    console.log(`  Error cleared: ${errorCleared ? '✅' : '❌'}`);
    console.log(`  Value reset to "5": ${valueReset ? '✅' : '❌'}`);
    
    const result = errorCleared && valueReset;
    console.log(`  Result: ${result ? '✅ PASS' : '❌ FAIL'}\n`);
    return result;
}

// Run all tests
function runAllTests() {
    const results = [
        testInitialState(),
        testInputDigitAppend(),
        testLeadingZeroReplacement(),
        testMultipleDigits(),
        testErrorState()
    ];
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log('=== Test Summary ===');
    console.log(`Passed: ${passed}/${total}`);
    console.log(`Status: ${passed === total ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}\n`);
    
    return passed === total;
}

// Run tests if this file is executed directly
if (require.main === module) {
    const success = runAllTests();
    process.exit(success ? 0 : 1);
}

module.exports = { runAllTests };
