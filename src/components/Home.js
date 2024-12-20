import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать в Личный Кабинет</h1>
      <p className="text-lg mb-6">Пожалуйста, войдите, чтобы продолжить.</p>
      <Link
        to="/login"
        className="px-6 py-3 bg-white text-blue-500 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
      >
        Войти
      </Link>
    </div>
  );
};

export default Home;
