import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Alert, Box, IconButton, List, ListItem, ListItemText, Collapse, Divider, Switch, FormControlLabel } from '@mui/material';
import 'material-symbols/rounded.css';
import Display from './Display';
import NumberPad from './NumberPad';
import ScientificPad from './ScientificPad';
import { calculatorApi } from '../services/calculatorApi';

const Calculator = ({ mode, toggleTheme }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [operation, setOperation] = useState(null);
  const [expression, setExpression] = useState('');
  const [isNewInput, setIsNewInput] = useState(true);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [isScientific, setIsScientific] = useState(false);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [pendingScientificOp, setPendingScientificOp] = useState(null);

  const handleNumberClick = (num) => {
    setError('');
    if (isNewInput) {
      setCurrentInput(num);
      setIsNewInput(false);
    } else {
      setCurrentInput(currentInput + num);
    }
  };

  const handleOperatorClick = (op) => {
    setError('');
    if (currentInput) {
      if (previousInput && operation && !isNewInput) {
        // Chain calculations
        handleEqualsWithCallback(() => {
          setOperation(op);
        });
      } else {
        setPreviousInput(currentInput);
        setCurrentInput('');
        setOperation(op);
        setIsNewInput(true);
        
        const operatorSymbols = {
          add: '+',
          subtract: '-',
          multiply: '×',
          divide: '÷',
        };
        setExpression(`${currentInput} ${operatorSymbols[op]}`);
      }
    } else if (previousInput) {
      setOperation(op);
      const operatorSymbols = {
        add: '+',
        subtract: '-',
        multiply: '×',
        divide: '÷',
      };
      setExpression(`${previousInput} ${operatorSymbols[op]}`);
    }
  };

  const handleEqualsWithCallback = async (callback) => {
    if (previousInput && currentInput && operation) {
      try {
        const result = await calculatorApi.calculate(
          parseFloat(previousInput),
          parseFloat(currentInput),
          operation
        );

        if (result.success) {
          setExpression(result.expression);
          setPreviousInput(result.result.toString());
          setCurrentInput('');
          setOperation(null);
          setIsNewInput(true);
          setError('');
          
          // Add to history
          setHistory(prev => [{
            id: Date.now(),
            expression: result.expression,
            result: result.result,
            timestamp: new Date().toLocaleTimeString()
          }, ...prev]);
          
          if (callback && typeof callback === 'function') {
            callback();
          }
        } else {
          setError(result.error || 'Calculation failed');
          setIsNewInput(true);
        }
      } catch (err) {
        setError('Unable to connect to calculator service');
        console.error('Calculation error:', err);
      }
    }
  };

  const handleEquals = async () => {
    await handleEqualsWithCallback();
  };

  const handleClear = () => {
    setCurrentInput('');
    setPreviousInput('');
    setOperation(null);
    setExpression('');
    setIsNewInput(true);
    setError('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  const handleDelete = () => {
    setError('');
    if (currentInput) {
      const newInput = currentInput.slice(0, -1);
      setCurrentInput(newInput);
      if (newInput === '') {
        setIsNewInput(true);
      }
    }
  };

  const handleDecimal = () => {
    setError('');
    if (isNewInput) {
      setCurrentInput('0.');
      setIsNewInput(false);
    } else if (currentInput && !currentInput.includes('.')) {
      setCurrentInput(currentInput + '.');
    } else if (!currentInput) {
      setCurrentInput('0.');
    }
  };

  const handleScientificClick = async (operation) => {
    setError('');
    
    const value = currentInput || previousInput || '0';
    const numValue = parseFloat(value);

    // Operations that need two values
    if (operation === 'power' || operation === 'mod') {
      if (!waitingForSecondValue) {
        setPreviousInput(value);
        setPendingScientificOp(operation);
        setWaitingForSecondValue(true);
        setCurrentInput('');
        const symbol = operation === 'power' ? '^' : ' mod ';
        setExpression(`${value}${symbol}`);
        setIsNewInput(true);
        return;
      }
    }

    // For square, convert to power with exponent 2
    if (operation === 'square') {
      operation = 'power';
    }

    try {
      let result;
      
      if (waitingForSecondValue && (pendingScientificOp === 'power' || pendingScientificOp === 'mod')) {
        result = await calculatorApi.scientific(
          parseFloat(previousInput),
          pendingScientificOp,
          numValue
        );
        setWaitingForSecondValue(false);
        setPendingScientificOp(null);
      } else if (operation === 'square') {
        result = await calculatorApi.scientific(numValue, 'power', 2);
      } else {
        result = await calculatorApi.scientific(numValue, operation);
      }

      if (result.success) {
        setExpression(result.expression);
        setPreviousInput(result.result.toString());
        setCurrentInput('');
        setOperation(null);
        setIsNewInput(true);
        setError('');
        
        // Add to history
        setHistory(prev => [{
          id: Date.now(),
          expression: result.expression,
          result: result.result,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev]);
      } else {
        setError(result.error || 'Calculation failed');
        setIsNewInput(true);
      }
    } catch (err) {
      setError('Unable to connect to calculator service');
      console.error('Scientific calculation error:', err);
    }
  };

  const handleConstantClick = (constant) => {
    setError('');
    let value;
    if (constant === 'pi') {
      value = Math.PI.toString();
    } else if (constant === 'e') {
      value = Math.E.toString();
    }
    
    if (isNewInput) {
      setCurrentInput(value);
      setIsNewInput(false);
    } else {
      setCurrentInput(currentInput + value);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === '+') {
        handleOperatorClick('add');
      } else if (e.key === '-') {
        handleOperatorClick('subtract');
      } else if (e.key === '*') {
        handleOperatorClick('multiply');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperatorClick('divide');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentInput, previousInput, operation, isNewInput]);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: isScientific ? '1000px' : '900px', transition: 'max-width 0.3s ease' }}>
        {/* History Panel */}
        <Collapse orientation="horizontal" in={historyOpen} sx={{ maxWidth: historyOpen ? '300px' : '0' }}>
          <Paper 
            elevation={6} 
            sx={{ 
              padding: '20px',
              borderRadius: '15px',
              width: '300px',
              height: 'fit-content',
              maxHeight: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span className="material-symbols-rounded" style={{ color: 'var(--mui-palette-primary-main)', fontSize: '24px' }}>history</span>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  History
                </Typography>
              </Box>
              {history.length > 0 && (
                <IconButton size="small" onClick={clearHistory} title="Clear History">
                  <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>delete</span>
                </IconButton>
              )}
            </Box>
            <Divider sx={{ marginBottom: '10px' }} />
            <Box sx={{ overflowY: 'auto', flex: 1 }}>
              {history.length === 0 ? (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: '20px' }}>
                  No calculations yet
                </Typography>
              ) : (
                <List dense>
                  {history.map((item) => (
                    <ListItem 
                      key={item.id}
                      sx={{ 
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        backgroundColor: 'action.hover',
                        marginBottom: '8px',
                        borderRadius: '8px',
                        padding: '10px'
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {item.expression}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        = {item.result}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.timestamp}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Collapse>

        {/* Calculator */}
        <Box sx={{ position: 'relative', flex: 1, maxWidth: isScientific ? '600px' : '500px', transition: 'max-width 0.3s ease' }}>
          {/* Toggle Button */}
          <IconButton
            onClick={toggleHistory}
            sx={{
              position: 'absolute',
              left: '-20px',
              top: '20px',
              zIndex: 1,
              backgroundColor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <span className="material-symbols-rounded">{historyOpen ? 'chevron_left' : 'chevron_right'}</span>
          </IconButton>

          <Paper elevation={6} sx={{ padding: '30px', borderRadius: '15px', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Calculator
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                    {mode === 'dark' ? 'dark_mode' : 'light_mode'}
                  </span>
                  <Typography variant="body2">Dark</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isScientific}
                  onChange={(e) => setIsScientific(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>functions</span>
                  <Typography variant="body2">Scientific</Typography>
                </Box>
              }
            />
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ marginBottom: '20px' }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Display
          value={
            currentInput
              ? currentInput
              : previousInput
              ? previousInput
              : '0'
          }
          expression={expression}
        />

        {isScientific ? (
          <ScientificPad
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
            onEquals={handleEquals}
            onClear={handleClear}
            onDelete={handleDelete}
            onDecimal={handleDecimal}
            onScientificClick={handleScientificClick}
            onConstantClick={handleConstantClick}
          />
        ) : (
          <NumberPad
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
            onEquals={handleEquals}
            onClear={handleClear}
            onDelete={handleDelete}
            onDecimal={handleDecimal}
          />
        )}

        <Typography
          variant="caption"
          align="center"
          display="block"
          sx={{ marginTop: '20px', color: 'text.secondary' }}
        >
          Keyboard shortcuts: Numbers, +, -, *, /, Enter, Esc, Backspace
        </Typography>
      </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Calculator;
