
// src/components/TaskFilters/TaskFilters.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskFilters = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ city, price });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md grid md:grid-cols-3 gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Місто"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-gray-300 rounded-xl p-2 w-full"
      />
      <input
        type="number"
        placeholder="Макс. ціна"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 rounded-xl p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition"
      >
        Застосувати фільтри
      </button>
    </form>
  );
};
TaskFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default TaskFilters;

