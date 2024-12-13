import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import {
  AccountController,
  GroupController,
  CourseController,
  TeacherController,
  TaskController,
  StudentController, 
} from "./controllers/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/users/auth", AccountController.login);
app.post("/api/users/register", AccountController.register);
app.post("/api/users/logout", AccountController.logout);

app.post("/api/users/addGroup", GroupController.addGroup);
app.get("/api/users/getGroups", GroupController.getGroups);

app.post("/api/users/addCourse", CourseController.addCourse);
app.get("/api/users/courses/:accountId/:courseName", CourseController.getCoursesByAccountIdAndName);

app.post("/api/users/addTeacher", TeacherController.addTeacher);
app.get("/api/users/getTeacher/:id", TeacherController.getTeacherById)

app.post("/api/users/addStudent", StudentController.addStudent);
app.get("/api/users/getStudent/:id", StudentController.getStudentByAccountId)

app.post("/api/users/addTask/:courseId", TaskController.addTask);
app.get("/api/users/getTasks/:courseId", TaskController.getTasksByCourse )

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(8086, () => {
  connectDB();
  console.log("Server started");
});
