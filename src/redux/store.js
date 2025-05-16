// src/store/reducers/store.js
// src/store/reducers/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';

// Функція для розпарсування JWT токена з урахуванням Base64Url
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT decode error:', e);
    return null;
  }
}

const token = localStorage.getItem('token');
const user = token ? parseJwt(token) : null;

const preloadedState = {
  auth: {
    token: token || null,
    user: user,
    isAuthenticated: !!token && !!user,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  preloadedState,
});

export default store;
