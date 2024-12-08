import React from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import '../styles/oneCourse.css'

export const OneCourseTeacher = () => {
  const navigate = useNavigate();

  const handleAllCourseClick = () => {
    navigate("/coursesTeacher");
  };

  const handleEnter = () => {
    navigate("/enter");
  };

  return (
    <div className="course-page">
   <Header 
        textButton="Всі курси" 
        logoutText="Вийти" 
        firstAction={handleAllCourseClick} 
        secondAction={handleEnter} 
      />
     {/* Основний блок */}
     <main className="course-content">
        <h1 className="course-title">ТВ-21. Асинхронне програмування</h1>
        <div className="course-actions">
          <button className="action-button">Видалити курс</button>
          <button className="action-button">Додати завдання</button>
          <div className="course-code">Код курсу: HGUJB56</div>
        </div>

        {/* Список завдань */}
        <div className="tasks-list">
          {["5.11.2024", "5.11.2024", "5.11.2024"].map((date, index) => (
            <div className="task-item" key={index}>
              <span>Завдання: Збір вимог до проєкту</span>
              <span>Опубліковано: {date}</span>
              <button className="details-button">Детальніше</button>
            </div>
          ))}
        </div>

        {/* Список студентів */}
        <aside className="student-list">
          <h2>Список студентів:</h2>
          {Array(5)
            .fill("Безклинська Валерія")
            .map((student, index) => (
              <div className="student-name" key={index}>
                {student}
              </div>
            ))}
          <button className="scroll-button">Переглянути</button>
        </aside>
      </main>
  </div>);
};