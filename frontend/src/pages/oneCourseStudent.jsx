import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import '../styles/oneCourse.css'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../slices/taskSlice';

export const OneCourseStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]); // Стан для завдань
  const selectedCourse = useSelector((state) => state.course.selectedCourse);

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
      navigate("/openTaskStudent"); // Перехід на сторінку з відкриттям завдання
    }
  };

  return(
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

        {/* Список завдань */}
        <div className="tasks-list">
        {tasks.length > 0 ? tasks.map((task) => (
            <div className="task-item" key={task._id}>
              <span>Завдання: {task.title}</span>
              <span>Опубліковано: {task.deadline}</span>
              <button className="details-button" onClick={() => handleTaskClick(task._id)}>Детальніше</button>
            </div>
          )) : (
            <p>Завдання не знайдено</p>
          )}
        </div>

        {/* Список студентів<aside className="student-list">
          <h2>Список студентів:</h2>
          {Array(5)
            .fill("Безклинська Валерія")
            .map((student, index) => (
              <div className="student-name" key={index}>
                {student}
              </div>
            ))}
          <button className="scroll-button">Переглянути</button>
        </aside> */}
        
      </main>
  </div>);
};
