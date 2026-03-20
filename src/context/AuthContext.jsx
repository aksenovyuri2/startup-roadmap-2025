import { createContext, useContext, useState, useCallback } from 'react';

// ← Измени пароль здесь
const ACCESS_PASSWORD = 'startup2025';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(() => {
    return sessionStorage.getItem('auth') === 'true';
  });
  const [error, setError] = useState('');

  const login = useCallback((password) => {
    if (password === ACCESS_PASSWORD) {
      sessionStorage.setItem('auth', 'true');
      setIsAuth(true);
      setError('');
      return true;
    } else {
      setError('Неверный пароль');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('auth');
    setIsAuth(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
