// src/pages/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../services/api'; // Импорт функции для получения задачи
import RespondButton from '../components/RespondButton';
import api from '../services/api'; // Импортируем объект API для использования patch


const TaskDetails = () => {
  const { id } = useParams(); // Получаем ID задачи из URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  const fetchTask = async () => {
    try {
      setLoading(true);
      const data = await fetchTaskById(id);
      setTask(data);
    } catch (err) {
      console.error(err);
      setError('Не вдалося отримати задачу');
    } finally {
      setLoading(false);
    }
  };

  const assignExecutor = async (executorId) => {
    try {
      await api.patch(`/tasks/assign/${id}`, { executorId }); // Используем объект api для отправки запроса
      fetchTask(); // Обновляем задачу после назначения исполнителя
    } catch (err) {
      console.error(err);
      alert('Помилка при призначенні виконавця');
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]); // Загружаем задачу при изменении ID

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p>{task.description}</p>
      <p>Бюджет: {task.price} грн</p>
      <p>Статус: {task.status}</p>
      <hr className="my-4" />
      <RespondButton taskId={task._id} />
      {task.responses?.length === 0 ? (
        <p>Ще немає відгуків</p>
      ) : (
        <ul>
          {task.responses.map((user) => (
            <li key={user._id} className="mb-2 flex justify-between items-center">
              <span>{user.name}</span>
              {task.executor?._id === user._id ? (
                <span className="text-green-600 font-bold">Призначений</span>
              ) : (
                <button
                  onClick={() => assignExecutor(user._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Призначити
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskDetails;
