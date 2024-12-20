import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Form from './Form'; // Импортируем компонент формы

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const [profileData, setProfileData] = useState(user || {});
  const [isEditable, setIsEditable] = useState(false); // Toggle visibility for profile form
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle visibility for recommendation form
  const [classificationData, setClassificationData] = useState({
    gender: '',
    hostel: '',
    gpa: 4,
    priority: 0,
    exams_points: 0,
    bonus_points: 2,
    education: '',
    study_form: '',
    reception_form: '',
    speciality: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveChanges = () => {
    updateUser(profileData);
    alert('Данные успешно сохранены!');
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable); // Toggle visibility of the profile form
  };


  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle visibility of the recommendation form
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p>Вы не авторизованы. Пожалуйста, войдите.</p>
          <Link to="/login" className="mt-4 text-blue-500">Войти</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row bg-cover bg-center"
      style={{
        backgroundImage: "url('https://sun9-54.userapi.com/impf/wqkRXyU9ntJHyWoDl3YhZKx8Q0H9oscYe13odA/c5jpwGXROr4.jpg?size=1920x768&quality=95&crop=170,0,1750,699&sign=c4acd10a294944e2b0816fbfc4e8dfb8&type=cover_group')"
      }}
      
    >
      {/* Левый блок: Навигация */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 bg-white border-r shadow-md overflow-x-hidden z-50">
        <ul className="list-none mt-12">
          <li className="mb-4">
            <Link to="/recommendation-system" className="px-4 py-2 block text-lg hover:bg-gray-200">Рекомендательная система</Link>
          </li>
          <li className="mb-4">
            <Link to="/my-data" className="px-4 py-2 block text-lg hover:bg-gray-200">Мои данные</Link>
          </li>
          <li className="mb-4">
            <button onClick={() => logout()} className="px-4 py-2 block text-lg hover:bg-gray-200">Выход</button>
          </li>
        </ul>
      </div>
      {/* Left Block: User Profile */}
      <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg m-4">
        <div className="flex items-center mb-6">
          <FaUserCircle className="text-6xl text-gray-500 mr-4" />
          <h2 className="text-2xl font-bold">Профиль пользователя</h2>
        </div>
        <div className="space-y-4">
          <p>Имя: {profileData.name}</p>
          <button 
            onClick={toggleEditable} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {isEditable ? 'Скрыть' : 'Редактировать'}
          </button>

          {isEditable && (
            <>
              <p>Имя: <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Email: <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Возраст: <input type="number" name="age" value={profileData.age} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Пол: <input type="text" name="gender" value={profileData.gender} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Спорт: <input type="text" name="sport" value={profileData.sport} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Язык: <input type="text" name="foreign" value={profileData.foreign} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Средний балл аттестата: <input type="number" name="GPA" value={profileData.GPA} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Общее количество баллов: <input type="number" name="total_points" value={profileData.total_points} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Дополнительные баллы: <input type="number" name="bonus_points" value={profileData.bonus_points} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Экзамены: <input type="text" name="exams" value={profileData.exams} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Образование: <input type="text" name="education" value={profileData.education} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
              <p>Форма обучения: <input type="text" name="study_form" value={profileData.study_form} onChange={handleInputChange} className="border rounded p-2 w-full" /></p>
            </>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={saveChanges}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Сохранить изменения
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Right Block */}
      <div className="w-full md:w-2/3 flex flex-col gap-6 p-4">
        {/* Recommendation System */}
        <div>
          {isFormVisible ? (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Form />
            </div>
          ) : (
            <div
              onClick={toggleFormVisibility}
              className="bg-white p-8 rounded-lg shadow-lg cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-4">Рекомендательная система</h2>
              <p>Нажмите для ввода данных и получения рекомендаций.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
