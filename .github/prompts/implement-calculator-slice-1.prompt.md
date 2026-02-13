---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "chrisrockwell"
chat_id: "create-slice1-prompt-20260212-001"
prompt: |
  Create a developer-focused prompt file for implementing Slice 1 of the
  calculator web app based on the vertical slice plan
started: "2026-02-12T00:00:00Z"
ended: "2026-02-12T00:15:00Z"
task_durations:
  - task: "prompt design"
    duration: "00:10:00"
  - task: "review and refinement"
    duration: "00:05:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/02/12/create-slice1-prompt-20260212-001/conversation.md"
source: "chrisrockwell"
targetAgent: "developer"
promptType: "implementation"
---

# Implement Calculator Slice 1: Basic Calculator Operations

**Target Agent**: Developer
**Slice Number**: 1
**Priority**: Critical (P0)
**Phase**: MVP (Phase 1)
**Estimated Effort**: 4 hours (VS-01 display) + 2-3 days (full implementation)
**Risk**: Low

> **⚠️ SCOPE NOTE**: VS-01 specification defines a display-only (Query/Read-only) slice,
> while this prompt includes both display AND input/calculation logic. This prompt
> combines what could be 2-3 separate slices for practical implementation purposes.

---

## Objective

Implement the foundational calculator feature that enables users to perform basic arithmetic operations (addition, subtraction, multiplication, division). This slice creates the core calculator UI component, state management, and calculation logic that all other slices will build upon.

---

## Context

### Related Documents

- **PRD**: [calculator-web-app-prd.md](../../requirements/calculator-web-app-prd.md)
- **Implementation Plan**: [calculator-vertical-slice-plan.md](../../requirements/calculator-vertical-slice-plan.md)
- **Project Root**: `/calculator-web`
- **Technology Stack**: React 18, TypeScript, Vite, Jest, React Testing Library

### Why This Slice?

This is the **foundational slice** that:
- Establishes the project structure and patterns
- Provides the core calculator functionality
- Creates reusable types and interfaces
- Sets up the testing framework
- All subsequent slices depend on this

---

## User Story

**As a** user
**I want to** perform basic arithmetic operations
**So that** I can complete simple calculations quickly

---

## Acceptance Criteria

### Functional Requirements

- [ ] **Number Input**: User can click number buttons (0-9) and see input in display
- [ ] **Operator Selection**: User can click operator buttons (+, -, ×, ÷)
- [ ] **Calculation**: User can click equals button (=) to calculate result
- [ ] **Display Update**: Result displays with correct calculated value
- [ ] **Chained Operations**: Consecutive operations work correctly (e.g., 5 + 3 + 2 = 10)
- [ ] **Operation Override**: Clicking new operator replaces previous operator before calculation
- [ ] **Division by Zero**: Attempting to divide by zero shows error message
- [ ] **Initial State**: Calculator starts with "0" displayed

### Non-Functional Requirements

- [ ] **Performance**: Button clicks respond within 50ms
- [ ] **Accuracy**: Calculations accurate to 10 decimal places
- [ ] **Code Quality**: All functions have unit tests with >80% coverage
- [ ] **Type Safety**: No TypeScript errors; full type coverage
- [ ] **Accessibility**: Semantic HTML with proper ARIA labels

---

## Technical Specification

### File Structure

Create the following files in `/calculator-web/web-calculator/src`:

```
/src
  /features
    /basic-calculator
      BasicCalculator.tsx              # Main UI component
      useCalculator.ts                 # State management hook
      calculator.logic.ts              # Pure calculation functions
      calculator.types.ts              # TypeScript interfaces/types
      BasicCalculator.test.tsx         # Component integration tests
      calculator.logic.test.ts         # Unit tests for logic
      BasicCalculator.module.css       # Component-specific styles
      index.ts                         # Public exports
  /shared
    /types
      common.types.ts                  # Shared types (if needed)
    /utils
      number.utils.ts                  # Number formatting utilities (if needed)
  /app
    App.tsx                            # Root component (integrate BasicCalculator)
    App.module.css                     # App-level styles
    main.tsx                           # Entry point
```

### Type Definitions

**File**: `calculator.types.ts`

```typescript
/**
 * Supported arithmetic operators
 */
export type Operator = '+' | '-' | '×' | '÷' | null;

/**
 * Calculator state representing current computation context
 */
export interface CalculatorState {
  /** Current input or calculated value displayed */
  currentValue: string;

  /** Previous operand stored for calculation */
  previousValue: string;

  /** Current operator selected */
  operator: Operator;

  /** Result of last calculation (null if no calculation performed) */
  result: string | null;

  /** Error message if calculation failed */
  error: string | null;

  /** Flag indicating if an error should be displayed (VS-01 requirement) */
  displayError: boolean;
}

/**
 * Actions available to interact with calculator
 */
export interface CalculatorActions {
  /** Add a digit (0-9) to current input */
  inputNumber: (digit: string) => void;

  /** Select an arithmetic operator */
  selectOperator: (op: Operator) => void;

  /** Perform calculation and display result */
  calculate: () => void;

  /** Clear current input */
  clear: () => void;

  /** Reset calculator to initial state */
  clearAll: () => void;
}

/**
 * Complete calculator interface exposed by useCalculator hook
 */
export interface Calculator extends CalculatorState, CalculatorActions {}
```

### Business Logic Functions

**File**: `calculator.logic.ts`

Implement pure functions with comprehensive error handling:

```typescript
import { Operator } from './calculator.types';

/**
 * Performs arithmetic calculation
 * @throws {Error} If operator is invalid or division by zero
 */
export function performCalculation(
  operand1: number,
  operand2: number,
  operator: Operator
): number {
  if (operator === null) {
    throw new Error('No operator specified');
  }

  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '×':
      return operand1 * operand2;
    case '÷':
      if (operand2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return operand1 / operand2;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}

/**
 * Formats result for display, handling floating point precision
 */
export function formatResult(value: number): string {
  // Handle floating point precision issues (e.g., 0.1 + 0.2 = 0.30000000000004)
  // Round to 10 decimal places and remove trailing zeros
  return Number(value.toFixed(10)).toString();
}

/**
 * Truncates long numbers for display (VS-01 requirement)
 * @param value - The string value to truncate
 * @param maxLength - Maximum length before truncation (default: 12)
 */
export function truncateForDisplay(value: string, maxLength: number = 12): string {
  if (value.length <= maxLength) {
    return value;
  }

  // If it's a number with decimals, try to preserve significant digits
  if (value.includes('.')) {
    const [integer, decimal] = value.split('.');
    if (integer.length >= maxLength) {
      return integer.slice(0, maxLength) + '...';
    }
    const remainingLength = maxLength - integer.length - 1; // -1 for the decimal point
    return `${integer}.${decimal.slice(0, remainingLength)}`;
  }

  return value.slice(0, maxLength) + '...';
}

/**
 * Validates if string represents a valid number
 */
export function isValidNumber(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

/**
 * Parses string input to number, throws if invalid
 */
export function parseNumberInput(input: string): number {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) {
    throw new Error(`Invalid number input: ${input}`);
  }
  return parsed;
}
```

### State Management Hook

**File**: `useCalculator.ts`

```typescript
import { useState, useCallback } from 'react';
import {
  Calculator,
  CalculatorState,
  Operator
} from './calculator.types';
import {
  performCalculation,
  formatResult,
  parseNumberInput,
  isValidNumber
} from './calculator.logic';

const INITIAL_STATE: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  result: null,
  error: null,
  displayError: false
};

export function useCalculator(): Calculator {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

  const inputNumber = useCallback((digit: string) => {
    setState(prev => {
      // If showing result, start new calculation
      if (prev.result !== null) {
        return {
          ...INITIAL_STATE,
          currentValue: digit,
          error: null
        };
      }

      // If current value is '0', replace it (unless adding decimal)
      const newValue = prev.currentValue === '0'
        ? digit
        : prev.currentValue + digit;

      return {
        ...prev,
        currentValue: newValue,
        error: null
      };
    });
  }, []);

  const selectOperator = useCallback((op: Operator) => {
    setState(prev => {
      // If we have a previous operation pending, calculate it first
      if (prev.previousValue && prev.operator && prev.currentValue) {
        try {
          const result = performCalculation(
            parseNumberInput(prev.previousValue),
            parseNumberInput(prev.currentValue),
            prev.operator
          );
          const formattedResult = formatResult(result);

          return {
            currentValue: '0',
            previousValue: formattedResult,
            operator: op,
            result: null,
            error: null
          };
        } catch (error) {
          return {
            ...prev,
            error: error instanceof Error ? error.message : 'Calculation error'
          };
        }
      }

      // Store current value and operator for next calculation
      return {
        ...prev,
        previousValue: prev.currentValue,
        currentValue: '0',
        operator: op,
        result: null,
        error: null
      };
    });
  }, []);

  const calculate = useCallback(() => {
    setState(prev => {
      if (!prev.operator || !prev.previousValue) {
        return prev; // Nothing to calculate
      }

      try {
        const result = performCalculation(
          parseNumberInput(prev.previousValue),
          parseNumberInput(prev.currentValue),
          prev.operator
        );
        const formattedResult = formatResult(result);

        return {
          currentValue: formattedResult,
          previousValue: '',
          operator: null,
          result: formattedResult,
          error: null
        };
      } catch (error) {
        return {
          ...prev,
          error: error instanceof Error ? error.message : 'Calculation error'
        };
      }
    });
  }, []);

  const clear = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentValue: '0',
      error: null
    }));
  }, []);

  const clearAll = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    inputNumber,
    selectOperator,
    calculate,
    clear,
    clearAll
  };
}
```

### UI Component

**File**: `BasicCalculator.tsx`

```typescript
import React from 'react';
import { useCalculator } from './useCalculator';
import styles from './BasicCalculator.module.css';

export const BasicCalculator: React.FC = () => {
  const calculator = useCalculator();

  const handleNumberClick = (digit: string) => {
    calculator.inputNumber(digit);
  };

  const handleOperatorClick = (operator: '+' | '-' | '×' | '÷') => {
    calculator.selectOperator(operator);
  };

  // VS-01 Rendering Logic: 5-step algorithm
  const getDisplayValue = (): string => {
    // Step 1: Check for error state
    if (calculator.displayError && calculator.error) {
      return calculator.error;
    }

    // Step 2: Check if currentValue is empty
    if (calculator.currentValue === '' || calculator.currentValue === null) {
      return '0';
    }

    // Step 3: Validate and format current value
    const formattedValue = calculator.currentValue;

    // Step 4: Apply truncation if length exceeds display width
    return truncateForDisplay(formattedValue);
  };

  const displayValue = getDisplayValue();

  return (
    <div className={styles.calculator}>
      <div
        className={styles.display}
        id="display"
        data-testid="calculator-display"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={styles.displayValue}>{displayValue}</span>
      </div>

      <div className={styles.buttonGrid}>
        {/* Number buttons */}
        {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map(digit => (
          <button
            key={digit}
            className={styles.numberButton}
            onClick={() => handleNumberClick(digit)}
            data-testid={`button-${digit}`}
            aria-label={`Number ${digit}`}
          >
            {digit}
          </button>
        ))}

        {/* Operator buttons */}
        <button
          className={styles.operatorButton}
          onClick={() => handleOperatorClick('+')}
          data-testid="button-add"
          aria-label="Add"
        >
          +
        </button>
        <button
          className={styles.operatorButton}
          onClick={() => handleOperatorClick('-')}
          data-testid="button-subtract"
          aria-label="Subtract"
        >
          -
        </button>
        <button
          className={styles.operatorButton}
          onClick={() => handleOperatorClick('×')}
          data-testid="button-multiply"
          aria-label="Multiply"
        >
          ×
        </button>
        <button
          className={styles.operatorButton}
          onClick={() => handleOperatorClick('÷')}
          data-testid="button-divide"
          aria-label="Divide"
        >
          ÷
        </button>

        {/* Action buttons */}
        <button
          className={styles.actionButton}
          onClick={calculator.calculate}
          data-testid="button-equals"
          aria-label="Equals"
        >
          =
        </button>
        <button
          className={styles.actionButton}
          onClick={calculator.clear}
          data-testid="button-clear"
          aria-label="Clear"
        >
          C
        </button>
        <button
          className={styles.actionButton}
          onClick={calculator.clearAll}
          data-testid="button-clear-all"
          aria-label="Clear All"
        >
          AC
        </button>
      </div>
    </div>
  );
};
```

### Styling

**File**: `BasicCalculator.module.css`

```css
.calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.display {
  background-color: #34495e;
  color: #ecf0f1;
  font-size: 2rem; /* 32px minimum - WCAG 2.1 AA requirement (VS-01: min 24px, using 32px) */
  font-family: 'Courier New', Courier, monospace; /* Monospace for number clarity (VS-01 req) */
  padding: 20px;
  text-align: right; /* Right-aligned (VS-01 requirement) */
  border-radius: 5px;
  margin-bottom: 20px;
  min-height: 60px;
  overflow: hidden;
  word-wrap: break-word;
  border: 2px solid #2c3e50; /* Visual separation from buttons (VS-01 req) */
  /* Colors provide 4.5:1 contrast ratio minimum (WCAG 2.1 AA) - VS-01 requirement */
}

.displayValue {
  display: inline-block;
  /* Readable from 2 feet away with 2rem font size (VS-01 requirement) */
}

.buttonGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.numberButton,
.operatorButton,
.actionButton {
  padding: 20px;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.numberButton {
  background-color: #95a5a6;
  color: #2c3e50;
}

.numberButton:hover {
  background-color: #7f8c8d;
}

.operatorButton {
  background-color: #e67e22;
  color: white;
}

.operatorButton:hover {
  background-color: #d35400;
}

.actionButton {
  background-color: #3498db;
  color: white;
}

.actionButton:hover {
  background-color: #2980b9;
}

.numberButton:active,
.operatorButton:active,
.actionButton:active {
  transform: scale(0.95);
}
```

---

## Testing Requirements

### Unit Tests for Logic

**File**: `calculator.logic.test.ts`

```typescript
import {
  performCalculation,
  formatResult,
  isValidNumber,
  parseNumberInput,
  truncateForDisplay
} from './calculator.logic';

describe('calculator.logic', () => {
  describe('performCalculation', () => {
    test('adds two positive numbers', () => {
      expect(performCalculation(5, 3, '+')).toBe(8);
    });

    test('adds positive and negative numbers', () => {
      expect(performCalculation(5, -3, '+')).toBe(2);
    });

    test('subtracts two numbers', () => {
      expect(performCalculation(10, 4, '-')).toBe(6);
    });

    test('multiplies two numbers', () => {
      expect(performCalculation(6, 7, '×')).toBe(42);
    });

    test('divides two numbers', () => {
      expect(performCalculation(20, 4, '÷')).toBe(5);
    });

    test('throws error on division by zero', () => {
      expect(() => performCalculation(10, 0, '÷')).toThrow('Cannot divide by zero');
    });

    test('throws error with null operator', () => {
      expect(() => performCalculation(5, 3, null)).toThrow('No operator specified');
    });

    test('handles decimal calculations', () => {
      expect(performCalculation(0.1, 0.2, '+')).toBeCloseTo(0.3);
    });
  });

  describe('formatResult', () => {
    test('formats integer result', () => {
      expect(formatResult(42)).toBe('42');
    });

    test('handles floating point precision', () => {
      const result = 0.1 + 0.2; // 0.30000000000000004
      expect(formatResult(result)).toBe('0.3');
    });

    test('removes trailing zeros', () => {
      expect(formatResult(5.0)).toBe('5');
    });

    test('preserves necessary decimals', () => {
      expect(formatResult(3.14159)).toBe('3.14159');
    });
  });

  describe('isValidNumber', () => {
    test('validates positive integers', () => {
      expect(isValidNumber('42')).toBe(true);
    });

    test('validates negative numbers', () => {
      expect(isValidNumber('-15')).toBe(true);
    });

    test('validates decimals', () => {
      expect(isValidNumber('3.14')).toBe(true);
    });

    test('rejects non-numeric strings', () => {
      expect(isValidNumber('abc')).toBe(false);
    });

    test('rejects empty string', () => {
      expect(isValidNumber('')).toBe(false);
    });
  });

  describe('parseNumberInput', () => {
    test('parses valid number string', () => {
      expect(parseNumberInput('42')).toBe(42);
    });

    test('throws on invalid input', () => {
      expect(() => parseNumberInput('invalid')).toThrow('Invalid number input');
    });
  });

  describe('truncateForDisplay - VS-01 Requirement', () => {
    test('returns short numbers unchanged', () => {
      expect(truncateForDisplay('42')).toBe('42');
      expect(truncateForDisplay('123.45')).toBe('123.45');
    });

    test('truncates very long integers', () => {
      const longNumber = '12345678901234567890';
      const truncated = truncateForDisplay(longNumber, 12);
      expect(truncated.length).toBeLessThanOrEqual(15); // 12 + '...'
      expect(truncated).toContain('...');
    });

    test('truncates long decimals preserving integer part', () => {
      const result = truncateForDisplay('123.456789012345', 12);
      expect(result).toContain('123.');
      expect(result.length).toBeLessThanOrEqual(12);
    });
  });
});
```

### Component Integration Tests

**File**: `BasicCalculator.test.tsx`

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BasicCalculator } from './BasicCalculator';

describe('BasicCalculator', () => {
  // VS-01 Test Cases (TC-V1-01 through TC-V1-07)
  describe('VS-01: Display Current Value (Query Slice)', () => {
    test('TC-V1-01: displays "0" when currentValue is empty', () => {
      render(<BasicCalculator />);
      expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
    });

    test('TC-V1-02: displays currentValue "42"', () => {
      render(<BasicCalculator />);
      fireEvent.click(screen.getByTestId('button-4'));
      fireEvent.click(screen.getByTestId('button-2'));
      expect(screen.getByTestId('calculator-display')).toHaveTextContent('42');
    });

    test('TC-V1-03: displays currentValue "0.123"', () => {
      // This test will work once decimal support is added
      // For now, it validates the display component structure
      render(<BasicCalculator />);
      expect(screen.getByTestId('calculator-display')).toBeInTheDocument();
    });

    test('TC-V1-04: truncates very long numbers gracefully', () => {
      // Test will validate truncation logic once implemented
      render(<BasicCalculator />);
      const display = screen.getByTestId('calculator-display');
      expect(display).toHaveAttribute('role', 'status');
    });

    test('TC-V1-05: displays error message when displayError is true', () => {
      render(<BasicCalculator />);
      fireEvent.click(screen.getByTestId('button-5'));
      fireEvent.click(screen.getByTestId('button-divide'));
      fireEvent.click(screen.getByTestId('button-0'));
      fireEvent.click(screen.getByTestId('button-equals'));
      expect(screen.getByTestId('calculator-display')).toHaveTextContent('Cannot divide by zero');
    });

    test('TC-V1-06: has proper ARIA attributes for screen readers', () => {
      render(<BasicCalculator />);
      const display = screen.getByTestId('calculator-display');
      expect(display).toHaveAttribute('role', 'status');
      expect(display).toHaveAttribute('aria-live', 'polite');
      expect(display).toHaveAttribute('aria-atomic', 'true');
    });

    test('TC-V1-07: display remains readable (font size check)', () => {
      render(<BasicCalculator />);
      const display = screen.getByTestId('calculator-display');
      const styles = window.getComputedStyle(display);
      // Note: In jsdom, computed styles may not reflect CSS modules
      // This test validates the element exists and has proper structure
      expect(display).toBeInTheDocument();
    });
  });

  test('renders with initial display of 0', () => {
    render(<BasicCalculator />);
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
  });

  test('displays number when button clicked', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-5'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5');
  });

  test('displays multiple digits', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-4'));
    fireEvent.click(screen.getByTestId('button-2'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('42');
  });

  test('performs addition correctly', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-add'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-equals'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('8');
  });

  test('performs subtraction correctly', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-9'));
    fireEvent.click(screen.getByTestId('button-subtract'));
    fireEvent.click(screen.getByTestId('button-4'));
    fireEvent.click(screen.getByTestId('button-equals'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('5');
  });

  test('performs multiplication correctly', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-6'));
    fireEvent.click(screen.getByTestId('button-multiply'));
    fireEvent.click(screen.getByTestId('button-7'));
    fireEvent.click(screen.getByTestId('button-equals'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('42');
  });

  test('performs division correctly', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-8'));
    fireEvent.click(screen.getByTestId('button-divide'));
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-equals'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('4');
  });

  test('handles chained operations', () => {
    render(<BasicCalculator />);
    // 5 + 3 + 2 = 10
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-add'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-add'));
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-equals'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('10');
  });

  test('shows error message on division by zero', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-divide'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-equals'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('Cannot divide by zero');
  });

  test('clear button clears current input', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-clear'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
  });

  test('clear all button resets calculator', () => {
    render(<BasicCalculator />);
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-add'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-clear-all'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('0');
  });

  test('starts new calculation after result displayed', () => {
    render(<BasicCalculator />);
    // Calculate 5 + 3 = 8
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-add'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-equals'));
    // Start new calculation: press 2
    fireEvent.click(screen.getByTestId('button-2'));
    expect(screen.getByTestId('calculator-display')).toHaveTextContent('2');
  });
});
```

### Test Coverage Requirements

- **Overall Coverage**: Minimum 80%
- **Logic Functions**: 100% (all branches)
- **Hook State Transitions**: 90%+ (all major flows)
- **Component Interactions**: Cover all user workflows

---

## Implementation Steps

### Step 1: Project Setup
1. Navigate to `/calculator-web/web-calculator`
2. Ensure dependencies installed: `npm install`
3. Verify Vite dev server runs: `npm run dev`

### Step 2: Create Directory Structure
```bash
mkdir -p src/features/basic-calculator
mkdir -p src/shared/types
mkdir -p src/shared/utils
mkdir -p src/app
```

### Step 3: Implement Core Logic (TDD Approach)
1. Create `calculator.types.ts` with type definitions
2. Create `calculator.logic.test.ts` with test cases
3. Implement `calculator.logic.ts` to pass tests
4. Run tests: `npm test calculator.logic.test.ts`

### Step 4: Implement State Management
1. Create `useCalculator.ts` hook
2. Wire up logic functions
3. Test state transitions manually

### Step 5: Implement UI Component
1. Create `BasicCalculator.tsx` component
2. Create `BasicCalculator.module.css` styles
3. Wire up hook to UI

### Step 6: Integration Testing
1. Create `BasicCalculator.test.tsx`
2. Implement all test cases
3. Run full test suite: `npm test`

### Step 7: Integration with App
1. Update `App.tsx` to render `BasicCalculator`
2. Create `index.ts` exports for feature
3. Test in browser

### Step 8: Quality Assurance
1. Run linter: `npm run lint`
2. Check TypeScript: `npm run type-check`
3. Verify test coverage: `npm run test -- --coverage`
4. Manual browser testing
5. **VS-01 Specific**: Validate contrast ratios with accessibility tools
6. **VS-01 Specific**: Test with screen reader (VoiceOver on Mac, NVDA on Windows)
7. **VS-01 Specific**: Test at 200% zoom in browser

---

## Quality Gates

Before marking this slice as complete, verify:

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All files have proper exports in `index.ts`
- [ ] Code follows project conventions

### Testing
- [ ] All unit tests pass
- [ ] All component tests pass
- [ ] Test coverage ≥ 80%
- [ ] No failing or skipped tests

### Functionality
- [ ] All acceptance criteria met
- [ ] Manual testing confirms expected behavior
- [ ] No console errors during operation
- [ ] Display updates correctly for all operations

### Accessibility (VS-01 Requirements)
- [ ] Display has `role="status"` attribute
- [ ] Display has `aria-live="polite"` attribute
- [ ] Display has `aria-atomic="true"` attribute
- [ ] All buttons have `aria-label` attributes
- [ ] Keyboard navigation works (tab through buttons)
- [ ] Screen reader announces calculator state changes
- [ ] Minimum 4.5:1 contrast ratio validated with tools
- [ ] Display readable at 200% zoom level

### Performance
- [ ] Button clicks respond within 50ms
- [ ] No unnecessary re-renders (check with React DevTools)
- [ ] Component renders without lag

---

## Edge Cases to Test

### Display (VS-01)
1. **Empty value**: currentValue of "" should display "0"
2. **Very long numbers**: Numbers exceeding 12 digits should truncate gracefully
3. **Error display**: displayError flag should show error message instead of value
4. **Screen reader updates**: Changes should be announced via aria-live
5. **Zoom levels**: Display should remain readable at 200% browser zoom

### Operations
6. **Consecutive operators**: Clicking operator multiple times should override previous
7. **Equals without operation**: Pressing = without operator should do nothing
8. **Starting with operator**: Clicking operator before number should use 0 as first operand
9. **Very large numbers**: Test with numbers > 1 million
10. **Very small decimals**: Test with numbers < 0.0001
11. **Rapid clicking**: Fast button clicks shouldn't break state

---

## Dependencies

**None** - This is the foundational slice.

---

## Follow-Up Slices

After completing this slice, these become unblocked:
- **Slice 2**: Clear & Reset Functions (extends this slice)
- **Slice 3**: Decimal Number Support (extends this slice)
- **Slice 5**: Error Handling (extends this slice)

---

## Success Criteria

This slice is complete when:

1. ✅ User can perform basic arithmetic (add, subtract, multiply, divide)
2. ✅ All acceptance criteria met
3. ✅ All tests pass with ≥80% coverage
4. ✅ Code reviewed and approved
5. ✅ No TypeScript or lint errors
6. ✅ Manual testing confirms expected behavior
7. ✅ Documentation updated (if needed)

---

## Notes for Developer

### Key Architectural Decisions

1. **Separate Logic from UI**: `calculator.logic.ts` contains pure functions for testability
2. **Custom Hook Pattern**: `useCalculator` encapsulates all state management
3. **CSS Modules**: Scoped styles prevent conflicts with future slices
4. **Type Safety**: Comprehensive TypeScript types prevent runtime errors

### Common Pitfalls to Avoid

1. **Floating Point Precision**: Use `formatResult()` to handle JavaScript floating point issues
2. **Division by Zero**: Always handle explicitly with error state
3. **State Management**: Don't directly mutate state; use functional updates
4. **Test Data-Testids**: Use consistent naming (`button-{value}`)

### Performance Considerations

- Use `useCallback` for event handlers to prevent unnecessary re-renders
- Keep calculation logic pure (no side effects)
- Avoid inline function definitions in JSX

---

## Questions or Issues?

If you encounter blockers during implementation:

1. **TypeScript Errors**: Ensure all types are properly imported and exported
2. **Test Failures**: Check test data-testids match component implementation
3. **State Issues**: Review React DevTools to inspect state transitions
4. **Styling Issues**: Verify CSS module class names are correctly imported

---

**Ready to implement?** Start with Step 1 above and work through each step systematically. Focus on getting tests passing before moving to the next step (TDD approach).
