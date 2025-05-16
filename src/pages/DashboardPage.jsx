// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // <-- беремо користувача з JWT

  const handleCreate = () => navigate('/create-task');
  const handleMyTasks = () => navigate('/my-tasks');

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">👤 Особистий кабінет</h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <p>
          <strong>Ім’я:</strong> {user?.name || 'Невідомо'}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Роль:</strong> {user?.role}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Створити завдання
        </button>
        <button
          onClick={handleMyTasks}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📋 Мої завдання
        </button>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🚪 Вийти
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
