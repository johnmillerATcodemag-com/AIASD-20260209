/*
AI-Generated: true
Model: anthropic/claude-3.5-sonnet@2024-10-22
Operator: User
Chat ID: vs-01-implementation-20260213
Prompt: Create JavaScript state management, event listeners for number buttons, inputDigit function with leading zero logic, and updateDisplay function
Started: 2026-02-13T00:16:00Z
Ended: 2026-02-13T00:20:00Z
Task Duration: 00:04:00
AI Log: ai-logs/2026/02/13/vs-01-implementation-20260213/conversation.md
Source: johnmillerATcodemag-com
*/

/**
 * Web Calculator - VS-01: Display & Number Input
 * 
 * This module implements the foundational calculator functionality:
 * - Display component that shows current value
 * - Number input (digits 0-9)
 * - Leading zero replacement logic
 */

// ===================================
// State Management
// ===================================

/**
 * Calculator state object
 * @type {Object}
 */
const calculatorState = {
    currentInput: '0',      // Current display value
    previousInput: null,    // Previous operand
    operator: null,         // Current operator (+, -, ×, ÷)
    waitingForOperand: false, // Flag indicating waiting for next number
    hasError: false,        // Error state flag
    lastOperation: null     // Store last operation for repeat equals
};

// ===================================
// DOM Elements (initialized on DOMContentLoaded)
// ===================================

let displayElement = null;
let numberButtons = null;
let equalsButton = null;
let clearButton = null;

// ===================================
// Core Functions
// ===================================

/**
 * Updates the display with the current state value
 * Handles error states and ensures proper formatting
 */
function updateDisplay() {
    if (calculatorState.hasError) {
        // Error handled by displayError function
        return;
    }
    
    // Display "0" if currentInput is empty
    const displayValue = calculatorState.currentInput || '0';
    
    if (displayElement && displayElement.textContent !== undefined) {
        displayElement.textContent = displayValue;
        displayElement.classList.remove('error');
    }
}

/**
 * Appends a digit to the current input
 * Handles leading zero replacement logic
 * 
 * @param {string} digit - The digit to append (0-9)
 */
function inputDigit(digit) {
    // Reset error state if present
    if (calculatorState.hasError) {
        clearCalculator();
        calculatorState.currentInput = '';
    }
    
    // Handle leading zero replacement
    // If current input is "0" and user inputs another digit, replace the zero
    if (calculatorState.currentInput === '0' && digit !== '0') {
        calculatorState.currentInput = digit;
    } 
    // If current input is "0" and user inputs "0", keep it as "0"
    else if (calculatorState.currentInput === '0' && digit === '0') {
        // Do nothing, keep as "0"
        return;
    }
    // Otherwise, append the digit
    else {
        calculatorState.currentInput += digit;
    }
    
    updateDisplay();
}

/**
 * Handles number button click events
 * 
 * @param {Event} event - The click event
 */
function handleNumberClick(event) {
    const digit = event.target.dataset.digit;
    if (digit !== undefined) {
        inputDigit(digit);
    }
}

/**
 * Evaluates the current expression
 * Handles calculation, error checking, and result chaining
 */
function evaluateExpression() {
    // Need both operands and an operator
    if (calculatorState.previousInput === null || calculatorState.operator === null) {
        // Store for repeat equals
        calculatorState.lastOperation = {
            value: parseFloat(calculatorState.currentInput),
            operator: '+',
            operand: 0
        };
        return;
    }
    
    const prev = parseFloat(calculatorState.previousInput);
    const current = parseFloat(calculatorState.currentInput);
    const operator = calculatorState.operator;
    
    // Store operation for repeat equals
    calculatorState.lastOperation = {
        value: prev,
        operator: operator,
        operand: current
    };
    
    let result;
    
    try {
        // Perform calculation based on operator
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    displayError('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Handle potential calculation errors
        if (!isFinite(result)) {
            displayError('Invalid calculation');
            return;
        }
        
        // Format result (remove unnecessary decimals)
        result = parseFloat(result.toFixed(10));
        
        // Update state with result
        calculatorState.currentInput = result.toString();
        calculatorState.previousInput = result.toString();
        calculatorState.operator = null;
        calculatorState.waitingForOperand = true;
        
        updateDisplay();
    } catch (error) {
        displayError('Calculation error');
    }
}

/**
 * Handles repeat equals functionality
 * Applies the last operation to the current value
 */
function repeatLastOperation() {
    if (!calculatorState.lastOperation) {
        return;
    }
    
    const current = parseFloat(calculatorState.currentInput);
    const { operator, operand } = calculatorState.lastOperation;
    let result;
    
    try {
        switch (operator) {
            case '+':
                result = current + operand;
                break;
            case '-':
                result = current - operand;
                break;
            case '×':
                result = current * operand;
                break;
            case '÷':
                if (operand === 0) {
                    displayError('Cannot divide by zero');
                    return;
                }
                result = current / operand;
                break;
            default:
                return;
        }
        
        if (!isFinite(result)) {
            displayError('Invalid calculation');
            return;
        }
        
        result = parseFloat(result.toFixed(10));
        calculatorState.currentInput = result.toString();
        calculatorState.previousInput = result.toString();
        updateDisplay();
    } catch (error) {
        displayError('Calculation error');
    }
}

/**
 * Clears the calculator to initial state
 */
function clearCalculator() {
    calculatorState.currentInput = '0';
    calculatorState.previousInput = null;
    calculatorState.operator = null;
    calculatorState.waitingForOperand = false;
    calculatorState.hasError = false;
    calculatorState.lastOperation = null;
    
    if (displayElement && displayElement.classList) {
        displayElement.classList.remove('error');
    }
    updateDisplay();
}

/**
 * Displays an error message
 * @param {string} message - The error message to display
 */
function displayError(message) {
    calculatorState.hasError = true;
    
    if (displayElement && displayElement.textContent !== undefined) {
        displayElement.textContent = message;
        displayElement.classList.add('error');
    }
}

/**
 * Handles equals button click
 */
function handleEqualsClick() {
    if (calculatorState.hasError) {
        return;
    }
    
    // If we already evaluated, repeat the last operation
    if (calculatorState.waitingForOperand && calculatorState.lastOperation) {
        repeatLastOperation();
    } else {
        evaluateExpression();
    }
}

/**
 * Handles clear button click
 */
function handleClearClick() {
    clearCalculator();
}

// ===================================
// Event Listeners
// ===================================

/**
 * Initialize event listeners for all number buttons
 */
function initializeEventListeners() {
    numberButtons.forEach(button => {
        button.addEventListener('click', handleNumberClick);
    });
    
    // Add equals button listener
    if (equalsButton) {
        equalsButton.addEventListener('click', handleEqualsClick);
    }
    
    // Add clear button listener
    if (clearButton) {
        clearButton.addEventListener('click', handleClearClick);
    }
}

// ===================================
// Initialization
// ===================================

/**
 * Initialize the calculator on page load
 */
function initializeCalculator() {
    // Initialize DOM element references
    displayElement = document.getElementById('displayValue');
    numberButtons = document.querySelectorAll('.btn--number');
    equalsButton = document.getElementById('equalsBtn');
    clearButton = document.getElementById('clearBtn');
    
    // Only initialize if in browser environment
    if (displayElement && displayElement.textContent !== undefined) {
        // Set initial display
        updateDisplay();
        
        // Attach event listeners
        initializeEventListeners();
        
        console.log('Calculator initialized successfully - VS-03');
    }
}

// Initialize when DOM is fully loaded
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCalculator);
    } else {
        // DOM is already loaded
        initializeCalculator();
    }
}

// ===================================
// Exports (for testing)
// ===================================

// Export functions for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculatorState,
        inputDigit,
        updateDisplay,
        evaluateExpression,
        clearCalculator,
        displayError,
        repeatLastOperation
    };
}
