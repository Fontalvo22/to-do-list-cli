const Task = require('../../models/Task');
const mongoose = require('mongoose');

const updateTaskValidator = async taskId => {
    const errors = {};

    if (!mongoose.isValidObjectId(taskId)) {
        const error = new Error('Some fields are wrong');

        errors.taskId = 'Task not found';

        error.fieldsFailed = errors;

        throw error;
    }

    const foundTask = await Task.findById(taskId);

    if (!foundTask) {
        const error = new Error('Some fields are wrong');
        errors.taskId = 'Task not found';
        error.fieldsFailed = errors;
        throw error;
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error('Some fields are wrong');
        error.fieldsFailed = errors;

        console.error('Error during validation');

        throw error;
    } else {
        return undefined;
    }
};

module.exports = updateTaskValidator;
