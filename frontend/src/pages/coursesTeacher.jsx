import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { CourseBlock } from "../components/CoursePage/CourseBlock/CourseBlock";
import "../styles/CoursesTeacher.css";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedCourse } from '../slices/courseSlice';

export const CoursesTeacherPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth?.userInfo);
  const [teacherData, setTeacherData] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleDetailsClick = (course) => {
    dispatch(setSelectedCourse(course)); // Зберігаємо обраний курс в Redux
    navigate(`/oneCourseTeacher/${course._id}`); // Перехід до сторінки курсу
  };

  const handleAddCourseClick = () => {
    setIsModalOpen(true); // Відкрити модальне вікно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрити модальне вікно
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    // Отримання даних форми
    const courseName = e.target.elements.courseName.value;
    const groups = selectedGroups;

    const teacherId = currentUser._id; // Отримуємо ID поточного викладача

    try {
        const response = await fetch("/api/users/addCourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                course_name: courseName,
                groups,
                teacherId, // Додаємо teacherId
            }),
        });

        if (!response.ok) {
            throw new Error(`Error adding course: ${response.statusText}`);
        }

        const newCourse = await response.json();

        // Оновлення списку курсів викладача
        setTeacherData((prevData) => ({
            ...prevData,
            courses: [...(prevData.courses || []), newCourse.course],
        }));

        setIsModalOpen(false); // Закрити модальне вікно
    } catch (error) {
        console.error("Error adding course:", error);
    }
};


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

    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/users/getGroups");
        if (!response.ok) {
          throw new Error(`Error fetching groups: ${response.statusText}`);
        }
        const data = await response.json();
        setGroups(data); // Зберігаємо отримані групи в стані
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchTeacherData();
    fetchGroups();
  }, [currentUser?._id]);




  return (
    <>
      <Header textButton="Додати курс" firstAction={handleAddCourseClick} />
      <div className="main_courses_teacher">
        <p className="welcome-text">
          Вітаємо, {teacherData?.name}! Перегляньте створені курси.
        </p>
        <hr className="course-divider" />

        <div className="central_courses_teacher">
          {teacherData?.courses?.length > 0 ? (
            teacherData.courses.map((course) => (
              <CourseBlock key={course._id} course={course} />
            ))
          ) : (
            <p>У вас ще немає створених курсів.</p>
          )}
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
                name="courseName"
                className="modal-input"
                required
              />
              <FormControl fullWidth className="modal-input">
                <InputLabel id="demo-simple-select-label">Групи</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={selectedGroups}
                  onChange={(e) => setSelectedGroups(e.target.value)} 
                  label="Групи"
                  required
                >
                  {groups.map((group) => (
                    <MenuItem key={group._id} value={group._id}>
                      {group.group_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
