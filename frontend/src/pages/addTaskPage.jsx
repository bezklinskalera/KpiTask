import React, { useState } from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import '../styles/addTask.css'
import { useSelector } from "react-redux";

export const AddTask = () => {
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const navigate = useNavigate();

  const handleAllCourseClick = () => {
    navigate("/coursesTeacher");
  };
  
  const handleEnter = () => {
    navigate("/enter");
  };

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обробка даних форми
    console.log("Новий завдання:", { taskTitle, taskDescription, dueDate });
    navigate("`/oneCourseTeacher/${course._id}`"); // Повернення до курсів
  };

  return (
    <div className="addTask-page">
      <Header
        textButton="Всі курси"
        logoutText="Вийти"
        firstAction={handleAllCourseClick}
        secondAction={handleEnter}
      />

      <div className="add-task-container">
        <h1 className="task-title">Завдання</h1>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Введіть заголовок завдання"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="task-input"
            required
          />
          <textarea
            placeholder="Додайте опис"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="task-textarea"
            required
          />
          <input
            type="date"
            placeholder="Введіть кінцевий термін"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-input"
            required
          />
          <div className="task-buttons">
            <button
              type="button"
              onClick={() => navigate("/oneCourseTeacher/:id")}
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
  );
};
