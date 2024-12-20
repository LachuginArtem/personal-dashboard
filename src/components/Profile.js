import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Form from './Form';

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user || {});

  const toggleFormVisibility = () => {
    setIsFormVisible(true);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveChanges = () => {
    updateUser(profileData);
    setIsEditing(false);
    alert('Профиль успешно обновлён!');
  };

  return (
    <div className="flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-blue-800 text-white shadow-md fixed top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Личный кабинет</h1>
          <div className="flex space-x-4">
            <Link to="/help" className="hover:underline">Помощь</Link>
            <Link to="/contact" className="hover:underline">Контакты</Link>
          </div>
        </div>
      </header>

      <div className="flex flex-grow mt-16">
        {/* Sidebar Navigation */}
        <div className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg flex flex-col pt-16">
          <div className="flex items-center px-6 py-4 border-b border-purple-700">
            <FaUserCircle className="text-3xl text-white mr-3" />
            {user ? (
              <span className="text-xl font-semibold">{user.name}</span>
            ) : (
              <Link to="/login" className="text-white hover:underline">Войти</Link>
            )}
          </div>
          <ul className="mt-4 flex-grow">
            <li className="mb-2">
              <button
                onClick={toggleEditing}
                className="w-full text-left px-6 py-3 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Мои данные
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={toggleFormVisibility}
                className="w-full text-left px-6 py-3 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Рекомендательная система
              </button>
            </li>
            {user && (
              <li className="mb-2">
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-6 py-3 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Выход
                </button>
              </li>
            )}
          </ul>
          <div className="px-6 py-4 text-sm text-center border-t border-purple-700">
            <p>&copy; 2024 TIU</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8 flex flex-col items-center justify-center min-h-screen">
          {isFormVisible ? (
            <Form />
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center">Добро пожаловать!</h2>
              <p className="text-xl text-center mb-4">Перейдите во вкладку "Рекомендательная система" чтобы узнать свои шансы на поступление.</p>
              <p className="text-xl text-center">Введя свои данные и нажав кнопку «Рассчитать», вы узнаете процент на поступление на специальности, которые подберет наша система.</p>

              <div className="bg-gradient-to-r from-blue-600 to-purple-700 mt-16 p-8 rounded-full shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-white">Рекомендательная система</h2>
                <p className="text-white">Здесь вы можете ввести свои данные и получить рекомендации, какое направление вам больше подходит.</p>
              </div>
            </>
          )}
        </div>

        {/* Profile Editing Modal */}
        {isEditing && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Редактирование профиля</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={saveChanges}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={toggleEditing}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
