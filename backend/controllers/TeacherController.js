import Teacher from '../../backend/models/teacher.model.js';
import Account from '../../backend/models/account.model.js';

export const addTeacher = async (req, res) => {
    try {
        const { accountId, name, courses } = req.body;

        // Перевірка, чи існує акаунт з заданим ID
        const existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            return res.status(404).json({
                message: 'Account not found',
            });
        }

        // Створення нового викладача
        const teacher = new Teacher({
            account: accountId,
            name,
            courses, // Масив ID курсів
        });

        // Збереження викладача в базі даних
        await teacher.save();

        res.status(201).json({
            message: 'Teacher added successfully',
            teacher,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to add teacher',
        });
    }
};
