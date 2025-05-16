// frontend/src/pages/HomePage.jsx
import React, { useState } from 'react';
import TaskFilters from '../components/TaskFilters/TaskFilters';
import TaskList from '../components/TaskList/TaskList';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import { searchTasks } from '../services/api'; // импорт сервиса для поиска задач

const HomePage = () => {
  const [filters, setFilters] = useState({ city: '', price: '', query: '' });
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    try {
      const results = await searchTasks(query, filters);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Если есть поисковый запрос, обновляем результаты
    if (updatedFilters.query) {
      handleSearch(updatedFilters.query);
    }
  };

  return (
    <div className="home-page px-4 py-6 max-w-7xl mx-auto">
      {/* Hero / Banner Section */}
      <section className="bg-blue-100 rounded-2xl p-6 mb-8 shadow">
        <h1 className="text-3xl font-bold mb-4">Знайдіть виконавця для будь-якого завдання</h1>
        <SearchBar onSearch={handleSearch} withSuggestions={true} />
      </section>

      {/* Категорії послуг */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Категорії послуг</h2>
        <CategoryGrid onSelectCategory={(category) => handleFilterChange({ category })} />
      </section>

      {/* Фільтри */}
      <section className="mb-4">
        <TaskFilters onFilterChange={handleFilterChange} />
      </section>

      {/* Список завдань */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          {searchResults ? 'Результати пошуку' : 'Останні завдання'}
        </h2>
        <TaskList tasks={searchResults} filters={filters} />
      </section>
    </div>
  );
};

export default HomePage;
