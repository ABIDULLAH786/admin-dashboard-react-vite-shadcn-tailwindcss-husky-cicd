import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BINANCE_API_URL || 'https://fapi.binance.com/fapi/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for global error handling (e.g., Auth Expiry)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for Auth Expiry strategy mentioned in README
      window.location.href = '/connect?expired=true';
    }
    return Promise.reject(error);
  }
);

export default apiClient;