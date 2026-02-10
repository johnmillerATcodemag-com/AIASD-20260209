import { Button as MuiButton } from '@mui/material';

const Button = ({ value, onClick, variant = 'contained', color = 'primary', fullWidth = false, sx = {} }) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={() => onClick(value)}
      fullWidth={fullWidth}
      sx={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        padding: '20px',
        minHeight: '70px',
        ...sx,
      }}
    >
      {value}
    </MuiButton>
  );
};

export default Button;
