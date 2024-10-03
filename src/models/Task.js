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
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

taskSchema.statics.createTask = async function (title, description) {
    try {
        const task = await Task.create({ title, description });

        return task;
    } catch (error) {
        throw error;
    }
};
