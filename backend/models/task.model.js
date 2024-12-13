import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    student_answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentAnswer', 
        default: null,
    },
    submission_status: {
        type: String,
        required: true, 
        enum: ['submitted', 'not submitted'],
        default: 'not submitted',
    },
    assessment_status: {
        type: String,
        required: true,
        default: 'not assessed',
    }
},
{
    timestamps: true,
}
);
const Task = mongoose.model('Task',taskSchema);

export default Task;