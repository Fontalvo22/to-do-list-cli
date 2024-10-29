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

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

taskSchema.statics.createTask = async function (title, description, user_id) {
    try {
        const task = await Task.create({ title, description, user_id });

        return task;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

taskSchema.statics.editTask = async function (taskId, title, description, status) {
    try {
        const task = await Task.findOneAndUpdate({ _id: taskId }, { title, description, status }, { new: true });
        return task;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
