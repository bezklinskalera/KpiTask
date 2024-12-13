import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import '../styles/oneCourse.css'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../slices/taskSlice';


export const OneCourseTeacher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const [tasks, setTasks] = useState([]); // Стан для завдань
  const [students, setStudents] = useState([]); // Стан для студентів

  useEffect(() => {
    if (selectedCourse) {
      // Запит для отримання завдань
      fetch(`/api/users/getTasks/${selectedCourse._id}`)
        .then((response) => response.json())
        .then((data) => setTasks(data.tasks))
        .catch((error) => console.error("Error fetching tasks:", error));

      // Запит для отримання студентів
      /*fetch(`/api/courses/${selectedCourse._id}/students`)
        .then((response) => response.json())
        .then((data) => setStudents(data.students))
        .catch((error) => console.error("Error fetching students:", error));*/
    }
  }, [selectedCourse]);

 
  if (!selectedCourse) {
    return <p>Курс не знайдено</p>;
  }

  const handleAllCourseClick = () => {
    navigate("/coursesTeacher");
  };

  const handleEnter = () => {
    navigate("/enter");
  };

  const handleTaskClick = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      dispatch(setSelectedTask(task)); // Викликаємо екшн для збереження завдання в Redux
      navigate("/openTaskTeacher"); // Перехід на сторінку з відкриттям завдання
    }
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
        <p className="course-title-one ">{selectedCourse.course_name}</p>
        <div className="course-actions">
          <button className="action-button">Видалити курс</button>
          <button className="action-button" onClick={handleAddTaskClick} >Додати завдання</button>
          <div className="course-code">Код курсу: HGUJB56</div>
        </div>

        {/* Список завдань */}
        <div className="tasks-list">
        {tasks.length > 0 ? tasks.map((task) => (
            <div className="task-item" key={task._id}>
              <p>Завдання: {task.title}</p>
              <p class="published-info">Опубліковано: {task.deadline}</p>
              <button className="details-button" onClick={() => handleTaskClick(task._id)}>Детальніше</button>
            </div>
          )) : (
            <p>Завдання не знайдено</p>
          )}
        </div>

        {/* Список студентів <aside className="student-list">
          <h2>Список студентів:</h2>
          {Array(5)
            .fill("Безклинська Валерія")
            .map((student, index) => (
              <div className="student-name" key={index}>
                {student}
              </div>
            ))}
          <button className="scroll-button">Переглянути</button>
        </aside>*/}
        
      </main>
  </div>);
};