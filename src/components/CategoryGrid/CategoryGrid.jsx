import React from 'react';
import PropTypes from 'prop-types';

const categories = [
  { name: 'Прибирання', icon: '🧹' },
  { name: 'Ремонт', icon: '🛠️' },
  { name: 'Доставка', icon: '📦' },
  { name: 'Переїзд', icon: '🚚' },
  { name: 'Комп’ютери', icon: '💻' },
  { name: 'Робота по дому', icon: '🏠' },
  { name: 'Ремонт техніки', icon: '🔌' },
  { name: 'Інше', icon: '➕' },
];

const CategoryGrid = ({ onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelectCategory(cat.name)}
          className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
        >
          <div className="text-3xl mb-2">{cat.icon}</div>
          <div className="text-sm font-medium">{cat.name}</div>
        </button>
      ))}
    </div>
  );
};
CategoryGrid.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryGrid;

