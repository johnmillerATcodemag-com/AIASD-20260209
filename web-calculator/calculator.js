/**
 * Calculator module - VS-04: Calculation engine with PEMDAS
 *
 * Provides:
 * - calculate(previousValue, currentValue, operation): single binary operation with precision and error handling
 * - evaluateExpression(tokens): PEMDAS evaluation of token array
 */

/** @typedef {{ type: 'number', value: string }} NumberToken */
/** @typedef {{ type: 'operator', value: string }} OperatorToken */
/** @typedef {NumberToken | OperatorToken} ExpressionToken */
/** @typedef {{ error: false, result: string }} CalculateSuccess */
/** @typedef {{ error: true, message: string }} CalculateError */
/** @typedef {CalculateSuccess | CalculateError} CalculateResult */

const MAX_DECIMAL_PLACES = 10;
const PRECISION_MULTIPLIER = Math.pow(10, MAX_DECIMAL_PLACES);
const MAX_DIGITS = 15;

/**
 * Performs a single binary operation with precision and error handling.
 *
 * @param {string} previousValue - First operand
 * @param {string} currentValue - Second operand
 * @param {string} operation - One of "+", "-", "*", "/"
 * @returns {CalculateResult} Result object with result string or error message
 */
function calculate(previousValue, currentValue, operation) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (Number.isNaN(prev) || Number.isNaN(current)) {
    return { error: true, message: "Invalid input" };
  }

  let resultNum;
  switch (operation) {
    case "+":
      resultNum = prev + current;
      break;
    case "-":
      resultNum = prev - current;
      break;
    case "*":
      resultNum = prev * current;
      break;
    case "/":
      if (current === 0) {
        return { error: true, message: "Cannot divide by zero" };
      }
      resultNum = prev / current;
      break;
    default:
      return { error: true, message: "Unknown operation" };
  }

  // Round to 10 decimal places for floating point precision (e.g. 0.1 + 0.2 = 0.3)
  resultNum = Math.round(resultNum * PRECISION_MULTIPLIER) / PRECISION_MULTIPLIER;

  let resultStr = resultNum.toString();
  const digitCount = resultStr.replace(".", "").replace("-", "").length;
  if (digitCount > MAX_DIGITS) {
    resultStr = resultNum.toExponential(10);
  }

  return { error: false, result: resultStr };
}

/**
 * Evaluates an expression of tokens using PEMDAS: × and ÷ before + and −, left-to-right within same precedence.
 *
 * @param {ExpressionToken[]} tokens - Array of { type: 'number', value: string } and { type: 'operator', value: string }
 * @returns {CalculateResult} Result object with result string or error message
 */
function evaluateExpression(tokens) {
  if (tokens.length === 0) {
    return { error: true, message: "Invalid input" };
  }

  // Copy and normalize operator symbols (× → *, ÷ → /, − → -)
  const normalized = tokens.map((t) => {
    if (t.type === "operator") {
      const v =
        t.value === "×"
          ? "*"
          : t.value === "÷"
            ? "/"
            : t.value === "−"
              ? "-"
              : t.value;
      return { type: "operator", value: v };
    }
    return { type: "number", value: String(t.value) };
  });

  // First pass: * and / left to right
  let list = normalized.slice();
  while (true) {
    const idx = list.findIndex((t) => t.type === "operator" && (t.value === "*" || t.value === "/"));
    if (idx < 0) break;
    const left = list[idx - 1];
    const op = list[idx];
    const right = list[idx + 1];
    if (!left || left.type !== "number" || !right || right.type !== "number") {
      return { error: true, message: "Invalid input" };
    }
    const out = calculate(left.value, right.value, op.value);
    if (out.error) return out;
    list = list.slice(0, idx - 1).concat([{ type: "number", value: out.result }], list.slice(idx + 2));
  }

  // Second pass: + and - left to right
  while (list.length > 1) {
    const idx = list.findIndex((t) => t.type === "operator" && (t.value === "+" || t.value === "-"));
    if (idx < 0) break;
    const left = list[idx - 1];
    const op = list[idx];
    const right = list[idx + 1];
    if (!left || left.type !== "number" || !right || right.type !== "number") {
      return { error: true, message: "Invalid input" };
    }
    const out = calculate(left.value, right.value, op.value);
    if (out.error) return out;
    list = list.slice(0, idx - 1).concat([{ type: "number", value: out.result }], list.slice(idx + 2));
  }

  if (list.length !== 1 || list[0].type !== "number") {
    return { error: true, message: "Invalid input" };
  }
  return { error: false, result: list[0].value };
}

if (typeof window !== "undefined") {
  window.calculator = { calculate, evaluateExpression };
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculate, evaluateExpression };
}
