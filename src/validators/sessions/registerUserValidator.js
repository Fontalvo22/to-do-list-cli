const User = require('../../models/User');

const registerUserValidator = async data => {
    const errors = {};
    if (!data.name) {
        errors.name = 'Name is required';
    }
    if (!data.username) {
        errors.username = 'Username is required';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    }

    const userFound = await User.findOne({ username: data.username });

    if (userFound) {
        errors.username = 'Username already exists, chose another one';
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

module.exports = registerUserValidator;
