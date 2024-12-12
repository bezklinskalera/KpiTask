import React, { useState, useEffect } from "react";
import "./CourseBlock.css";
import { useSelector } from "react-redux";

export const CourseBlock = ({ course }) => {
  return (
    <div className="course-block">
      <div className="course-block-header">
        <p>{course?.course_name}</p>
      </div>
      <div className="course-block-footer">
        <button className="icon-button edit-button">✏️</button>
        <button className="icon-button delete-button">🗑️</button>
        <span className="details-text">Детальніше</span>
      </div>
    </div>
  );
};
