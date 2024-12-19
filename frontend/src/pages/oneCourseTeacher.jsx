import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "../styles/oneCourse.css";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTask } from "../slices/taskSlice";

export const OneCourseTeacher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const [tasks, setTasks] = useState([]); // Стан для завдань
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відкриття модального вікна
  const [isDeleting, setIsDeleting] = useState(false); // Стан для процесу видалення

  useEffect(() => {
    if (selectedCourse) {
      // Запит для отримання завдань
      fetch(`/api/users/getTasks/${selectedCourse._id}`)
        .then((response) => response.json())
        .then((data) => setTasks(data.tasks))
        .catch((error) => console.error("Error fetching tasks:", error));
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

  const handleAddTaskClick = () => {
    navigate("/addTask");
  };

  const handleTaskClick = (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      dispatch(setSelectedTask(task)); // Викликаємо екшн для збереження завдання в Redux
      navigate("/openTaskTeacher"); // Перехід на сторінку з відкриттям завдання
    }
  };

  const openDeleteModal = () => {
    setIsModalOpen(true); // Відкриття модального вікна
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Закриття модального вікна
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/deleteCourse/${selectedCourse._id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Після успішного видалення, перенаправляємо на сторінку списку курсів
        navigate("/coursesTeacher");
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course");
    }
    setIsDeleting(false);
    closeDeleteModal();
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
        <p className="course-title-one">{selectedCourse.course_name}</p>
        <div className="course-actions">
          <button className="action-button" onClick={openDeleteModal}>
            Видалити курс
          </button>
          <button className="action-button" onClick={handleAddTaskClick} >Додати завдання</button>
          {/* <div className="course-code">Код курсу: HGUJB56</div>*/}
          
        </div>

        {/* Список завдань */}
        <div className="tasks-list">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className="task-item" key={task._id}>
                <p>Завдання: {task.title}</p>
                <p className="published-info">Опубліковано: {new Date(task.createdAt).toLocaleDateString("uk-UA")}</p>
                <button
                  className="details-button"
                  onClick={() => handleTaskClick(task._id)}
                >
                  Детальніше
                </button>
              </div>
            ))
          ) : (
            <p>Завдання не знайдено</p>
          )}
        </div>
      </main>

      {/* Модальне вікно для підтвердження видалення */}
      {isModalOpen && (
        <div className="modal_delete">
          <div className="modal-content_delete">
            <h2>Ви впевнені, що хочете видалити курс?</h2>
            <div className="modal-actions_delete">
              <button onClick={closeDeleteModal}>Скасувати</button>
              <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Видалення..." : "Так, видалити"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
