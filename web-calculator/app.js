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
// DOM Elements
// ===================================

const displayElement = document.getElementById('displayValue');
const numberButtons = document.querySelectorAll('.btn--number');

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
}

// ===================================
// Initialization
// ===================================

/**
 * Initialize the calculator on page load
 */
function initializeCalculator() {
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
        updateDisplay
    };
}
