import axios from 'axios';

// Базова адреса локального REST API сервера
const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const toolsApi = {
  // GET /api/tools з передачею фільтра як URL query-параметра
  getTools: async (category = 'all') => {
    const params = category !== 'all' ? { category } : {};
    const response = await apiClient.get('/tools', { params });
    return response.data;
  },

  // GET /api/tools/:id — отримання одного інструмента
  getToolById: async (id) => {
    const response = await apiClient.get(`/tools/${id}`);
    return response.data;
  },
};