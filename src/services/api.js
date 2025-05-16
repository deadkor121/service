// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://muservice.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерцептор для автоматической вставки токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Функция для получения задач с фильтрами
export const fetchTasks = async (filters = {}) => {
  // Очищаем фильтры от пустых значений
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== '' && v !== null)
  );
  const queryParams = new URLSearchParams(cleanedFilters).toString();
  const url = queryParams ? `/tasks?${queryParams}` : '/tasks';

  const response = await api.get(url);
  return response.data;
};

// Функция для получения одной задачи по ID
export const fetchTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const searchTasks = async (query, additionalFilters = {}) => {
  try {
    const params = {
      query,
      ...additionalFilters
    };
    const response = await api.get('/tasks/search', { params });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const getSearchSuggestions = async (query) => {
  try {
    const response = await api.get('/tasks/suggestions', { 
      params: { query } 
    });
    return response.data;
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
};

export default api;
