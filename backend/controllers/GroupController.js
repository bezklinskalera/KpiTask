import Group from '../../backend/models/group.model.js';

export const addGroup = async (req, res) => {
    try {
        const { group_name } = req.body; // Використовуємо "group_name" як у запиті

        // Перевірка, чи група з такою назвою вже існує
        const existingGroup = await Group.findOne({ group_name });
        if (existingGroup) {
            return res.status(400).json({
                message: 'Group with this name already exists',
            });
        }

        // Створення нової групи
        const group = new Group({
            group_name,
        });

        await group.save();

        res.status(201).json({
            message: 'Group added successfully',
            group,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to add group',
        });
    }
};

export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch groups' });
      }
};