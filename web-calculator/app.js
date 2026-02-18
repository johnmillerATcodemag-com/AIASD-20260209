/*
 * Web Calculator - VS-01 Display & Input, VS-03 Operation, VS-04 Equals & PEMDAS, VS-09 History
 *
 * State: currentValue (display/current operand), expressionTokens (for PEMDAS),
 * previousValue, operation, awaitingOperand, displayError / displayErrorMessage.
 * currentInput is kept in sync with currentValue for backward compatibility with VS-01 tests.
 * historyState: items (last 20, newest first), maxItems: 20.
 *
 * Wrapped in an IIFE to avoid polluting the global scope.
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

(function () {
  "use strict";

  // ===================================
  // State Management
  // ===================================

  /** @typedef {{ type: 'number', value: string }} NumberToken */
  /** @typedef {{ type: 'operator', value: string }} OperatorToken */
  /** @typedef {NumberToken | OperatorToken} ExpressionToken */
  /** @typedef {{ id: string, expression: string, result: string, timestamp: string }} HistoryItem */

  var calculatorState = {
    /** Current display value / operand being entered (alias: currentInput for tests) */
    currentValue: "0",
    /** @type {string} Kept in sync with currentValue for VS-01 test compatibility */
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

  /** @type {{ items: HistoryItem[], maxItems: number }} */
  var historyState = {
    items: [],
    maxItems: 20
  };

  var HISTORY_STORAGE_KEY = "web-calculator-history";

  // ===================================
  // History (VS-09)
  // ===================================

  /**
   * Builds display expression string from tokens and final operand.
   *
   * @param {ExpressionToken[]} tokens - Expression tokens (numbers and operators)
   * @param {string} currentValue - Final operand value
   * @returns {string} Expression string (e.g. "5 + 3")
   */
  function buildExpressionString(tokens, currentValue) {
    var parts = tokens.map(function (t) { return t.value; });
    parts.push(currentValue);
    return parts.join(" ").trim();
  }

  /**
   * Generates a unique id for a history item.
   *
   * @returns {string}
   */
  function generateHistoryId() {
    return "history-" + String(Date.now()) + "-" + Math.random().toString(36).slice(2);
  }

  /**
   * Adds a calculation to history (newest first). Trims to maxItems and persists to localStorage.
   *
   * @param {string} expression - Display expression (e.g. "5 + 3")
   * @param {string} result - Result string (e.g. "8")
   */
  function addToHistory(expression, result) {
    var item = {
      id: generateHistoryId(),
      expression: expression,
      result: result,
      timestamp: new Date().toISOString()
    };
    historyState.items.unshift(item);
    if (historyState.items.length > historyState.maxItems) {
      historyState.items = historyState.items.slice(0, historyState.maxItems);
    }
    saveHistoryToStorage();
    renderHistory();
  }

  /**
   * Loads history from localStorage into historyState.items. Safe to call when localStorage is unavailable.
   */
  function loadHistoryFromStorage() {
    if (typeof localStorage === "undefined") return;
    try {
      var raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          historyState.items = parsed.filter(
            function (entry) {
              return (
                entry &&
                typeof entry.id === "string" &&
                typeof entry.expression === "string" &&
                typeof entry.result === "string" &&
                typeof entry.timestamp === "string"
              );
            }
          );
          if (historyState.items.length > historyState.maxItems) {
            historyState.items = historyState.items.slice(0, historyState.maxItems);
          }
        }
      }
    } catch (_) {
      historyState.items = [];
    }
  }

  /**
   * Saves historyState.items to localStorage. Safe when localStorage is unavailable.
   */
  function saveHistoryToStorage() {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyState.items));
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  }

  /**
   * Clears history (state and localStorage) and re-renders the list.
   */
  function clearHistory() {
    historyState.items = [];
    saveHistoryToStorage();
    renderHistory();
  }

  /**
   * Loads a history result into the display (recall). Used as start of new calculation.
   *
   * @param {string} result - Result string to load
   */
  function recallFromHistory(result) {
    if (calculatorState.displayError) {
      calculatorState.displayError = false;
      calculatorState.displayErrorMessage = "";
    }
    calculatorState.currentValue = result;
    calculatorState.currentInput = result;
    calculatorState.awaitingOperand = true;
    calculatorState.expressionTokens = [];
    calculatorState.previousValue = "";
    calculatorState.operation = "";
    updateDisplay();
  }

  /**
   * Renders history list (newest first) into a DocumentFragment, then replaces list contents in one operation.
   * Uses event delegation on historyListElement (wired in init) instead of per-item listeners.
   */
  function renderHistory() {
    if (!historyListElement) return;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < historyState.items.length; i++) {
      var item = historyState.items[i];
      var li = document.createElement("li");
      li.className = "history-item-wrapper";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "history-item";
      btn.setAttribute("data-result", item.result);
      btn.setAttribute("aria-label", "Recall result " + item.result + " from " + item.expression);
      var exprSpan = document.createElement("span");
      exprSpan.className = "history-item__expression";
      exprSpan.textContent = item.expression;
      var resultSpan = document.createElement("span");
      resultSpan.className = "history-item__result";
      resultSpan.textContent = " = " + item.result;
      btn.appendChild(exprSpan);
      btn.appendChild(resultSpan);
      li.appendChild(btn);
      fragment.appendChild(li);
    }
    historyListElement.innerHTML = "";
    historyListElement.appendChild(fragment);
  }

  /**
   * Delegated click handler for history list. Finds the closest .history-item button
   * and recalls its data-result value.
   *
   * @param {MouseEvent} event
   */
  function handleHistoryListClick(event) {
    var target = event.target;
    if (!target || typeof target.closest !== "function") return;
    var btn = target.closest(".history-item");
    if (!btn) return;
    var result = btn.getAttribute("data-result");
    if (result !== null) {
      recallFromHistory(result);
    }
  }

  /**
   * Toggles history panel visibility. Updates aria-expanded, aria-hidden, aria-label,
   * and manages focus (into panel when opening, back to toggle when closing).
   */
  function toggleHistory() {
    if (!historyPanelElement || !historyToggleElement) return;
    var isOpen = historyPanelElement.classList.toggle("history-panel--open");
    historyToggleElement.setAttribute("aria-expanded", String(isOpen));
    historyToggleElement.setAttribute("aria-label", isOpen ? "Hide calculation history" : "Show calculation history");
    historyPanelElement.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) {
      var firstFocusable = historyPanelElement.querySelector(".history-panel__clear") ||
        historyPanelElement.querySelector(".history-item");
      if (firstFocusable && typeof firstFocusable.focus === "function") {
        firstFocusable.focus();
      }
    } else {
      historyToggleElement.focus();
    }
  }

  /**
   * Traps Tab focus inside the history panel when it is open.
   * Wraps focus from last focusable to first (and vice-versa with Shift+Tab).
   *
   * @param {KeyboardEvent} event
   */
  function handleHistoryPanelKeydown(event) {
    if (event.key !== "Tab") return;
    if (!historyPanelElement) return;
    var focusable = historyPanelElement.querySelectorAll(
      "button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])"
    );
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // ===================================
  // DOM Elements
  // ===================================

  var displayElement = null;
  var numberButtons = null;
  var historyPanelElement = null;
  var historyToggleElement = null;
  var historyListElement = null;
  var clearHistoryBtnElement = null;

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
    var displayValue = calculatorState.currentValue || "0";
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

    /* Sync from currentInput when set by tests or external code */
    if (calculatorState.currentInput !== calculatorState.currentValue) {
      calculatorState.currentValue = calculatorState.currentInput;
    }
    var cur = calculatorState.currentValue;
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
    var cur = calculatorState.currentValue;
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
  var OPERATOR_MAP = { "+": "+", "\u2212": "-", "\u00D7": "*", "\u00F7": "/" };

  /**
   * Handles operator button press: appends current number and operator to expression tokens.
   *
   * @param {string} displayOp - Display symbol: "+", "\u2212", "\u00D7", "\u00F7"
   */
  function selectOperator(displayOp) {
    if (calculatorState.displayError) return;
    var op = OPERATOR_MAP[displayOp] || displayOp;
    var value = calculatorState.currentValue || "0";
    calculatorState.expressionTokens.push({ type: "number", value: value });
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

    var currentVal = calculatorState.currentValue || "0";
    var tokens = calculatorState.expressionTokens.slice();
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

    var result;
    if (typeof calculator !== "undefined" && calculator.evaluateExpression) {
      result = calculator.evaluateExpression(tokens);
    } else if (typeof require === "function") {
      try {
        var calc = require("./calculator.js");
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

    var expressionStr = buildExpressionString(calculatorState.expressionTokens, currentVal);
    calculatorState.currentValue = result.result;
    calculatorState.currentInput = result.result;
    calculatorState.expressionTokens = [];
    calculatorState.previousValue = "";
    calculatorState.operation = "";
    calculatorState.awaitingOperand = true;
    calculatorState.displayError = false;
    calculatorState.displayErrorMessage = "";
    addToHistory(expressionStr, result.result);
    updateDisplay();
  }

  // ===================================
  // Event Handlers
  // ===================================

  function handleNumberClick(event) {
    var digit = event.target.dataset.digit;
    if (digit !== undefined) inputDigit(digit);
  }

  function handleDecimalClick(event) {
    if (event.target.dataset.decimal !== undefined) inputDecimal();
  }

  function handleOperatorClick(event) {
    var op = event.target.dataset.operator;
    if (op !== undefined) selectOperator(op);
  }

  function handleKeydown(event) {
    var target = event.target;
    var inHistoryPanel = target && typeof target.closest === "function" && target.closest(".history-panel");
    if (event.key === "Escape") {
      if (historyPanelElement && historyPanelElement.classList.contains("history-panel--open")) {
        historyPanelElement.classList.remove("history-panel--open");
        historyPanelElement.setAttribute("aria-hidden", "true");
        if (historyToggleElement) {
          historyToggleElement.setAttribute("aria-expanded", "false");
          historyToggleElement.setAttribute("aria-label", "Show calculation history");
          historyToggleElement.focus();
        }
        event.preventDefault();
      }
      return;
    }
    if (event.key === "Enter" && !inHistoryPanel) {
      var tag = target && target.tagName ? target.tagName.toLowerCase() : "";
      if (tag !== "input" && tag !== "textarea") {
        event.preventDefault();
        handleEquals();
      }
      return;
    }
    var digit = event.key >= "0" && event.key <= "9" ? event.key : null;
    if (digit !== null) {
      event.preventDefault();
      inputDigit(digit);
      return;
    }
    var opMap = { "+": "+", "-": "\u2212", "*": "\u00D7", "/": "\u00F7" };
    if (Object.prototype.hasOwnProperty.call(opMap, event.key)) {
      event.preventDefault();
      selectOperator(opMap[event.key]);
    }
  }

  // ===================================
  // Initialization
  // ===================================

  function initializeEventListeners() {
    numberButtons.forEach(function (button) { button.addEventListener("click", handleNumberClick); });
    var decimalBtn = document.querySelector(".btn--decimal");
    if (decimalBtn) decimalBtn.addEventListener("click", handleDecimalClick);
    document.querySelectorAll(".btn--operator").forEach(function (btn) {
      btn.addEventListener("click", handleOperatorClick);
    });
    var equalsBtn = document.getElementById("equalsBtn");
    if (equalsBtn) equalsBtn.addEventListener("click", handleEquals);
    document.addEventListener("keydown", handleKeydown);

    /* History toggle: native <button> already fires click on Enter/Space,
       so only a click listener is needed (no keydown to avoid double-fire). */
    if (historyToggleElement) {
      historyToggleElement.addEventListener("click", toggleHistory);
    }
    if (clearHistoryBtnElement) {
      clearHistoryBtnElement.addEventListener("click", clearHistory);
    }
    /* Event delegation: single click listener on the history list for all items */
    if (historyListElement) {
      historyListElement.addEventListener("click", handleHistoryListClick);
    }
    /* Focus trap: keep Tab cycling inside the panel when it is open */
    if (historyPanelElement) {
      historyPanelElement.addEventListener("keydown", handleHistoryPanelKeydown);
    }
  }

  function initializeCalculator() {
    if (typeof document === "undefined" || typeof document.querySelector !== "function" || typeof document.getElementById !== "function") {
      return;
    }
    displayElement = document.getElementById("displayValue");
    numberButtons = document.querySelectorAll(".btn--number");
    historyPanelElement = document.getElementById("historyPanel");
    historyToggleElement = document.getElementById("historyToggle");
    historyListElement = document.getElementById("historyList");
    clearHistoryBtnElement = document.getElementById("clearHistoryBtn");
    if (!displayElement) return;
    loadHistoryFromStorage();
    renderHistory();
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
  // Exports (for testing in Node)
  // ===================================

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      calculatorState: calculatorState,
      inputDigit: inputDigit,
      inputDecimal: inputDecimal,
      updateDisplay: updateDisplay,
      selectOperator: selectOperator,
      handleEquals: handleEquals,
      OPERATOR_MAP: OPERATOR_MAP,
      historyState: historyState,
      addToHistory: addToHistory,
      clearHistory: clearHistory,
      loadHistoryFromStorage: loadHistoryFromStorage,
      saveHistoryToStorage: saveHistoryToStorage,
      recallFromHistory: recallFromHistory,
      buildExpressionString: buildExpressionString,
      HISTORY_STORAGE_KEY: HISTORY_STORAGE_KEY
    };
  }

})();
