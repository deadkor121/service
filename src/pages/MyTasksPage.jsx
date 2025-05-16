// frontend/src/pages/MyTasksPage.jsx
import React, { useEffect, useState } from 'react';
import { axios } from '../services/api';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyTasksPage = () => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const res = await axios.get(`/tasks?userId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.data || []);
      } catch (err) {
        console.error('Помилка при завантаженні задач', err);
      }
    };

    if (user?.id) {
      fetchMyTasks();
    }
  }, [user, token]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📋 Мої завдання</h2>

      {tasks.length === 0 ? (
        <p>Немає створених завдань</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">
                Ціна: {task.price} грн | Статус: {task.status}
              </p>
              <Link to={`/tasks/${task._id}`} className="text-blue-600 underline mt-2 inline-block">
                Переглянути
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTasksPage;