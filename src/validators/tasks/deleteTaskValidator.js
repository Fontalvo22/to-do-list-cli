const Task = require('../../models/Task');

const createTaskValidator = async taskId => {
    const errors = {};

    const taskFound = await Task.findById(taskId);

    if (!taskFound) {
        errors.taskId = 'Task not found';
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error('Task not found');
        error.fieldsFailed = errors;

        throw error;
    } else {
        return undefined;
    }
};

module.exports = createTaskValidator;
