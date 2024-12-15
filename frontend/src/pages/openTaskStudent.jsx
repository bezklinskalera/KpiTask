import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import "../styles/openTask.css";
import { useSelector } from "react-redux";

export const OpenTaskStudent = () => {
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const selectedTask = useSelector((state) => state.task.selectedTask);
  const currentUser = useSelector((state) => state.auth?.userInfo);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskStatus, setTaskStatus] = useState(null); // Зберігаємо стан статусу відповіді

  // Перевіряємо статус відповіді з бази даних при завантаженні компонента
  useEffect(() => {
    const checkAnswerStatus = async () => {
      try {
        const taskId = selectedTask._id;
        const idAccount = currentUser?._id;

        if (!taskId || !idAccount) return;

        const response = await fetch(
          `/api/users/checkAnswer?taskId=${taskId}&idAccount=${idAccount}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTaskStatus(data.status); // Зберігаємо статус з БД ("done" або "not_done")
      } catch (error) {
        console.error("Error checking answer status:", error);
      }
    };

    checkAnswerStatus();
  }, [selectedTask, currentUser]);

  // Відмічаємо завдання як виконане
  const handleMarkAsDone = async () => {
    setIsSubmitting(true);

    try {
      const taskId = selectedTask._id;
      const idAccount = currentUser?._id;

      if (!taskId || !idAccount) return;

      const response = await fetch("/api/users/addAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, idAccount }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      // Оновити статус після успішного виконання запиту
      setTaskStatus("done");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting answer:", error);
      setIsSubmitting(false);
    }
  };

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
            <p>{selectedTask.description}</p>
            <p className="published-date">Опубліковано: 5.11.2024</p>
          </div>
          <div className="task-meta">
            <p>
              <strong>Дедлайн:</strong> {selectedTask.deadline}
            </p>

            <p>
              <strong>Статус:</strong>{" "}
              {taskStatus === "done" ? "Вже виконано" : "Не виконано"}
            </p>
            <p>
              <strong>Максимальний бал:</strong> {selectedTask.max_grade}
            </p>
            <button
              className="grade-button"
              onClick={handleMarkAsDone}
              disabled={isSubmitting || taskStatus === "done"} // Заборона, якщо статус "done"
            >
              {taskStatus === "done"
                ? "Вже надіслано" // Текст кнопки при статусі "done"
                : isSubmitting
                ? "Надіслано"
                : "Позначити як виконане"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
