import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MyService
      </Link>

      <nav className="flex items-center gap-4">
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Увійти
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Реєстрація
        </Link>
      </nav>
    </header>
  );
};

export default Header;
