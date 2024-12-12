import axios from 'axios';

const API_BASE_URL = 'https://backend-appjava.onrender.com/transactions';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionApi = {
  getAllTransactions: () => api.get(''),  // Changement de '/' à ''
  addTransaction: (transaction) => api.post('', transaction),  // Changement de '/' à ''
  updateTransaction: (id, transaction) => api.put(`/${id}`, transaction),
  deleteTransaction: (id) => api.delete(`/${id}`),
  getTotalBalance: () => api.get('/balance'),
};

export default api;