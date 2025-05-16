// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // Замени на актуальный URL твоего сервера

// Функция для получения задач с учетом фильтров
export const fetchTasks = async (filters) => {
  try {
    const { city, price } = filters;
    const response = await axios.get(API_URL, {
      params: { city, price }, // Добавляем фильтры в параметры запроса
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
