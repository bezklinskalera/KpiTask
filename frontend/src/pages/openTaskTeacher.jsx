import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import "../styles/openTask.css";
import { useSelector } from "react-redux";


export const OpenTaskTeacher = () => {
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const selectedTask = useSelector((state) => state.task.selectedTask);
  const currentUser = useSelector((state) => state.auth?.userInfo);
  const [teacherData, setTeacherData] = useState(null);


  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const accountId = currentUser?._id; // Отримуємо ID поточного користувача
        if (!accountId) return;

        const response = await fetch(`/api/users/getTeacher/${accountId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching teacher data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setTeacherData(data); // Зберігаємо отримані дані в стані
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacherData();
  }, [currentUser?._id]);

  return (
    <div className="task-container">
      <Header />
      <div className="content">
        <div className="course-title-container">
        <h1 className="course-title">{selectedCourse.course_name}</h1>
        </div>
        
        <div className="task-details">
          <div className="task-info">
            <h2>Завдання: {selectedTask.title}</h2>
            <p>
            {selectedTask.description}
            </p>
            <p className="published-date">Опубліковано: 5.11.2024</p>
          </div>
          <div className="task-meta">
            <p>
              <strong>Дедлайн:</strong> {selectedTask.deadline}
            </p>
            <p>
              <strong>Автор:</strong> {teacherData?.name}
            </p>
            <p>
              <strong>Статус:</strong> {selectedTask.submission_status === "not submitted" ? "Не здано" : "Здано"}
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
