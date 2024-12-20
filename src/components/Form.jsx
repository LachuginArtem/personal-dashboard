import React, { useState } from 'react';
import styles from './Form.module.css';
 

const Form = () => {
  const [formData, setFormData] = useState({
    top_n: '',
    user: {
      gender: '',
      age: '',
      sport: '',
      foreign: '',
      gpa: '',
      total_points: '',
      bonus_points: '',
      exams: [],
      education: '',
      study_form: ''
    }
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]); // Состояние для направлений
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна

  const handleChange = (e) => {
    if (e.target.name === 'exams') {
      let newExams = [...formData.user.exams];
      newExams.push(e.target.value);
      setFormData({ ...formData, user: { ...formData.user, exams: newExams } });
    } else {
      setFormData({ ...formData, user: { ...formData.user, [e.target.name]: e.target.value } });
    }
  };

  const egeExams = [
    'Русский язык',
    'Математика',
    'Физика',
    'Химия',
    'Биология',
    'Информатика',
    'История',
    'Обществознание',
    'Литература',
    'География',
    'Иностранный язык',
  ];

  const handleExamClick = (exam) => {
    setFormData((prevFormData) => {
      const updatedExams = prevFormData.user.exams.includes(exam)
        ? prevFormData.user.exams.filter((item) => item !== exam) // Убираем экзамен
        : [...prevFormData.user.exams, exam]; // Добавляем экзамен
      return {
        ...prevFormData,
        user: {
          ...prevFormData.user,
          exams: updatedExams,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Отправляемые данные:', JSON.stringify(formData, null, 2));


    try {
      const response = await fetch(
        'https://tyuiu-fastapi-rec-sys.onrender.com/rec_sys/recommend/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
            
          },
          body: JSON.stringify(formData, null, 2),
         
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 'ok') {
        setResponseMessage('Данные успешно отправлены!');
        setRecommendations(data.data); // Сохраняем направления в состоянии
        setIsModalOpen(true); // Открываем модальное окно
      } else {
        setResponseMessage('Ошибка при обработке данных.');
      }
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
      setResponseMessage('Произошла ошибка при отправке данных.');
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Количество направлений:
          <input type="number" value={formData.top_n} onChange={(e) => setFormData({ ...formData, top_n: e.target.value })} required />
        </label>

        <fieldset className={styles.fieldset}>
          <label className={styles.label}>
            <select value={formData.user.gender} name="gender" onChange={handleChange} required>
              <option value="">Выберите пол</option>
              <option value="М">Мужской</option>
              <option value="Ж">Женский</option>
            </select>
          </label>

          <label className={styles.label}>
            Возраст:
            <input type="number" value={formData.user.age} name="age" onChange={handleChange} required />
          </label>

          <label className={styles.label}>
            Вид спорта:
            <input type="text" value={formData.user.sport} name="sport" onChange={handleChange} required />
          </label>

          <label className={styles.label}>
            Средний балл (GPA):
            <input type="number" step="0.01" value={formData.user.gpa} name="gpa" onChange={handleChange} required />
          </label>

          <label className={styles.label}>
            Общее количество баллов:
            <input type="number" value={formData.user.total_points} name="total_points" onChange={handleChange} required />
          </label>

          <label className={styles.label}>
            Дополнительные баллы:
            <input type="number" value={formData.user.bonus_points} name="bonus_points" onChange={handleChange} required />
          </label>

          <label className={styles.label}>
            Выберите экзамены:
            <div className={styles.examsContainer}>
              {egeExams.map((exam) => (
                <div
                  key={exam}
                  className={`${styles.examCard} ${
                    formData.user.exams.includes(exam) ? styles.selectedExam : ''
                  }`}
                  onClick={() => handleExamClick(exam)}
                >
                  {exam}
                </div>
              ))}
            </div>
          </label>
         

          <label className={styles.label}>
  Вид образования:
  <select name="education" value={formData.education} onChange={handleChange} required >
    <option value="">Выберите вид образования</option>
    <option value="Начальное общее образование">Начальное общее образование</option>
    <option value="Среднее общее образование">Среднее общее образование</option>
    <option value="Высшее общее образование">Высшее общее образование</option>
  </select>
</label>

          <label className={styles.label}>
  Форма обучения:
  <select name="study_form" value={formData.user.study_form} onChange={handleChange} required >
    <option value="">Выберите форму обучения</option>
    <option value="Очная">Очная</option>
    <option value="Заочная">Заочная</option>
    <option value="Очно-заочная">Очно-заочная</option>
  </select>
</label>
        </fieldset>

        <button type="submit" className={styles.button}>Рассчитать</button>
      </form>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h3>Результаты</h3>
            
            <div className={styles.recommendationsContainer}>
              <ul className={styles.recommendations}>
                {recommendations.map((item, index) => (
                  <li key={index}>{item.replace('Направление подготовки_', '')}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Form;