import React from "react";
import "./CourseBlockStudent.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCourse } from "../../../slices/courseSlice";

export const CourseBlockStudent = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    dispatch(setSelectedCourse(course)); // Зберігаємо обраний курс у Redux
    navigate(`/oneCourseStudent/${course._id}`); // Переходимо до сторінки курсу
  };

  return (
    <div className="course-block">
      <div className="course-block-header">
        <p>{course?.course_name}</p>
      </div>
      <div className="course-block-footer">
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
