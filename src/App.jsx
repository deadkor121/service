//App.jsx Frontend
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import TaskListingsPage from './pages/CreateTaskPage';
import TaskDetails from './pages/TaskDetails';
import Header from './components/Header/Header';
import DashboardPage from './pages/DashboardPage';
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Захищені маршрути */}
        <Route path="/tasks" element={<PrivateRoute element={<TaskListingsPage />} />} />
        <Route path="/tasks/:id" element={<PrivateRoute element={<TaskDetails />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
