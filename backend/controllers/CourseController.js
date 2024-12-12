import Course from '../../backend/models/course.model.js';
import Group from '../../backend/models/group.model.js';

export const addCourse = async (req, res) => {
    try {
        const { course_name, groups, tasks } = req.body; // `groups` — масив ID груп, `tasks` — необов’язковий масив ID завдань

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
