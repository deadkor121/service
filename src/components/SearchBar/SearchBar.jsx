import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiSearch, FiX } from 'react-icons/fi';
import { getSearchSuggestions } from '../../services/api';

const SearchBar = ({ onSearch, initialQuery = '', withSuggestions = false }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Получаем подсказки с сервера с дебаунсом 300 мс
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1 && withSuggestions) {
        setIsLoading(true);
        try {
          const data = await getSearchSuggestions(query);
          setSuggestions(data);
        } catch (error) {
          console.error('Failed to get suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query, withSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (initialQuery !== '') {
      onSearch('');
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Що потрібно зробити? Наприклад: ремонт, перевезення..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Пошук послуг"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Очистити пошук"
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
        >
          Знайти виконавця
        </button>
      </form>

      {isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-white p-2 text-center text-gray-500">
          Завантаження...
        </div>
      )}

      {isFocused && withSuggestions && suggestions.length > 0 && !isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-3 hover:bg-gray-50 cursor-pointer"
                onMouseDown={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isFocused && withSuggestions && query.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-3 text-sm font-semibold">Популярні запити:</div>
          <ul>
            {suggestions.slice(0, 5).map((item, index) => (
              <li
                key={index}
                className="p-3 hover:bg-gray-50 cursor-pointer"
                onMouseDown={() => selectSuggestion(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialQuery: PropTypes.string,
  withSuggestions: PropTypes.bool,
};

export default SearchBar;
