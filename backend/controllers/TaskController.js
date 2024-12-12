import Task from '../../backend/models/task.model.js';


export const addTask = async (req, res) => {
    try{

    }catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to add task',
        });
}};