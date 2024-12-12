import React from "react";
import "./CourseBlock.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCourse } from "../../../slices/courseSlice";

export const CourseBlock = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    dispatch(setSelectedCourse(course)); // Зберігаємо обраний курс у Redux
    navigate(`/oneCourseTeacher/${course._id}`); // Переходимо до сторінки курсу
  };

  return (
    <div className="course-block">
      <div className="course-block-header">
        <p>{course?.course_name}</p>
      </div>
      <div className="course-block-footer">
        <button className="icon-button edit-button">✏️</button>
        <button className="icon-button delete-button">🗑️</button>
        <span
          className="details-text"
          onClick={handleDetailsClick} // Додаємо обробник натискання
        >
          Детальніше
        </span>
      </div>
    </div>
  );
};
