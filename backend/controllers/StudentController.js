import Student from '../../backend/models/student.model.js'
import Group from '../../backend/models/group.model.js';
import Course from '../../backend/models/course.model.js';

export const addStudent = async (req, res) => {
    try {
        const { idAccount, idGroup, idCourse, name } = req.body;

        // Перевірка, чи існує відповідний акаунт
        const accountExists = await Account.findById(idAccount);
        if (!accountExists) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Перевірка існування групи
        const groupExists = await Group.findById(idGroup);
        if (!groupExists) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Перевірка існування курсу
        const courseExists = await Course.findById(idCourse);
        if (!courseExists) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Створення нового студента
        const student = new Student({
            id_account: idAccount,
            id_group: idGroup,
            id_course: idCourse,
            name,
        });

        await student.save();

        res.status(201).json({
            message: 'Student added successfully',
            student,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to add student',
        });
    }
};