/*
 * Web Calculator - VS-01 Display & Input, VS-03 Operation, VS-04 Equals & PEMDAS
 *
 * State: currentValue (display/current operand), expressionTokens (for PEMDAS),
 * previousValue, operation, awaitingOperand, displayError / displayErrorMessage.
 * currentInput is kept in sync with currentValue for backward compatibility with VS-01 tests.
 *
 * AI-Generated: true
 * Model: anthropic/claude-3.5-sonnet@2024-10-22
 * Operator: User
 * Chat ID: vs-04-implementation-20260213
 * Prompt: Implement VS-04 (Calculate Result with equals, PEMDAS, precision, tests)
 * Started: 2026-02-13T00:00:00Z
 * Ended: 2026-02-13T00:00:00Z
 * Task Duration: 00:00:00
 * AI Log: ai-logs/2026/02/13/vs-04-implementation-20260213/conversation.md
 * Source: Cursor
 */

// ===================================
// State Management
// ===================================

/** @typedef {{ type: 'number', value: string }} NumberToken */
/** @typedef {{ type: 'operator', value: string }} OperatorToken */
/** @typedef {NumberToken | OperatorToken} ExpressionToken */

const calculatorState = {
    /** Current display value / operand being entered */
    currentValue: "0",
    /** @type {string} Alias for currentValue (VS-01 test compatibility) */
    currentInput: "0",
    /** First operand when using single-op model (legacy) */
    previousValue: "",
    /** Last selected operation: "+", "-", "*", "/" */
    operation: "",
    /** True after operator or equals; next digit starts a new number */
    awaitingOperand: false,
    /** Tokens for multi-op PEMDAS: [{ type, value }, ...] */
    expressionTokens: [],
    /** When true, display shows error message */
    displayError: false,
    /** Error message to show (e.g. "Cannot divide by zero") */
    displayErrorMessage: ""
};

// ===================================
// DOM Elements
// ===================================

let displayElement = null;
let numberButtons = null;
let backspaceButton = null;
let equalsButton = null;
let clearButton = null;

// ===================================
// Display
// ===================================

function updateDisplay() {
  if (!displayElement) return;
  if (calculatorState.displayError && calculatorState.displayErrorMessage) {
    displayElement.textContent = calculatorState.displayErrorMessage;
    return;
  }
  if (calculatorState.displayError) {
    displayElement.textContent = "Error";
    return;
  }
  const displayValue = calculatorState.currentValue || "0";
  displayElement.textContent = displayValue;
}

// ===================================
// Input: digits and decimal
// ===================================

/**
 * Appends a digit to the current operand. Handles leading zero and awaitingOperand.
 *
 * @param {string} digit - Single character "0"-"9"
 */
function inputDigit(digit) {
  if (calculatorState.displayError) {
    calculatorState.displayError = false;
    calculatorState.displayErrorMessage = "";
    calculatorState.currentValue = digit === "0" ? "0" : digit;
    calculatorState.currentInput = calculatorState.currentValue;
    calculatorState.awaitingOperand = false;
    calculatorState.expressionTokens = [];
    calculatorState.previousValue = "";
    calculatorState.operation = "";
    updateDisplay();
    return;
  }

  // Sync from currentInput when set by tests or external code
  if (calculatorState.currentInput !== calculatorState.currentValue) {
    calculatorState.currentValue = calculatorState.currentInput;
  }
  const cur = calculatorState.currentValue;
  if (calculatorState.awaitingOperand) {
    calculatorState.currentValue = digit === "0" ? "0" : digit;
    calculatorState.awaitingOperand = false;
  } else if (cur === "0" && digit !== "0") {
    calculatorState.currentValue = digit;
  } else if (cur === "0" && digit === "0") {
    return;
  } else {
    calculatorState.currentValue = cur + digit;
  }
  calculatorState.currentInput = calculatorState.currentValue;
  updateDisplay();
}

/**
 * Appends a decimal point if the current number does not already contain one.
 */
function inputDecimal() {
  if (calculatorState.displayError) {
    calculatorState.displayError = false;
    calculatorState.displayErrorMessage = "";
    calculatorState.currentValue = "0.";
    calculatorState.currentInput = "0.";
    calculatorState.awaitingOperand = false;
    calculatorState.expressionTokens = [];
    calculatorState.previousValue = "";
    calculatorState.operation = "";
    updateDisplay();
    return;
  }
  const cur = calculatorState.currentValue;
  if (calculatorState.awaitingOperand) {
    calculatorState.currentValue = "0.";
    calculatorState.awaitingOperand = false;
  } else if (cur.indexOf(".") >= 0) {
    return;
  } else {
    calculatorState.currentValue = cur + ".";
  }
  calculatorState.currentInput = calculatorState.currentValue;
  updateDisplay();
}

// ===================================
// Operator selection (append to expression tokens)
// ===================================

/** Maps display symbols to internal operation symbols */
const OPERATOR_MAP = { "+": "+", "−": "-", "×": "*", "÷": "/" };

/**
 * Handles operator button press: appends current number and operator to expression tokens.
 *
 * @param {string} displayOp - Display symbol: "+", "−", "×", "÷"
 */
function selectOperator(displayOp) {
  if (calculatorState.displayError) return;
  const op = OPERATOR_MAP[displayOp] ?? displayOp;
  const value = calculatorState.currentValue || "0";
  calculatorState.expressionTokens.push({ type: "number", value });
  calculatorState.expressionTokens.push({ type: "operator", value: displayOp });
  calculatorState.previousValue = value;
  calculatorState.operation = op;
  calculatorState.currentValue = "0";
  calculatorState.currentInput = "0";
  calculatorState.awaitingOperand = true;
  updateDisplay();
}

// ===================================
// Equals: evaluate expression with PEMDAS
// ===================================

function handleEquals() {
  if (calculatorState.displayError) return;

  const currentVal = calculatorState.currentValue || "0";
  const tokens = calculatorState.expressionTokens.slice();
  tokens.push({ type: "number", value: currentVal });

  if (tokens.length === 1) {
    calculatorState.currentValue = tokens[0].value;
    calculatorState.currentInput = calculatorState.currentValue;
    calculatorState.expressionTokens = [];
    calculatorState.previousValue = "";
    calculatorState.operation = "";
    calculatorState.awaitingOperand = true;
    updateDisplay();
    return;
  }

  let result;
  if (typeof calculator !== "undefined" && calculator.evaluateExpression) {
    result = calculator.evaluateExpression(tokens);
  } else if (typeof require === "function") {
    try {
      const calc = require("./calculator.js");
      result = calc.evaluateExpression(tokens);
    } catch (e) {
      result = { error: true, message: "Invalid input" };
    }
  } else {
    result = { error: true, message: "Invalid input" };
  }

  if (result.error) {
    calculatorState.displayError = true;
    calculatorState.displayErrorMessage = result.message || "Error";
    updateDisplay();
    return;
  }

  calculatorState.currentValue = result.result;
  calculatorState.currentInput = result.result;
  calculatorState.expressionTokens = [];
  calculatorState.previousValue = "";
  calculatorState.operation = "";
  calculatorState.awaitingOperand = true;
  calculatorState.displayError = false;
  calculatorState.displayErrorMessage = "";
  updateDisplay();
}

/**
 * Deletes the last character from the current input
 * Handles edge cases like single digit, empty input, and error states
 */
function deleteLastDigit() {
  // Reset error state if present
  if (calculatorState.displayError) {
    calculatorState.displayError = false;
    calculatorState.displayErrorMessage = "";
    calculatorState.currentValue = "0";
    calculatorState.currentInput = "0";
    calculatorState.awaitingOperand = false;
    updateDisplay();
    return;
  }
  
  const cur = calculatorState.currentValue;
  // If current input has only one character (or just "0"), set to "0"
  if (cur.length === 1) {
    calculatorState.currentValue = "0";
  }
  // If current input is just a negative sign "-", set to "0"
  else if (cur === "-") {
    calculatorState.currentValue = "0";
  }
  // Otherwise, remove the last character
  else {
    calculatorState.currentValue = cur.slice(0, -1);
    
    // If result is empty or just a negative sign, set to "0"
    if (calculatorState.currentValue === "" || calculatorState.currentValue === "-") {
      calculatorState.currentValue = "0";
    }
  }
  
  calculatorState.currentInput = calculatorState.currentValue;
  updateDisplay();
}

/**
 * Clears the calculator to initial state (VS-04 compatible)
 */
function clearCalculator() {
  calculatorState.currentValue = "0";
  calculatorState.currentInput = "0";
  calculatorState.previousValue = "";
  calculatorState.operation = "";
  calculatorState.awaitingOperand = false;
  calculatorState.expressionTokens = [];
  calculatorState.displayError = false;
  calculatorState.displayErrorMessage = "";

  if (displayElement && displayElement.classList) {
    displayElement.classList.remove('error');
  }
  updateDisplay();
}

// ===================================
// Event Handlers
// ===================================

function handleNumberClick(event) {
  const digit = event.target.dataset.digit;
  if (digit !== undefined) inputDigit(digit);
}

function handleDecimalClick(event) {
  if (event.target.dataset.decimal !== undefined) inputDecimal();
}

function handleOperatorClick(event) {
  const op = event.target.dataset.operator;
  if (op !== undefined) selectOperator(op);
}

function handleKeydown(event) {
  // Handle Backspace key (VS-07 integration)
  if (event.key === "Backspace") {
    event.preventDefault();
    deleteLastDigit();
    return;
  }
  
  if (event.key === "Enter") {
    const tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : "";
    if (tag !== "input" && tag !== "textarea") {
      event.preventDefault();
      handleEquals();
    }
    return;
  }
  const digit = event.key >= "0" && event.key <= "9" ? event.key : null;
  if (digit !== null) {
    event.preventDefault();
    inputDigit(digit);
    return;
  }
  const opMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  if (Object.prototype.hasOwnProperty.call(opMap, event.key)) {
    event.preventDefault();
    selectOperator(opMap[event.key]);
  }
}

// ===================================
// Initialization
// ===================================

function initializeEventListeners() {
  numberButtons.forEach((button) => button.addEventListener("click", handleNumberClick));
  const decimalBtn = document.querySelector(".btn--decimal");
  if (decimalBtn) decimalBtn.addEventListener("click", handleDecimalClick);
  document.querySelectorAll(".btn--operator").forEach((btn) => {
    btn.addEventListener("click", handleOperatorClick);
  });
  const equalsBtn = document.getElementById("equalsBtn");
  if (equalsBtn) equalsBtn.addEventListener("click", handleEquals);
  
  // VS-07: Backspace button
  backspaceButton = document.getElementById("backspaceBtn");
  if (backspaceButton) backspaceButton.addEventListener("click", deleteLastDigit);
  
  // Clear button
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) clearBtn.addEventListener("click", clearCalculator);
  
  document.addEventListener("keydown", handleKeydown);
}

function initializeCalculator() {
  if (typeof document.querySelector !== "function" || typeof document.getElementById !== "function") {
    return;
  }
  displayElement = document.getElementById("displayValue");
  numberButtons = document.querySelectorAll(".btn--number");
  if (!displayElement) return;
  updateDisplay();
  initializeEventListeners();
}

function shouldRunInit() {
  return typeof window !== "undefined" && typeof document !== "undefined" && document.readyState !== undefined;
}

if (shouldRunInit()) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCalculator);
  } else {
    initializeCalculator();
  }
}

// ===================================
// Exports (for testing)
// ===================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculatorState,
    inputDigit,
    inputDecimal,
    updateDisplay,
    selectOperator,
    handleEquals,
    deleteLastDigit,
    clearCalculator,
    OPERATOR_MAP
  };
}
