import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../services/api';
import { loginSuccess } from './../redux/authSlice';
import { parseJwt } from '../utils/decodeJWT';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email: form.email, password: form.password };
    try {
      const res = await axios.post('/auth/login', userData);
      const { token } = res.data;
      const user = parseJwt(token);

      localStorage.setItem('token', token);
      dispatch(loginSuccess({ token, user }));
      navigate('/dashboard');
    } catch (err) {
      console.log('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Вхід</h2>
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        className="input"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded mt-2">
        Увійти
      </button>
    </form>
  );
};

export default LoginPage;
