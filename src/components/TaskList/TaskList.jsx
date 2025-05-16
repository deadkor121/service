// src/components/TaskList/TaskList.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TaskCard from '../TaskCard/TaskCard';
import { fetchTasks } from '../../services/api.js';

const TaskList = ({ filters }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks(filters);
        // Если response имеет структуру { success: true, data: tasks }
        setTasks(response.data || []);
      } catch (error) {
        console.error('Помилка при завантаженні задач', error);
      }
    };

    loadTasks();
  }, [filters]);

  return (
    <div className="grid gap-4">
      {tasks.length === 0 ? (
        <div className="text-gray-600 text-center p-4">Завдань не знайдено</div>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};

TaskList.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default TaskList;
