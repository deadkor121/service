// frontend/src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // отримуємо { id, email, role, name... }
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
        setUser(null);
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return { token, user, logout };
};

export default useAuth;
