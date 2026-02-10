import { Paper, Typography, Box, useTheme } from '@mui/material';

const Display = ({ value, expression }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '20px',
        backgroundColor: isDark ? '#0a0a0a' : '#1e1e1e',
        color: '#ffffff',
        marginBottom: '20px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      {expression && (
        <Typography
          variant="body2"
          sx={{
            color: isDark ? '#aaa' : '#888',
            fontSize: '1rem',
            marginBottom: '5px',
          }}
        >
          {expression}
        </Typography>
      )}
      <Typography
        variant="h3"
        sx={{
          fontFamily: 'monospace',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          wordBreak: 'break-all',
        }}
      >
        {value || '0'}
      </Typography>
    </Paper>
  );
};

export default Display;
