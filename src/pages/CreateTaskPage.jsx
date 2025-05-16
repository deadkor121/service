
// frontend/src/pages/CreateTaskPage.jsx
import React, { useState } from 'react';
import axios from '../services/api';

const CreateTaskPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/tasks', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Заявку створено');
    } catch (err) {
      alert('Помилка при створенні');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Заголовок" onChange={handleChange} />
      <textarea name="description" placeholder="Опис" onChange={handleChange} />
      <input name="price" placeholder="Ціна" onChange={handleChange} />
      <input name="city" placeholder="Місто" onChange={handleChange} />
      <button type="submit">Створити</button>
    </form>
  );
};

export default CreateTaskPage;
