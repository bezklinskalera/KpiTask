import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course', // Це зв'язок з курсами
        }
    ]
},
{
    timestamps: true,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
