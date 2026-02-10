---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "GitHub Copilot"
chat_id: "frontend-tech-instructions-20260210"
prompt: |
  Create instruction files for the front-end technologies
started: "2026-02-10T15:24:50Z"
ended: "2026-02-10T15:25:48Z"
task_durations:
  - task: "analyze frontend technologies"
    duration: "00:00:30"
  - task: "create JavaScript instructions"
    duration: "00:00:18"
total_duration: "00:00:58"
ai_log: "ai-logs/2026/02/10/frontend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.js"
---

# JavaScript Instructions

## Overview

This document defines JavaScript best practices for the calculator-web project. These standards ensure modern, maintainable, and performant client-side code using vanilla JavaScript and ES6+ features.

## JavaScript Standards

### Language Version

- Use **ECMAScript 2015 (ES6)** or later features
- Target modern browsers (Chrome, Firefox, Safari, Edge)
- Use transpilation (Babel) for older browser support if needed

### Strict Mode

Always use strict mode:

```javascript
'use strict';

// Your code here
```

Or use ES6 modules which are automatically strict:

```javascript
// site.js
export function calculate(a, b) {
  return a + b;
}
```

## Code Organization

### File Structure

```
wwwroot/
├── js/
│   ├── site.js              # Main application logic
│   ├── calculator.js        # Calculator-specific functionality
│   ├── history.js           # History management
│   └── utils/
│       ├── validation.js    # Input validation utilities
│       └── formatting.js    # Number formatting utilities
```

### Module Pattern

Use ES6 modules or IIFE pattern:

```javascript
// ES6 Module (preferred)
// calculator.js
export class Calculator {
  constructor() {
    this.currentValue = 0;
    this.operator = null;
  }

  add(value) {
    this.currentValue += value;
    return this.currentValue;
  }
}

// site.js
import { Calculator } from './calculator.js';

const calc = new Calculator();
```

```javascript
// IIFE Pattern (for non-module environments)
const CalculatorApp = (function() {
  'use strict';

  let currentValue = 0;
  let operator = null;

  function add(value) {
    currentValue += value;
    return currentValue;
  }

  // Public API
  return {
    add,
    getCurrentValue: () => currentValue
  };
})();
```

## Naming Conventions

### Variables and Functions

```javascript
// Good: camelCase for variables and functions
const calculatorDisplay = document.getElementById('display');
let currentOperator = null;

function calculateResult(a, b, operator) {
  return a + b;
}

// Avoid: snake_case or PascalCase for variables
const calculator_display = document.getElementById('display');
const CalculatorDisplay = document.getElementById('display');
```

### Constants

```javascript
// Good: SCREAMING_SNAKE_CASE for true constants
const MAX_DIGITS = 15;
const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/'
};

// Good: camelCase for config objects
const calculatorConfig = {
  maxDigits: 15,
  decimalPlaces: 2
};
```

### Classes

```javascript
// Good: PascalCase for classes
class CalculatorEngine {
  constructor() {
    this.memory = 0;
  }

  calculate(expression) {
    // Implementation
  }
}

// Good: Private fields with #
class Calculator {
  #memory = 0;
  #history = [];

  getMemory() {
    return this.#memory;
  }

  #privateMethod() {
    // Internal implementation
  }
}
```

## Modern JavaScript Features

### Let and Const

```javascript
// Good: Use const by default, let when reassignment needed
const CALCULATOR_BUTTONS = document.querySelectorAll('.calc-btn');
let currentValue = 0;

// Avoid: var (function-scoped, hoisted)
var currentValue = 0;
```

### Arrow Functions

```javascript
// Good: Arrow functions for callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Good: Arrow functions preserve 'this' context
class Calculator {
  constructor() {
    this.value = 0;
    this.buttons = document.querySelectorAll('.calc-btn');
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this.handleClick());
    });
  }

  handleClick() {
    console.log(this.value); // 'this' refers to Calculator instance
  }
}

// Avoid: Arrow functions for methods (when you need dynamic 'this')
const obj = {
  value: 42,
  getValue: () => this.value // 'this' is window, not obj
};
```

### Template Literals

```javascript
// Good: Template literals for string interpolation
const name = 'Calculator';
const version = '1.0';
console.log(`${name} v${version}`);

// Good: Multi-line strings
const html = `
  <div class="result">
    <span class="value">${result}</span>
  </div>
`;

// Avoid: String concatenation
console.log(name + ' v' + version);
```

### Destructuring

```javascript
// Good: Object destructuring
const calculator = {
  value: 42,
  operator: '+',
  memory: 0
};

const { value, operator } = calculator;

// Good: Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Good: Function parameter destructuring
function calculate({ a, b, operator }) {
  return operator === '+' ? a + b : a - b;
}

calculate({ a: 10, b: 5, operator: '+' });
```

### Spread and Rest Operators

```javascript
// Good: Spread operator for arrays
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];

// Good: Spread operator for objects
const defaults = { theme: 'dark', decimals: 2 };
const userConfig = { ...defaults, decimals: 4 };

// Good: Rest parameters
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4, 5); // 15
```

### Optional Chaining and Nullish Coalescing

```javascript
// Good: Optional chaining
const result = calculator?.memory?.value;

// Good: Nullish coalescing
const displayValue = userInput ?? defaultValue;

// Avoid: Multiple null checks
const result = calculator && calculator.memory && calculator.memory.value;
const displayValue = userInput !== null && userInput !== undefined
  ? userInput
  : defaultValue;
```

## DOM Manipulation

### Element Selection

```javascript
// Good: Modern selector methods
const display = document.getElementById('displayValue');
const buttons = document.querySelectorAll('.calc-btn');
const firstButton = document.querySelector('.calc-btn');

// Cache DOM queries
const calculator = {
  elements: {
    display: document.getElementById('displayValue'),
    buttons: document.querySelectorAll('.calc-btn'),
    result: document.getElementById('result')
  }
};
```

### Event Handling

```javascript
// Good: addEventListener with named functions
function handleButtonClick(event) {
  const value = event.target.dataset.value;
  updateDisplay(value);
}

const buttons = document.querySelectorAll('.calc-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', handleButtonClick);
});

// Good: Event delegation for dynamic content
document.getElementById('calculator').addEventListener('click', (event) => {
  if (event.target.matches('.calc-btn')) {
    handleButtonClick(event);
  }
});

// Good: Remove event listeners when needed
function cleanup() {
  buttons.forEach(btn => {
    btn.removeEventListener('click', handleButtonClick);
  });
}

// Avoid: Inline event handlers
// <button onclick="calculate()">Bad</button>
```

### DOM Updates

```javascript
// Good: Minimal DOM manipulation
function updateDisplay(value) {
  const display = document.getElementById('displayValue');
  display.value = value;
}

// Good: Create document fragments for multiple elements
function renderHistory(items) {
  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.textContent = `${item.expression} = ${item.result}`;
    fragment.appendChild(div);
  });

  document.getElementById('history').appendChild(fragment);
}

// Avoid: innerHTML with user input (XSS risk)
function updateDisplay(value) {
  display.innerHTML = value; // Dangerous if value comes from user
}

// Good: Use textContent or value for user input
function updateDisplay(value) {
  display.textContent = value; // Safe
  // or
  display.value = value; // Safe for input elements
}
```

## Asynchronous Programming

### Promises

```javascript
// Good: Use promises for async operations
function fetchCalculationHistory() {
  return fetch('/api/history')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      return response.json();
    })
    .then(data => {
      return data.items;
    })
    .catch(error => {
      console.error('Error fetching history:', error);
      return [];
    });
}
```

### Async/Await

```javascript
// Good: async/await for cleaner async code
async function fetchCalculationHistory() {
  try {
    const response = await fetch('/api/history');

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

// Good: Use with DOM operations
async function initializeCalculator() {
  try {
    const history = await fetchCalculationHistory();
    renderHistory(history);

    const config = await fetchUserConfig();
    applyConfig(config);
  } catch (error) {
    showError('Failed to initialize calculator');
  }
}
```

## Error Handling

### Try-Catch Blocks

```javascript
// Good: Wrap risky operations in try-catch
function calculateResult(expression) {
  try {
    const result = evaluate(expression);
    return { success: true, value: result };
  } catch (error) {
    console.error('Calculation error:', error);
    return { success: false, error: error.message };
  }
}

// Good: Handle async errors
async function saveCalculation(data) {
  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to save calculation:', error);
    throw error; // Re-throw to let caller handle
  }
}
```

### Input Validation

```javascript
// Good: Validate input before processing
function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }

  if (b === 0) {
    throw new Error('Division by zero');
  }

  return a / b;
}

// Good: Validate user input
function handleNumberInput(input) {
  const num = parseFloat(input);

  if (isNaN(num)) {
    showError('Invalid number');
    return null;
  }

  if (!isFinite(num)) {
    showError('Number too large');
    return null;
  }

  return num;
}
```

## Code Quality

### Comments

```javascript
// Good: Comment complex logic or non-obvious decisions
function calculateTax(amount) {
  // Apply progressive tax rate based on income brackets
  // 0-10000: 10%, 10001-50000: 20%, 50001+: 30%
  if (amount <= 10000) {
    return amount * 0.10;
  } else if (amount <= 50000) {
    return 1000 + (amount - 10000) * 0.20;
  } else {
    return 9000 + (amount - 50000) * 0.30;
  }
}

// Avoid: Commenting obvious code
// Increment counter by 1
counter++; // Bad comment
```

### JSDoc Documentation

```javascript
/**
 * Calculates the result of a binary operation
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @param {string} operator - Operation to perform (+, -, *, /)
 * @returns {number} The result of the operation
 * @throws {Error} If operator is invalid or division by zero
 */
function calculate(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}
```

### Pure Functions

```javascript
// Good: Pure function (no side effects)
function add(a, b) {
  return a + b;
}

// Good: Predictable, testable
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Avoid: Functions with side effects (when not necessary)
let total = 0;
function addToTotal(value) {
  total += value; // Mutates external state
  return total;
}
```

### Immutability

```javascript
// Good: Don't mutate objects
const calculator = { value: 0, operator: null };
const updated = { ...calculator, value: 42 };

// Good: Don't mutate arrays
const history = [1, 2, 3];
const newHistory = [...history, 4];

// Avoid: Direct mutation
calculator.value = 42; // Mutates original
history.push(4); // Mutates original array
```

## Performance

### Debouncing and Throttling

```javascript
// Good: Debounce for input events
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const handleInput = debounce((event) => {
  validateInput(event.target.value);
}, 300);

document.getElementById('input').addEventListener('input', handleInput);

// Good: Throttle for scroll/resize events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);
```

### Efficient Loops

```javascript
// Good: Use array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Avoid: Modifying array during iteration
// Bad
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers.splice(i, 1); // Dangerous
  }
}

// Good: Filter creates new array
const odds = numbers.filter(n => n % 2 !== 0);
```

## Testing

### Unit Testing Structure

```javascript
// calculator.test.js
describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should add two numbers', () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  test('should throw error on division by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
  });
});
```

## Security

### XSS Prevention

```javascript
// Good: Use textContent for user input
function displayUserInput(input) {
  document.getElementById('display').textContent = input;
}

// Good: Sanitize if innerHTML is necessary
function displayHTML(html) {
  const sanitized = DOMPurify.sanitize(html);
  document.getElementById('content').innerHTML = sanitized;
}

// Avoid: Direct innerHTML with user input
function displayUserInput(input) {
  document.getElementById('display').innerHTML = input; // XSS risk
}
```

### CSRF Protection

```javascript
// Good: Include anti-forgery token in fetch requests
async function saveData(data) {
  const token = document.querySelector('input[name="__RequestVerificationToken"]').value;

  const response = await fetch('/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'RequestVerificationToken': token
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
```

## Resources

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [ESLint](https://eslint.org/) - JavaScript linting tool
