import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import TaskListingsPage from '../pages/TaskListingsPage.jsx'; // Пример защищённой страницы
import PrivateRoute from '../components/PrivateRoute'; // Импортируем PrivateRoute

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Применяем PrivateRoute для защищенной страницы */}
      <PrivateRoute path="/tasks" element={<TaskListingsPage />} />

      {/* Добавьте другие защищенные маршруты, если необходимо */}
    </Routes>
  </BrowserRouter>
);

export default Router;
