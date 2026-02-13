/**
 * Web Calculator - Main Application
 * Implementation of VS-01 through VS-07
 */

'use strict';

/* ==========================================================================
   VS-01: Calculator State & Display
   ========================================================================== */

/**
 * Calculator state object
 * Manages all calculator state in one place
 */
const calculatorState = {
  currentValue: '0',       // Current display value (string)
  displayError: false,     // Whether to show error message
  previousValue: null,     // First operand for calculation (string or null)
  operation: null,         // Selected operation: "+", "-", "*", "/" (or null)
  awaitingOperand: false   // If true, next digit replaces currentValue
};

/**
 * VS-01: Update Display
 * Reads calculator state and updates the display
 */
function updateDisplay() {
  const displayElement = document.getElementById('display');
  const valueSpan = document.getElementById('displayValue');

  // Read state
  let value = calculatorState.currentValue;
  const isError = calculatorState.displayError;

  // Apply rendering logic
  if (isError) {
    valueSpan.textContent = value; // Show error message
    displayElement.classList.add('calculator__display--error');
  } else if (!value || value === '') {
    valueSpan.textContent = '0'; // Default to zero
    displayElement.classList.remove('calculator__display--error');
  } else {
    // Truncate if too long (max 16 characters)
    if (value.length > 16) {
      value = value.substring(0, 16);
      valueSpan.classList.add('display__value--truncated');
    } else {
      valueSpan.classList.remove('display__value--truncated');
    }
    valueSpan.textContent = value;
    displayElement.classList.remove('calculator__display--error');
  }
}

/* ==========================================================================
   VS-02: Input Digit & Decimal Point
   ========================================================================== */

/**
 * Handle digit input (0-9)
 */
function handleDigitInput(digit) {
  // Clear error if present
  if (calculatorState.displayError) {
    calculatorState.displayError = false;
  }

  let currentValue = calculatorState.currentValue;

  // Replace value if awaiting new operand
  if (calculatorState.awaitingOperand) {
    calculatorState.currentValue = digit;
    calculatorState.awaitingOperand = false;
  } else {
    // Remove leading zero (except for "0.xxx")
    if (currentValue === '0' && digit !== '.') {
      calculatorState.currentValue = digit;
    } else {
      // Append digit if under max length
      if (currentValue.length < 15) {
        calculatorState.currentValue = currentValue + digit;
      }
    }
  }

  updateDisplay();
}

/**
 * Handle decimal point input
 */
function handleDecimalInput() {
  let currentValue = calculatorState.currentValue;

  // Start new number with "0." if awaiting operand
  if (calculatorState.awaitingOperand) {
    calculatorState.currentValue = '0.';
    calculatorState.awaitingOperand = false;
    updateDisplay();
    return;
  }

  // Only add decimal if not already present
  if (!currentValue.includes('.')) {
    calculatorState.currentValue = currentValue + '.';
    updateDisplay();
  }
}

/* ==========================================================================
   VS-03: Select Operation
   ========================================================================== */

/**
 * Handle operator input (+, -, *, /)
 */
function handleOperatorInput(operator) {
  const currentValue = calculatorState.currentValue || '0';

  // If no previousValue set, this is the first operator selection
  if (calculatorState.previousValue === null) {
    calculatorState.previousValue = currentValue;
  } else if (!calculatorState.awaitingOperand) {
    // If there's already a previousValue and we have a new operand,
    // auto-calculate before setting new operation
    handleEquals();
    calculatorState.previousValue = calculatorState.currentValue;
  }
  // If awaitingOperand is true, user is just changing operators

  // Store the selected operation
  calculatorState.operation = operator;

  // Set flag so next digit starts new number
  calculatorState.awaitingOperand = true;

  // Update visual feedback (highlight operator button)
  updateOperatorHighlight(operator);
}

/**
 * Update operator button highlighting
 */
function updateOperatorHighlight(operator) {
  // Clear all operator highlights
  document.querySelectorAll('.btn--operator').forEach(btn => {
    btn.classList.remove('btn--active');
  });

  // Highlight selected operator
  const symbolMap = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  const symbol = symbolMap[operator];
  const button = document.querySelector(`[data-operator="${symbol}"]`);
  if (button) {
    button.classList.add('btn--active');
  }
}

/* ==========================================================================
   VS-04: Calculate Result
   ========================================================================== */

/**
 * Calculation engine
 * Performs arithmetic operations with proper precision
 */
function calculate(previousValue, currentValue, operation) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  // Validate inputs
  if (isNaN(prev) || isNaN(current)) {
    return { error: true, message: 'Invalid input' };
  }

  let result;
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        return { error: true, message: 'Cannot divide by zero' };
      }
      result = prev / current;
      break;
    default:
      return { error: true, message: 'Unknown operation' };
  }

  // Round to 10 decimal places to handle floating point precision
  // This ensures 0.1 + 0.2 = 0.3
  result = Math.round(result * 10000000000) / 10000000000;

  // Check if result exceeds maximum digit length
  const resultStr = result.toString();
  if (resultStr.replace('.', '').replace('-', '').length > 15) {
    // Convert to scientific notation for very large numbers
    result = parseFloat(result.toExponential(10));
  }

  return { error: false, result: result.toString() };
}

/**
 * Handle equals button
 */
function handleEquals() {
  // Check if there's an operation to perform
  if (!calculatorState.operation || !calculatorState.previousValue) {
    return; // Nothing to calculate
  }

  // Get values
  const previousValue = calculatorState.previousValue;
  const currentValue = calculatorState.currentValue || '0';
  const operation = calculatorState.operation;

  // Perform calculation
  const result = calculate(previousValue, currentValue, operation);

  if (result.error) {
    // Handle error
    calculatorState.displayError = true;
    calculatorState.currentValue = result.message;
    updateDisplay();
  } else {
    // Handle success
    calculatorState.currentValue = result.result;
    calculatorState.previousValue = null;
    calculatorState.operation = null;
    calculatorState.awaitingOperand = true;
    calculatorState.displayError = false;

    // Clear operator highlights
    document.querySelectorAll('.btn--operator').forEach(btn => {
      btn.classList.remove('btn--active');
    });

    updateDisplay();
  }
}

/* ==========================================================================
   VS-05: Clear Calculator State
   ========================================================================== */

/**
 * Clear all calculator state
 */
function clearCalculator() {
  // Reset all state properties
  calculatorState.currentValue = '';
  calculatorState.previousValue = null;
  calculatorState.operation = null;
  calculatorState.awaitingOperand = false;
  calculatorState.displayError = false;

  // Clear any operator highlights
  document.querySelectorAll('.btn--operator').forEach(btn => {
    btn.classList.remove('btn--active');
  });

  // Clear error styling if present
  const displayElement = document.getElementById('display');
  displayElement.classList.remove('calculator__display--error');

  // Update display to show "0"
  updateDisplay();
}

/* ==========================================================================
   VS-06: Delete Last Digit
   ========================================================================== */

/**
 * Delete last digit (backspace functionality)
 */
function deleteLastDigit() {
  // Don't delete if awaiting new operand
  if (calculatorState.awaitingOperand) {
    return;
  }

  let value = calculatorState.currentValue;

  // Remove last character
  if (value.length > 0) {
    calculatorState.currentValue = value.slice(0, -1);
  }

  // If empty after deletion, stays empty (displays as "0")
  updateDisplay();
}

/* ==========================================================================
   VS-07: Keyboard Input Support
   ========================================================================== */

/**
 * Global keyboard event handler
 * Maps keyboard keys to calculator functions
 */
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Number keys (VS-02)
  if (key >= '0' && key <= '9') {
    handleDigitInput(key);
    highlightButton(`[data-digit="${key}"]`);
    return;
  }

  // Decimal point (VS-02)
  if (key === '.' || key === 'Decimal') {
    handleDecimalInput();
    highlightButton('.btn--decimal');
    return;
  }

  // Operator keys (VS-03)
  if (key === '+') {
    handleOperatorInput('+');
    highlightButton('[data-operator="+"]');
    return;
  }
  if (key === '-') {
    handleOperatorInput('-');
    highlightButton('[data-operator="−"]');
    return;
  }
  if (key === '*') {
    handleOperatorInput('*');
    highlightButton('[data-operator="×"]');
    return;
  }
  if (key === '/') {
    event.preventDefault(); // Prevent browser search
    handleOperatorInput('/');
    highlightButton('[data-operator="÷"]');
    return;
  }

  // Equals (VS-04)
  if (key === 'Enter' || key === '=') {
    event.preventDefault(); // Prevent form submission
    handleEquals();
    highlightButton('.btn--equals');
    return;
  }

  // Clear (VS-05)
  if (key === 'Escape') {
    clearCalculator();
    highlightButton('.btn--clear');
    return;
  }

  // Delete (VS-06)
  if (key === 'Backspace' || key === 'Delete') {
    event.preventDefault(); // Prevent browser back
    deleteLastDigit();
    highlightButton('.btn--delete');
    return;
  }
});

/**
 * Highlight button briefly when key is pressed
 */
function highlightButton(selector) {
  const button = document.querySelector(selector);
  if (button) {
    button.classList.add('btn--active');
    setTimeout(() => {
      button.classList.remove('btn--active');
    }, 150);
  }
}

/* ==========================================================================
   Initialization
   ========================================================================== */

/**
 * Initialize calculator when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Web Calculator initialized');
  console.log('Implemented: VS-01 through VS-07');

  // VS-01: Initialize display
  updateDisplay();

  // VS-02: Add event listeners for number buttons
  document.querySelectorAll('.btn--number').forEach(button => {
    button.addEventListener('click', () => {
      const digit = button.getAttribute('data-digit');
      handleDigitInput(digit);
    });
  });

  // VS-02: Add event listener for decimal button
  const decimalButton = document.querySelector('.btn--decimal');
  if (decimalButton) {
    decimalButton.addEventListener('click', handleDecimalInput);
  }

  // VS-03: Add event listeners for operator buttons
  document.querySelectorAll('.btn--operator').forEach(button => {
    button.addEventListener('click', () => {
      const operatorSymbol = button.getAttribute('data-operator');
      // Convert display symbols to internal operators
      const operatorMap = { '+': '+', '−': '-', '×': '*', '÷': '/' };
      const operator = operatorMap[operatorSymbol];
      handleOperatorInput(operator);
    });
  });

  // VS-04: Add event listener for equals button
  const equalsButton = document.getElementById('equalsBtn');
  if (equalsButton) {
    equalsButton.addEventListener('click', handleEquals);
  }

  // VS-05: Add event listener for clear button
  const clearButton = document.getElementById('clearBtn');
  if (clearButton) {
    clearButton.addEventListener('click', clearCalculator);
  }

  // VS-06: Add event listener for delete button
  const deleteButton = document.getElementById('deleteBtn');
  if (deleteButton) {
    deleteButton.addEventListener('click', deleteLastDigit);
  }

  // Log state for debugging
  console.log('Initial state:', calculatorState);
  console.log('All event listeners attached');
});

// Log when ready
console.log('Calculator application loaded');
