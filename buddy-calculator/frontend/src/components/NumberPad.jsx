import { Grid } from '@mui/material';
import Button from './Button';

const NumberPad = ({ onNumberClick, onOperatorClick, onEquals, onClear, onDelete, onDecimal }) => {
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  const operators = [
    { label: '÷', value: 'divide', color: 'warning' },
    { label: '×', value: 'multiply', color: 'warning' },
    { label: '-', value: 'subtract', color: 'warning' },
    { label: '+', value: 'add', color: 'warning' },
  ];

  return (
    <Grid container spacing={1}>
      {/* Clear and Delete buttons */}
      <Grid size={6}>
        <Button value="C" onClick={onClear} color="error" fullWidth />
      </Grid>
      <Grid size={6}>
        <Button value="←" onClick={onDelete} color="secondary" fullWidth />
      </Grid>

      {/* Number pad and operators */}
      <Grid size={9}>
        <Grid container spacing={1}>
          {numbers.map((num) => (
            <Grid size={4} key={num}>
              <Button
                value={num}
                onClick={onNumberClick}
                color="primary"
                fullWidth
              />
            </Grid>
          ))}
          <Grid size={8}>
            <Button value="." onClick={onDecimal} color="primary" fullWidth />
          </Grid>
          <Grid size={4}>
            <Button value="=" onClick={onEquals} color="success" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      {/* Operators column */}
      <Grid size={3}>
        <Grid container spacing={1}>
          {operators.map((op) => (
            <Grid size={12} key={op.value}>
              <Button
                value={op.label}
                onClick={() => onOperatorClick(op.value)}
                color={op.color}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NumberPad;
