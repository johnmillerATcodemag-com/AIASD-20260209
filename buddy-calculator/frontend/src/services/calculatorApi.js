import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5037';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculatorApi = {
  calculate: async (operand1, operand2, operation) => {
    try {
      const response = await api.post('/api/calculator/calculate', {
        operand1,
        operand2,
        operation,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  scientific: async (value, operation, secondValue = null) => {
    try {
      const response = await api.post('/api/calculator/scientific', {
        value,
        operation,
        secondValue,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  healthCheck: async () => {
    try {
      const response = await api.get('/api/calculator/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy' };
    }
  },
};

export default api;
