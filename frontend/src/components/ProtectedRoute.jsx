import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Перевіряємо наявність збереженого користувача в LocalStorage
  const user = localStorage.getItem('mb_user');

  // Якщо даних немає — перенаправляємо на сторінку входу
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}