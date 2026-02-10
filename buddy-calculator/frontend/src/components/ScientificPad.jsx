import { Grid } from '@mui/material';
import Button from './Button';

const ScientificPad = ({ 
  onNumberClick, 
  onOperatorClick, 
  onEquals, 
  onClear, 
  onDelete, 
  onDecimal,
  onScientificClick,
  onConstantClick 
}) => {
  // Row 1: Constants & Memory
  const row1 = [
    { label: '2nd', value: '2nd', color: 'secondary', disabled: true }, // Placeholder for future secondary functions
    { label: 'π', value: 'pi', color: 'info', onClick: onConstantClick },
    { label: 'e', value: 'e', color: 'info', onClick: onConstantClick },
    { label: 'C', value: 'clear', color: 'error', onClick: onClear },
    { label: '←', value: 'delete', color: 'secondary', onClick: onDelete },
  ];

  // Row 2: Basic Functions
  const row2 = [
    { label: 'x²', value: 'square', color: 'info' },
    { label: '1/x', value: 'reciprocal', color: 'info' },
    { label: '|x|', value: 'abs', color: 'info' },
    { label: 'exp', value: 'exp', color: 'info' },
    { label: 'mod', value: 'mod', color: 'info' },
  ];

  // Row 3: Grouping & Factorials
  const row3 = [
    { label: '√', value: 'sqrt', color: 'info' },
    { label: '(', value: '(', color: 'secondary', disabled: true },
    { label: ')', value: ')', color: 'secondary', disabled: true },
    { label: 'n!', value: 'factorial', color: 'info' },
    { label: '÷', value: 'divide', color: 'warning', onClick: onOperatorClick },
  ];

  // Row 4: Powers & Top-tier Digits
  const row4 = [
    { label: 'xʸ', value: 'power', color: 'info' },
    { label: '7', value: '7', color: 'primary', onClick: onNumberClick },
    { label: '8', value: '8', color: 'primary', onClick: onNumberClick },
    { label: '9', value: '9', color: 'primary', onClick: onNumberClick },
    { label: '×', value: 'multiply', color: 'warning', onClick: onOperatorClick },
  ];

  // Row 5: Base 10 & Mid-tier Digits
  const row5 = [
    { label: '10ˣ', value: 'poweroften', color: 'info' },
    { label: '4', value: '4', color: 'primary', onClick: onNumberClick },
    { label: '5', value: '5', color: 'primary', onClick: onNumberClick },
    { label: '6', value: '6', color: 'primary', onClick: onNumberClick },
    { label: '-', value: 'subtract', color: 'warning', onClick: onOperatorClick },
  ];

  // Row 6: Logs & Low-tier Digits
  const row6 = [
    { label: 'log', value: 'log', color: 'info' },
    { label: '1', value: '1', color: 'primary', onClick: onNumberClick },
    { label: '2', value: '2', color: 'primary', onClick: onNumberClick },
    { label: '3', value: '3', color: 'primary', onClick: onNumberClick },
    { label: '+', value: 'add', color: 'warning', onClick: onOperatorClick },
  ];

  // Row 7: Natural Log & Zero
  const row7 = [
    { label: 'ln', value: 'ln', color: 'info' },
    { label: '±', value: 'negate', color: 'secondary' },
    { label: '0', value: '0', color: 'primary', onClick: onNumberClick },
    { label: '.', value: '.', color: 'primary', onClick: onDecimal },
    { label: '=', value: '=', color: 'success', onClick: onEquals },
  ];

  const handleClick = (btn) => {
    if (btn.disabled) return;
    
    if (btn.onClick) {
      if (btn.onClick === onOperatorClick || btn.onClick === onNumberClick) {
        btn.onClick(btn.value);
      } else {
        btn.onClick();
      }
    } else {
      onScientificClick(btn.value);
    }
  };

  const allRows = [row1, row2, row3, row4, row5, row6, row7];

  return (
    <Grid container spacing={1}>
      {allRows.map((row, rowIndex) => (
        row.map((btn) => (
          <Grid size={2.4} key={`${rowIndex}-${btn.value}`}>
            <Button
              value={btn.label}
              onClick={() => handleClick(btn)}
              color={btn.color}
              fullWidth
              sx={{ 
                fontSize: '1.2rem',
                opacity: btn.disabled ? 0.5 : 1,
                cursor: btn.disabled ? 'not-allowed' : 'pointer'
              }}
            />
          </Grid>
        ))
      ))}
    </Grid>
  );
};

export default ScientificPad;
