import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useSelector } from "react-redux";
import { CourseBlockStudent } from "../components/CoursePage/CourseBlockStudent/CourseBlockStudent";
import "../styles/CoursesTeacher.css";

export const CourseStudent = () => {
  const currentUser = useSelector((state) => state.auth?.userInfo);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const accountId = currentUser?._id; // Отримуємо ID поточного користувача
        if (!accountId) return;

        const response = await fetch(`/api/users/getStudent/${accountId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching Student data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setStudentData(data); // Зберігаємо отримані дані в стані
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchStudentData();
  }, [currentUser?._id]);

  return (
    <>
      <Header />
      <div className="main_courses_teacher">
        <p className="welcome-text">
          Вітаємо, {studentData?.name}! Перегляньте доступні курси.
        </p>
        <hr />

        <div className="central_courses_teacher">
          {studentData?.courses?.length > 0 ? (
            studentData.courses.map((course) => (
              <CourseBlockStudent key={course._id} course={course} />
            ))
          ) : (
            <p>У вас ще немає створених курсів.</p>
          )}
        </div>
      </div>
    </>
  );
};
