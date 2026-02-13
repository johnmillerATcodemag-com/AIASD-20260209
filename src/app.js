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

/* ==========================================================================
   VS-09: History State
   ========================================================================== */

/**
 * History state object
 * Stores calculation history with localStorage persistence
 */
const historyState = {
  items: [],           // Array of calculation objects
  maxItems: 20,        // Maximum number of history items (per spec)
  isVisible: true      // Whether history panel is visible
};

/**
 * History item structure:
 * {
 *   expression: "5 + 3",
 *   result: "8",
 *   timestamp: "2026-02-14T10:30:00Z",
 *   id: "unique-id"
 * }
 */

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
    const operatorSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    const expression = `${previousValue} ${operatorSymbols[operation]} ${currentValue}`;

    // VS-09: Add to history
    addToHistory(expression, result.result);

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
   VS-09: Calculation History
   ========================================================================== */

/**
 * Add calculation to history
 */
function addToHistory(expression, result) {
  const historyItem = {
    expression: expression,
    result: result,
    timestamp: new Date().toISOString(),
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
  };

  // Add to beginning of array (most recent first)
  historyState.items.unshift(historyItem);

  // Keep only last 20 items (per spec)
  if (historyState.items.length > historyState.maxItems) {
    historyState.items = historyState.items.slice(0, historyState.maxItems);
  }

  // Save to localStorage
  saveHistoryToLocalStorage();

  // Update UI
  renderHistory();
}

/**
 * Render history list
 */
function renderHistory() {
  const historyList = document.getElementById('historyList');

  if (historyState.items.length === 0) {
    historyList.innerHTML = '<p class="history-panel__empty">No calculations yet</p>';
    return;
  }

  historyList.innerHTML = historyState.items.map(item => `
    <div class="history-item" data-id="${item.id}" tabindex="0" role="button" aria-label="Recall calculation: ${item.expression} equals ${item.result}">
      <div class="history-item__expression">${item.expression}</div>
      <div class="history-item__result">= ${item.result}</div>
      <div class="history-item__timestamp">${formatTimestamp(item.timestamp)}</div>
    </div>
  `).join('');

  // Add click handlers to history items
  document.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      recallFromHistory(id);
    });

    // Keyboard support for history items
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const id = item.getAttribute('data-id');
        recallFromHistory(id);
      }
    });
  });
}

/**
 * Recall value from history
 */
function recallFromHistory(id) {
  const item = historyState.items.find(h => h.id === id);
  if (item) {
    calculatorState.currentValue = item.result;
    calculatorState.awaitingOperand = false;
    calculatorState.displayError = false;
    updateDisplay();
  }
}

/**
 * Clear all history
 */
function clearHistory() {
  if (historyState.items.length === 0) {
    return;
  }

  if (confirm('Clear all calculation history?')) {
    historyState.items = [];
    saveHistoryToLocalStorage();
    renderHistory();
  }
}

/**
 * Toggle history panel visibility
 */
function toggleHistory() {
  const historyPanel = document.getElementById('historyPanel');
  historyState.isVisible = !historyState.isVisible;

  if (historyState.isVisible) {
    historyPanel.classList.remove('hidden');
  } else {
    historyPanel.classList.add('hidden');
  }
}

/**
 * Save history to localStorage
 */
function saveHistoryToLocalStorage() {
  try {
    localStorage.setItem('calculatorHistory', JSON.stringify(historyState.items));
  } catch (error) {
    console.error('Failed to save history to localStorage:', error);
  }
}

/**
 * Load history from localStorage
 */
function loadHistoryFromLocalStorage() {
  try {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
      historyState.items = JSON.parse(saved);
      renderHistory();
    }
  } catch (error) {
    console.error('Failed to load history from localStorage:', error);
    historyState.items = [];
  }
}

/**
 * Format timestamp for display
 */
function formatTimestamp(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;

  return date.toLocaleDateString();
}

/* ==========================================================================
   VS-10: Memory Functions
   ========================================================================== */

/**
 * Memory state object
 */
const memoryState = {
  value: 0,
  hasValue: false
};

/**
 * Update memory indicator visibility
 */
function updateMemoryIndicator() {
  const indicator = document.getElementById('memoryIndicator');
  if (indicator) {
    indicator.style.display = memoryState.hasValue ? 'block' : 'none';
  }
}

/**
 * M+ (Memory Add)
 * Adds current value to memory
 */
function memoryAdd() {
  const value = parseFloat(calculatorState.currentValue) || 0;
  memoryState.value += value;
  memoryState.hasValue = true;
  updateMemoryIndicator();
  saveMemoryToLocalStorage();
}

/**
 * M- (Memory Subtract)
 * Subtracts current value from memory
 */
function memorySubtract() {
  const value = parseFloat(calculatorState.currentValue) || 0;
  memoryState.value -= value;
  memoryState.hasValue = true;
  updateMemoryIndicator();
  saveMemoryToLocalStorage();
}

/**
 * MR (Memory Recall)
 * Loads memory value to display
 */
function memoryRecall() {
  if (!memoryState.hasValue) {
    return; // No memory to recall
  }

  calculatorState.currentValue = memoryState.value.toString();
  calculatorState.awaitingOperand = false;
  calculatorState.displayError = false;
  updateDisplay();
}

/**
 * MC (Memory Clear)
 * Clears memory
 */
function memoryClear() {
  memoryState.value = 0;
  memoryState.hasValue = false;
  updateMemoryIndicator();
  saveMemoryToLocalStorage();
}

/**
 * Save memory to localStorage
 */
function saveMemoryToLocalStorage() {
  try {
    localStorage.setItem('calculatorMemory', JSON.stringify(memoryState));
  } catch (error) {
    console.error('Failed to save memory to localStorage:', error);
  }
}

/**
 * Load memory from localStorage
 */
function loadMemoryFromLocalStorage() {
  try {
    const saved = localStorage.getItem('calculatorMemory');
    if (saved) {
      const loaded = JSON.parse(saved);
      memoryState.value = loaded.value || 0;
      memoryState.hasValue = loaded.hasValue || false;
      updateMemoryIndicator();
    }
  } catch (error) {
    console.error('Failed to load memory from localStorage:', error);
    memoryState.value = 0;
    memoryState.hasValue = false;
  }
}

/* ==========================================================================
   VS-12: Advanced Operations
   ========================================================================== */

/**
 * Handle percentage operation
 */
function handlePercentage() {
  const current = parseFloat(calculatorState.currentValue) || 0;

  if (calculatorState.operation && calculatorState.previousValue) {
    // Contextual percentage: 100 + 20% = 120 (adds 20% of 100)
    const base = parseFloat(calculatorState.previousValue);
    const percentValue = (current / 100) * base;
    calculatorState.currentValue = percentValue.toString();
  } else {
    // Simple percentage: 20% = 0.2
    calculatorState.currentValue = (current / 100).toString();
  }

  updateDisplay();
}

/**
 * Handle square root operation
 */
function handleSquareRoot() {
  const value = parseFloat(calculatorState.currentValue) || 0;

  if (value < 0) {
    calculatorState.displayError = true;
    calculatorState.currentValue = 'Cannot calculate √ of negative';
    updateDisplay();
    return;
  }

  const result = Math.sqrt(value);
  calculatorState.currentValue = result.toString();
  calculatorState.awaitingOperand = true;
  updateDisplay();
}

/**
 * Handle square operation
 */
function handleSquare() {
  const value = parseFloat(calculatorState.currentValue) || 0;
  const result = value * value;

  calculatorState.currentValue = result.toString();
  calculatorState.awaitingOperand = true;
  updateDisplay();
}

/* ==========================================================================
   VS-13: Copy/Paste Support
   ========================================================================== */

/**
 * Copy current display value to clipboard
 */
async function copyToClipboard() {
  const value = calculatorState.currentValue || '0';

  try {
    await navigator.clipboard.writeText(value);
    showCopyFeedback();
  } catch (err) {
    console.error('Failed to copy:', err);
    // Fallback for browsers without clipboard API
    fallbackCopy(value);
  }
}

/**
 * Paste from clipboard and validate
 */
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    const trimmed = text.trim();

    // Validate that it's a valid number
    const parsed = parseFloat(trimmed);
    if (!isNaN(parsed) && trimmed !== '') {
      calculatorState.currentValue = trimmed;
      calculatorState.awaitingOperand = false;
      calculatorState.displayError = false;
      updateDisplay();
    }
  } catch (err) {
    console.error('Failed to paste:', err);
  }
}

/**
 * Show copy feedback toast
 */
function showCopyFeedback() {
  const feedback = document.getElementById('copyFeedback');
  if (feedback) {
    feedback.classList.add('show');
    setTimeout(() => {
      feedback.classList.remove('show');
    }, 1500);
  }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }

  document.body.removeChild(textarea);
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

  // Copy (VS-13)
  if ((event.ctrlKey || event.metaKey) && key === 'c') {
    event.preventDefault();
    copyToClipboard();
    return;
  }

  // Paste (VS-13)
  if ((event.ctrlKey || event.metaKey) && key === 'v') {
    event.preventDefault();
    pasteFromClipboard();
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
  console.log('Implemented: VS-01 through VS-07, VS-09, VS-10');

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

  // VS-09: Add event listeners for history
  const historyToggle = document.getElementById('historyToggle');
  if (historyToggle) {
    historyToggle.addEventListener('click', toggleHistory);
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', clearHistory);
  }

  // VS-09: Load history from localStorage
  loadHistoryFromLocalStorage();

  // VS-10: Add event listeners for memory buttons
  const mcBtn = document.getElementById('mcBtn');
  if (mcBtn) {
    mcBtn.addEventListener('click', memoryClear);
  }

  const mrBtn = document.getElementById('mrBtn');
  if (mrBtn) {
    mrBtn.addEventListener('click', memoryRecall);
  }

  const mPlusBtn = document.getElementById('mPlusBtn');
  if (mPlusBtn) {
    mPlusBtn.addEventListener('click', memoryAdd);
  }

  const mMinusBtn = document.getElementById('mMinusBtn');
  if (mMinusBtn) {
    mMinusBtn.addEventListener('click', memorySubtract);
  }

  // VS-10: Load memory from localStorage
  loadMemoryFromLocalStorage();

  // VS-12: Add event listeners for advanced operations
  const percentBtn = document.getElementById('percentBtn');
  if (percentBtn) {
    percentBtn.addEventListener('click', handlePercentage);
  }

  const sqrtBtn = document.getElementById('sqrtBtn');
  if (sqrtBtn) {
    sqrtBtn.addEventListener('click', handleSquareRoot);
  }

  const squareBtn = document.getElementById('squareBtn');
  if (squareBtn) {
    squareBtn.addEventListener('click', handleSquare);
  }

  // VS-13: Add event listener for copy button
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyToClipboard);
  }

  // Log state for debugging
  console.log('Initial state:', calculatorState);
  console.log('History state:', historyState);
  console.log('Memory state:', memoryState);
  console.log('All event listeners attached');
});

// Log when ready
console.log('Calculator application loaded');
