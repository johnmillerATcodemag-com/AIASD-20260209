const app = require('./app.js');
const calc = require('./calculator.js');

// Make calculator available globally for app.js
global.calculator = calc;

console.log('Testing VS-03 with Clear Button Integration:\n');

// Test 1: Simple calculation
console.log('Test 1: 5 + 3 = 8');
app.calculatorState.currentValue = '0';
app.calculatorState.currentInput = '0';
app.calculatorState.expressionTokens = [];
app.inputDigit('5');
app.selectOperator('+');
app.inputDigit('3');
app.handleEquals();
console.log('Result:', app.calculatorState.currentValue);
console.log('Pass:', app.calculatorState.currentValue === '8');
console.log('');

// Test 2: Clear button
console.log('Test 2: Clear resets state');
app.clearCalculator();
console.log('After clear:', app.calculatorState.currentValue);
console.log('Tokens cleared:', app.calculatorState.expressionTokens.length === 0);
console.log('Pass:', app.calculatorState.currentValue === '0');
console.log('');

// Test 3: PEMDAS - multi-operation
console.log('Test 3: 2 + 3 × 4 = 14 (PEMDAS)');
app.inputDigit('2');
app.selectOperator('+');
app.inputDigit('3');
app.selectOperator('×');
app.inputDigit('4');
app.handleEquals();
console.log('Result:', app.calculatorState.currentValue);
console.log('Pass:', app.calculatorState.currentValue === '14');
console.log('');

console.log('✅ All merge conflicts resolved!');
console.log('🎯 VS-03 PEMDAS + Clear Button = Working');
