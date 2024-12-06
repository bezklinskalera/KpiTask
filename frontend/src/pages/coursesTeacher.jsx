import React from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { CourseBlock } from "../components/CoursePage/CourseBlock/CourseBlock";
import "../styles/CoursesTeacher.css";

export const CoursesTeacherPage = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/enter");
  };

  return (
    <>
      <Header 
      textButton = "Додати курс" 
      logoutText = "Вийти"
      secondAction={handleEnter} 
       />
      <div className="main_courses_teacher">
        <p className="welcome-text">Вітаємо, Валерія! Перегляньте створені курси.</p>

        <div className="central_courses_teacher">
          {/* Render multiple CourseBlock components */}
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseBlock key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
