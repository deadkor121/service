
// src/components/TaskCard/TaskCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MapPin, Eye } from 'lucide-react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 transition hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>

      <p className="text-gray-600 mb-2">{task.description?.slice(0, 100) || 'Без опису'}...</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {task.city}
        </span>
        <span className="font-semibold text-green-600">{task.price} грн</span>
      </div>

      <Link
        to={`/tasks/${task._id}`}
        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
      >
        <Eye className="w-4 h-4" />
        Переглянути
      </Link>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
