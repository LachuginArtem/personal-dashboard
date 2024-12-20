import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const UserContext = createContext();

// Хук для использования контекста
export const useUser = () => useContext(UserContext);

// Провайдер для управления состоянием пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Метод для входа
  const login = (userData) => setUser(userData);
  
  // Метод для выхода
  const logout = () => setUser(null);

  // Метод для обновления данных пользователя
  const updateUser = (updatedUser) => setUser(updatedUser);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
