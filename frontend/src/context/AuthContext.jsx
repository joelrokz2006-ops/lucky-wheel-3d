import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('user_data', JSON.stringify(res.data.user));
      }
    } catch (err) {
      // If server is momentarily unavailable, keep existing local cached user
      console.warn('API sync notice:', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_data', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg) {
        setAuthError(msg);
        return { success: false, message: msg };
      }
      
      // Fallback guest login if server is offline
      const fallbackUser = {
        id: 'local_' + Date.now(),
        name: email.split('@')[0] || 'Player',
        email,
        balance: 1000
      };
      localStorage.setItem('token', 'demo_token_' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    setAuthError(null);
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_data', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg) {
        setAuthError(msg);
        return { success: false, message: msg };
      }

      // Fallback instant register if server is offline
      const newUser = {
        id: 'local_' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        balance: 1000
      };
      localStorage.setItem('token', 'demo_token_' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const updateBalance = (newBalance) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, balance: newBalance } : { name: 'Player', balance: newBalance };
      localStorage.setItem('user_data', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      authError,
      setAuthError,
      login,
      register,
      logout,
      updateBalance,
      fetchCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
