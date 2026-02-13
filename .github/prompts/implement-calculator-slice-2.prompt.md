---
name: implement-calculator-slice-2
description: Implement Slice 2 (Clear & Reset Functions) for the calculator web app following vertical slice architecture

arguments:
  projectRoot:
    type: string
    description: Path to the calculator-web project root
    default: "calculator-web/web-calculator"

tags: ["vertical-slice", "implementation", "calculator", "react", "typescript"]

# AI Provenance Metadata
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "chrisrockwell"
chat_id: "implement-slice-2-prompt-20260212"
prompt: |
  Create a prompt for implementing slice 2 of the calculator vertical slice plan
started: "2026-02-12T00:00:00Z"
ended: "2026-02-12T00:15:00Z"
task_durations:
  - task: "requirements analysis"
    duration: "00:05:00"
  - task: "prompt creation"
    duration: "00:08:00"
  - task: "review and refinement"
    duration: "00:02:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/02/12/implement-slice-2-prompt-20260212/conversation.md"
source: "chrisrockwell"

# Project Metadata
version: "1.0"
owner: "Development Team"
reviewedBy: "chrisrockwell"
---

# Implement Calculator Slice 2: Clear & Reset Functions

## Objective

Implement **Slice 2: Clear & Reset Functions** as defined in [calculator-vertical-slice-plan.md](../../requirements/calculator-vertical-slice-plan.md).

This slice adds error recovery and workflow control to the calculator by implementing:
- "C" (Clear) button - clears current input but preserves operation
- "AC" (All Clear) button - resets calculator to initial state

## Prerequisites

**MUST verify before starting:**
- [ ] Slice 1 (Basic Calculator Operations) is complete and tested
- [ ] `useCalculator` hook exists at `{{projectRoot}}/src/features/basic-calculator/useCalculator.ts`
- [ ] All Slice 1 tests are passing
- [ ] Project setup complete with React, TypeScript, and testing framework

## Implementation Requirements

### 1. File Structure

Create the following files in the feature folder:

```
{{projectRoot}}/src/features/clear-functions/
├── ClearButtons.tsx                 # Clear/AC button components
├── useClearFunctions.ts             # Clear logic hook
├── clear.utils.ts                   # Clear state utilities
├── ClearButtons.test.tsx            # Component tests
├── ClearButtons.module.css          # Component styles
└── index.ts                         # Public exports
```

### 2. Type Definitions

Add clear function types to the calculator interface:

```typescript
// In clear.utils.ts or calculator.types.ts (shared)
export interface ClearFunctions {
  clear: () => void;          // Clear current input (C button)
  clearAll: () => void;       // Reset everything (AC button)
}
```

### 3. Clear Logic Implementation

**File**: `useClearFunctions.ts`

Create a hook that provides clear functionality:

```typescript
import { useCallback } from 'react';
import type { CalculatorState } from '../basic-calculator/calculator.types';

export interface UseClearFunctionsProps {
  setState: React.Dispatch<React.SetStateAction<CalculatorState>>;
  state: CalculatorState;
}

export function useClearFunctions({ setState, state }: UseClearFunctionsProps) {
  const clear = useCallback(() => {
    // Clear current input but preserve operator and previous value
    setState(prev => ({
      ...prev,
      currentValue: '0',
      result: null
    }));
  }, [setState]);

  const clearAll = useCallback(() => {
    // Reset entire calculator to initial state
    setState({
      currentValue: '0',
      previousValue: '',
      operator: null,
      result: null
    });
  }, [setState]);

  return { clear, clearAll };
}
```

### 4. UI Components

**File**: `ClearButtons.tsx`

Create button components with proper accessibility:

```typescript
import React from 'react';
import styles from './ClearButtons.module.css';

export interface ClearButtonsProps {
  onClear: () => void;
  onClearAll: () => void;
}

export function ClearButtons({ onClear, onClearAll }: ClearButtonsProps) {
  return (
    <div className={styles.clearButtons}>
      <button
        type="button"
        onClick={onClear}
        className={styles.clearButton}
        aria-label="Clear current entry"
        data-testid="clear-button"
      >
        C
      </button>
      <button
        type="button"
        onClick={onClearAll}
        className={styles.clearAllButton}
        aria-label="Clear all and reset calculator"
        data-testid="clear-all-button"
      >
        AC
      </button>
    </div>
  );
}
```

### 5. Integration with Slice 1

**Update**: `{{projectRoot}}/src/features/basic-calculator/useCalculator.ts`

Extend the existing `useCalculator` hook to include clear functions:

```typescript
// Add to existing useCalculator hook
import { useClearFunctions } from '../clear-functions/useClearFunctions';

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operator: null,
    result: null
  });

  // ... existing inputNumber, selectOperator, calculate functions

  // Add clear functions
  const { clear, clearAll } = useClearFunctions({ setState, state });

  return {
    ...state,
    inputNumber,
    selectOperator,
    calculate,
    clear,        // NEW
    clearAll      // NEW
  };
}
```

### 6. Comprehensive Tests

**File**: `ClearButtons.test.tsx`

Write tests covering all acceptance criteria:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ClearButtons } from './ClearButtons';

describe('ClearButtons', () => {
  test('renders C and AC buttons', () => {
    const mockClear = jest.fn();
    const mockClearAll = jest.fn();
    
    render(<ClearButtons onClear={mockClear} onClearAll={mockClearAll} />);
    
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
    expect(screen.getByTestId('clear-all-button')).toBeInTheDocument();
  });

  test('calls onClear when C button clicked', () => {
    const mockClear = jest.fn();
    const mockClearAll = jest.fn();
    
    render(<ClearButtons onClear={mockClear} onClearAll={mockClearAll} />);
    fireEvent.click(screen.getByTestId('clear-button'));
    
    expect(mockClear).toHaveBeenCalledTimes(1);
    expect(mockClearAll).not.toHaveBeenCalled();
  });

  test('calls onClearAll when AC button clicked', () => {
    const mockClear = jest.fn();
    const mockClearAll = jest.fn();
    
    render(<ClearButtons onClear={mockClear} onClearAll={mockClearAll} />);
    fireEvent.click(screen.getByTestId('clear-all-button'));
    
    expect(mockClearAll).toHaveBeenCalledTimes(1);
    expect(mockClear).not.toHaveBeenCalled();
  });

  test('has accessibility labels', () => {
    const mockClear = jest.fn();
    const mockClearAll = jest.fn();
    
    render(<ClearButtons onClear={mockClear} onClearAll={mockClearAll} />);
    
    expect(screen.getByLabelText('Clear current entry')).toBeInTheDocument();
    expect(screen.getByLabelText('Clear all and reset calculator')).toBeInTheDocument();
  });
});
```

**File**: `useClearFunctions.test.ts`

Test the hook logic in isolation:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import { useClearFunctions } from './useClearFunctions';
import type { CalculatorState } from '../basic-calculator/calculator.types';

describe('useClearFunctions', () => {
  test('clear removes current input but preserves operator', () => {
    const { result } = renderHook(() => {
      const [state, setState] = useState<CalculatorState>({
        currentValue: '123',
        previousValue: '5',
        operator: '+',
        result: null
      });
      const clearFns = useClearFunctions({ state, setState });
      return { state, ...clearFns };
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.state.currentValue).toBe('0');
    expect(result.current.state.previousValue).toBe('5');
    expect(result.current.state.operator).toBe('+');
    expect(result.current.state.result).toBeNull();
  });

  test('clearAll resets entire calculator state', () => {
    const { result } = renderHook(() => {
      const [state, setState] = useState<CalculatorState>({
        currentValue: '123',
        previousValue: '5',
        operator: '+',
        result: '128'
      });
      const clearFns = useClearFunctions({ state, setState });
      return { state, ...clearFns };
    });

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.state).toEqual({
      currentValue: '0',
      previousValue: '',
      operator: null,
      result: null
    });
  });

  test('clear clears result when present', () => {
    const { result } = renderHook(() => {
      const [state, setState] = useState<CalculatorState>({
        currentValue: '8',
        previousValue: '5',
        operator: '+',
        result: '13'
      });
      const clearFns = useClearFunctions({ state, setState });
      return { state, ...clearFns };
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.state.result).toBeNull();
    expect(result.current.state.currentValue).toBe('0');
  });
});
```

### 7. Integration Tests

**File**: Update existing `BasicCalculator.test.tsx` to include clear functionality:

```typescript
describe('BasicCalculator with Clear Functions', () => {
  test('clear button resets current input during operation', () => {
    render(<BasicCalculator />);
    
    // Enter: 5 + 3
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    
    // Click clear
    fireEvent.click(screen.getByTestId('clear-button'));
    
    // Should show 0, but still have + operator ready
    expect(screen.getByTestId('display')).toHaveTextContent('0');
    
    // Complete operation: now 5 + 0 = 5
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('display')).toHaveTextContent('5');
  });

  test('AC button resets entire calculator', () => {
    render(<BasicCalculator />);
    
    // Enter: 5 + 3 = 8
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('display')).toHaveTextContent('8');
    
    // Click AC
    fireEvent.click(screen.getByTestId('clear-all-button'));
    
    // Should be completely reset
    expect(screen.getByTestId('display')).toHaveTextContent('0');
    
    // New calculation should work independently: 2 + 2 = 4
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId('display')).toHaveTextContent('4');
  });
});
```

### 8. Styling

**File**: `ClearButtons.module.css`

Create responsive, accessible button styles:

```css
.clearButtons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.clearButton,
.clearAllButton {
  flex: 1;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clearButton:hover,
.clearAllButton:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.clearButton:active,
.clearAllButton:active {
  transform: translateY(0);
  box-shadow: none;
}

.clearAllButton {
  background-color: #ffebee;
  border-color: #ffcdd2;
  color: #c62828;
}

.clearAllButton:hover {
  background-color: #ffcdd2;
}

/* Accessibility: Focus states */
.clearButton:focus-visible,
.clearAllButton:focus-visible {
  outline: 3px solid #1976d2;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .clearButton,
  .clearAllButton {
    padding: 0.75rem;
    font-size: 1rem;
  }
}
```

## Acceptance Criteria Verification

Before marking this slice complete, verify:

- [ ] **AC1**: "C" button clears current input value to "0"
- [ ] **AC2**: "C" button preserves operator and previous value
- [ ] **AC3**: "AC" button resets all state to initial values
- [ ] **AC4**: Display updates correctly after clear operations
- [ ] **AC5**: Calculator can perform new calculation after AC
- [ ] **AC6**: No state leaks or memory issues after clear
- [ ] **AC7**: All unit tests pass (100% coverage target)
- [ ] **AC8**: All integration tests pass
- [ ] **AC9**: Buttons have proper accessibility labels
- [ ] **AC10**: No console errors or warnings

## Testing Checklist

Execute the following manual tests:

### Clear (C) Button Tests
1. Enter "5", press "+", enter "3", press "C"
   - Expected: Display shows "0", operation preserved
   - On "=": Display shows "5"

2. Enter "7", press "×", enter "8", press "C", enter "2", press "="
   - Expected: Display shows "14" (7 × 2)

3. Calculate "10 ÷ 2 = 5", press "C"
   - Expected: Display shows "0", can start new calculation

### Clear All (AC) Button Tests
1. Enter "5", press "+", enter "3", press "AC"
   - Expected: Display shows "0", no operator stored
   - Enter "2", press "=": Display remains "2"

2. Calculate "100 - 25 = 75", press "AC"
   - Expected: Completely reset, display "0"
   - New calculation "4 + 4 = 8" works independently

3. During any operation, press "AC"
   - Expected: Immediate reset, ready for new calculation

## Code Quality Requirements

Ensure the following quality standards:

- [ ] TypeScript strict mode with no `any` types
- [ ] All functions have JSDoc comments explaining purpose
- [ ] Clear naming following project conventions
- [ ] No magic numbers or hardcoded strings
- [ ] Proper error boundaries (if applicable)
- [ ] Performance: No unnecessary re-renders
- [ ] Accessibility: ARIA labels on all interactive elements
- [ ] Responsive: Works on mobile, tablet, desktop
- [ ] No console warnings or errors

## Documentation Updates

Update the following documentation:

1. **README.md**: Add Slice 2 to completed features list
2. **Component Documentation**: Document ClearButtons props and usage
3. **Hook Documentation**: Document useClearFunctions return values
4. **Integration Guide**: Show how to integrate clear buttons into calculator UI

## Completion Definition of Done

This slice is considered **DONE** when:

1. ✅ All files created in correct locations
2. ✅ All functions implemented per specification
3. ✅ All tests pass with ≥80% coverage
4. ✅ Integration with Slice 1 works flawlessly
5. ✅ Manual acceptance criteria verified
6. ✅ Code reviewed and approved
7. ✅ Documentation updated
8. ✅ No regressions in Slice 1 functionality
9. ✅ Deployed to dev environment successfully
10. ✅ Product owner acceptance obtained

## Reference Materials

- **Vertical Slice Plan**: [calculator-vertical-slice-plan.md](../../requirements/calculator-vertical-slice-plan.md)
- **PRD**: [calculator-web-app-prd.md](../../requirements/calculator-web-app-prd.md)
- **Slice 1 Code**: `{{projectRoot}}/src/features/basic-calculator/`
- **Testing Standards**: [testing-jest-rtl.instructions.md](../instructions/testing-jest-rtl.instructions.md)
- **React/TypeScript Guidelines**: [react-typescript.instructions.md](../instructions/react-typescript.instructions.md)

## Common Pitfalls to Avoid

❌ **Don't**:
- Mutate state directly (use setState properly)
- Forget to clear the `result` field
- Hardcode initial state values (use constants)
- Skip accessibility attributes
- Leave TODO comments in production code
- Copy-paste without understanding

✅ **Do**:
- Use functional setState updates
- Test edge cases (empty state, after error, etc.)
- Follow React hooks rules
- Add meaningful test descriptions
- Keep functions pure where possible
- Document non-obvious logic

## Success Metrics

This slice succeeds when:

- **User Experience**: Clear and AC buttons work intuitively
- **Code Quality**: Clean, testable, maintainable code
- **Test Coverage**: Comprehensive tests demonstrating correctness
- **Integration**: Seamless integration with existing calculator
- **Performance**: No perceptible lag or rendering issues
- **Accessibility**: Fully keyboard and screen reader accessible

## Next Steps After Completion

Once Slice 2 is complete:
1. Merge feature branch to main
2. Deploy to development environment
3. Conduct user acceptance testing
4. Begin Slice 3 (Decimal Number Support)
5. Update project roadmap and velocity metrics

---

**Estimated Effort**: 1 day (6-8 hours)
**Dependencies**: Slice 1 must be complete
**Risk Level**: Low (straightforward state management)
**Priority**: Critical (foundational feature for MVP)
