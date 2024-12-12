import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { CourseBlock } from "../components/CoursePage/CourseBlock/CourseBlock";
import "../styles/CoursesTeacher.css";
import { useSelector } from "react-redux";

export const CoursesTeacherPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth?.userInfo);
  const [teacherData, setTeacherData] = useState(null);

  const handleAddCourseClick = () => {
    setIsModalOpen(true); // Відкрити модальне вікно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрити модальне вікно
  };

  const handleSubmitCourse = (e) => {
    e.preventDefault();
    // Обробка даних форми
    console.log("Курс створено");
    setIsModalOpen(false); // Закрити модальне вікно після створення
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
        try {
            const accountId = currentUser?._id; // Отримуємо ID поточного користувача
            if (!accountId) return;

            const response = await fetch(`/api/users/getTeacher/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching teacher data: ${response.statusText}`);
            }

            const data = await response.json();
            setTeacherData(data); // Зберігаємо отримані дані в стані
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    fetchTeacherData();
}, [currentUser?._id]);

  return (
    <>
      <Header 
        textButton="Додати курс" 
        firstAction={handleAddCourseClick} 
      />
      <div className="main_courses_teacher">
        <p className="welcome-text">Вітаємо, {teacherData?.name}! Перегляньте створені курси.</p>

        <div className="central_courses_teacher">
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseBlock key={index} />
          ))}
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Створити курс</h2>
            <form onSubmit={handleSubmitCourse}>
              <input
                type="text"
                placeholder="Назва курсу"
                className="modal-input"
                required
              />
                <input
                  type="text"
                  placeholder="Додайте потрібні групи"
                  className="modal-input"
                  required
                />
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-button"
                >
                  Скасувати
                </button>
                <button type="submit" className="submit-button">
                  Створити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
