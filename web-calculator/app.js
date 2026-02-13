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
    displayError: false     // Error state flag
};

// ===================================
// DOM Elements (initialized on DOMContentLoaded)
// ===================================

let displayElement = null;
let numberButtons = null;
let backspaceButton = null;

// ===================================
// Core Functions
// ===================================

/**
 * Updates the display with the current state value
 * Handles error states and ensures proper formatting
 */
function updateDisplay() {
    if (calculatorState.displayError) {
        displayElement.textContent = 'Error';
        return;
    }
    
    // Display "0" if currentInput is empty
    const displayValue = calculatorState.currentInput || '0';
    displayElement.textContent = displayValue;
}

/**
 * Appends a digit to the current input
 * Handles leading zero replacement logic
 * 
 * @param {string} digit - The digit to append (0-9)
 */
function inputDigit(digit) {
    // Reset error state if present
    if (calculatorState.displayError) {
        calculatorState.displayError = false;
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
 * Deletes the last character from the current input
 * Handles edge cases like single digit, empty input, and error states
 */
function deleteLastDigit() {
    // Reset error state if present
    if (calculatorState.displayError) {
        calculatorState.displayError = false;
        calculatorState.currentInput = '0';
        updateDisplay();
        return;
    }
    
    // If current input has only one character (or just "0"), set to "0"
    if (calculatorState.currentInput.length === 1) {
        calculatorState.currentInput = '0';
    }
    // If current input is just a negative sign "-", set to "0"
    else if (calculatorState.currentInput === '-') {
        calculatorState.currentInput = '0';
    }
    // Otherwise, remove the last character
    else {
        calculatorState.currentInput = calculatorState.currentInput.slice(0, -1);
        
        // If result is empty or just a negative sign, set to "0"
        if (calculatorState.currentInput === '' || calculatorState.currentInput === '-') {
            calculatorState.currentInput = '0';
        }
    }
    
    updateDisplay();
}

/**
 * Handles keyboard input events
 * 
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardInput(event) {
    // Handle number keys (0-9)
    if (event.key >= '0' && event.key <= '9') {
        inputDigit(event.key);
        event.preventDefault();
    }
    // Handle Backspace key
    else if (event.key === 'Backspace') {
        deleteLastDigit();
        event.preventDefault();
    }
}

// ===================================
// Event Listeners
// ===================================

/**
 * Initialize event listeners for all buttons and keyboard
 */
function initializeEventListeners() {
    // Number button click handlers
    numberButtons.forEach(button => {
        button.addEventListener('click', handleNumberClick);
    });
    
    // Backspace button click handler
    if (backspaceButton) {
        backspaceButton.addEventListener('click', deleteLastDigit);
    }
    
    // Keyboard input handler
    document.addEventListener('keydown', handleKeyboardInput);
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
    backspaceButton = document.getElementById('backspaceBtn');
    
    // Set initial display
    updateDisplay();
    
    // Attach event listeners
    initializeEventListeners();
    
    console.log('Calculator initialized successfully');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCalculator);
} else {
    // DOM is already loaded
    initializeCalculator();
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
        deleteLastDigit,
        handleKeyboardInput
    };
}
