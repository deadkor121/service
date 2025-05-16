import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Замовник',
    location: '',
  });

  const navigate = useNavigate();

  // Перевіряємо наявність токену і редиректимо на головну сторінку, якщо токен існує
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // або на іншу сторінку, якщо потрібно
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      navigate('/login'); // Редирект після успішної реєстрації
    } catch (err) {
      alert('Помилка реєстрації');
    }
  };


   return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Реєстрація</h2>
      <input type="text" placeholder="Ім'я" className="input" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="email" placeholder="Email" className="input" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Пароль" className="input" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input">
        <option value="customer">Замовник</option>
        <option value="executor">Виконавець</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Зареєструватися</button>
    </form>
  );
};

export default RegisterPage;
