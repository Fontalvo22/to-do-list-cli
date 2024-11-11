const logger = require('pino')();
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        default: 'For start',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    deadLine: {
        type: Date,
        required: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

taskSchema.pre('save', function (next) {
    setTimeout(next, 1000); // 1000 ms de retraso
});

taskSchema.pre('find', function (next) {
    setTimeout(next, 1000); // 1000 ms de retraso
});

taskSchema.pre('updateOne', function (next) {
    setTimeout(next, 1000); // 1000 ms de retraso
});

taskSchema.pre('findOneAndUpdate', function (next) {
    setTimeout(next, 1000); // 1000 ms de retraso
});

taskSchema.statics.createTask = async function (title, description, user_id, deadLine) {
    try {
        const task = await Task.create({ title, description, user_id, deadLine });

        return task;
    } catch (error) {
        throw error;
    }
};

taskSchema.statics.editTask = async function (taskId, title, description) {
    try {
        const task = await Task.findOneAndUpdate({ _id: taskId }, { title, description }, { new: true });
        return task;
    } catch (error) {
        throw error;
    }
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
