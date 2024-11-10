const User = require('../../models/User');

const createTaskValidator = async data => {
    const errors = {};

    if (!data.taskTitle) {
        errors.taskTitle = 'Title is required';
    }

    if (!data.taskDescription) {
        errors.taskDescription = 'Description is required';
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error('Some fields are wrong');
        error.fieldsFailed = errors;

        console.error('Error during validation');
        console.table(error.fieldsFailed);

        throw error;
    } else {
        return undefined;
    }
};

module.exports = createTaskValidator;
