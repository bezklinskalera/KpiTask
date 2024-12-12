import Course from '../../backend/models/course.model.js';
import Group from '../../backend/models/group.model.js';
import Teacher from '../../backend/models/teacher.model.js';
import Student from '../../backend/models/student.model.js';

export const addCourse = async (req, res) => {
  try {
      const { course_name, groups, tasks, teacherId } = req.body; // Додали teacherId

      // Перевірка, чи всі групи існують
      const existingGroups = await Group.find({ _id: { $in: groups } });
      if (existingGroups.length !== groups.length) {
          return res.status(404).json({
              message: 'One or more groups not found',
          });
      }

      // Створення нового курсу
      const course = new Course({
          course_name,
          groups, // Масив ID груп
          tasks: tasks || [], // Масив ID завдань, якщо вказано
      });

      await course.save();

      // Оновлення списку курсів викладача
      const teacher = await Teacher.findOne({account: teacherId});
      if (!teacher) {
          return res.status(404).json({
              message: 'Teacher not found',
          });
      }

      // Додаємо новий курс до викладача
      teacher.courses.push(course._id); // Додаємо ID нового курсу до списку курсів викладача
      await teacher.save(); // Зберігаємо викладача з оновленим списком курсів

      res.status(201).json({
          message: 'Course added successfully',
          course,
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: 'Failed to add course',
      });
  }
};


export const getCoursesByAccountIdAndName = async (req, res) => {
  try {
    const { accountId, courseName } = req.params;

    let account = await Teacher.findOne({ account: accountId }).populate('courses');
    if (!account) {
      // Якщо не знайдено серед викладачів, шукаємо серед студентів
      account = await Student.findOne({ account: accountId }).populate('courses');
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
    }

    // Знайти курс серед курсів
    const selectedCourse = account.courses.find(
      (course) => course.course_name === courseName
    );

    if (!selectedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(selectedCourse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

