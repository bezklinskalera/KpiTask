import React from "react";
import { Header } from "../components/Header/Header";
import "../styles/openTask.css";

export const OpenTaskTeacher = () => {
  return (
    <div className="task-container">
      <Header />
      <div className="content">
        <div className="course-title-container">
        <h1 className="course-title">ТВ-21. Асинхронне програмування</h1>
        </div>
        
        <div className="task-details">
          <div className="task-info">
            <h2>Завдання: Збір вимог до проєкту</h2>
            <p>
              Зібрати вимоги до програмного забезпечення по курсовій роботі.
              <br />
              Вимоги представити у вигляді матриці Requirements Traceability
              Matrix (перший стовпчик). Матрицю завантажити в класрум.
            </p>
            <p className="published-date">Опубліковано: 5.11.2024</p>
          </div>
          <div className="task-meta">
            <p>
              <strong>Дедлайн:</strong> 8.11.2024
            </p>
            <p>
              <strong>Автор:</strong> Безклинська Валерія
            </p>
            <p>
              <strong>Статус:</strong> здано
            </p>
            <p>
              <strong>Статус оцінки:</strong> не оцінено
            </p>
            <button className="grade-button">Оцінити</button>
          </div>
        </div>
      </div>
    </div>
  );
};
