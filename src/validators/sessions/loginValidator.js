const User = require('../../models/User');
const { createPasswordHash, comparePassword } = require('../../utils/passwords');

const loginValidator = async data => {
    const errors = {};
    if (!data.username) {
        errors.username = 'Username is required';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    }

    const foundUser = await User.findOne({ username: data.username });
    if (!foundUser) {
        errors.login = 'Invalid username or password';
    }

    if (foundUser && foundUser.password) {
        const isValidPassword = await comparePassword(data.password, foundUser.password);
        if (!isValidPassword) {
            errors.login = 'Invalid username or password';
        }
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error('Some fields are wrong');
        error.fieldsFailed = errors;
        // console.error('some fields are wrong');
        console.table(error.fieldsFailed);
        throw error;
    } else {
        return undefined;
    }
};

module.exports = loginValidator;
