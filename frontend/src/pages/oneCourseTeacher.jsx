import React from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import '../styles/oneCourse.css'
import { useSelector } from "react-redux";


export const OneCourseTeacher = () => {
  const navigate = useNavigate();
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
 
  if (!selectedCourse) {
    return <p>Курс не знайдено</p>;
  }

  const handleAllCourseClick = () => {
    navigate("/coursesTeacher");
  };

  const handleEnter = () => {
    navigate("/enter");
  };

  const handleTaskClick = () => {
    navigate("/openTaskTeacher");
  };

  const handleAddTaskClick = () => {
    navigate("/addTask");
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
        <p>{selectedCourse.course_name}</p>
        <div className="course-actions">
          <button className="action-button">Видалити курс</button>
          <button className="action-button" onClick={handleAddTaskClick} >Додати завдання</button>
          <div className="course-code">Код курсу: HGUJB56</div>
        </div>

        {/* Список завдань */}
        <div className="tasks-list">
          {["5.11.2024", "5.11.2024", "5.11.2024"].map((date, index) => (
            <div className="task-item" key={index}>
              <span>Завдання: Збір вимог до проєкту</span>
              <span>Опубліковано: {date}</span>
              <button className="details-button" onClick={handleTaskClick} >Детальніше </button>
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