const logger = require('pino')();
const inquirer = require('inquirer');
const User = require('@models/User');
const { setTokenFile } = require('@utils/sessionTokenFileManager');
const sessionsController = {
    login: async () => {
        try {
            const userData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'username',
                    message: 'insert your name:',
                },
                {
                    type: 'password',
                    name: 'password',
                    message: 'insert your password:',
                },
            ]);

            const result = await User.login(userData.username, userData.password);

            if (result.logged) {
                setTokenFile(JSON.stringify({ token: result.token, refreshToken: result.refreshToken }));
            }

            return { success: result.logged, message: result.logged ? 'Login successful' : 'Login failed, check your data', token: result.token, refreshToken: result.refreshToken, user: result.user };
        } catch (error) {
            console.error('Error during login:', error);
        }
    },

    registerUser: async () => {
        try {
            const userData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'insert your name:',
                },
                {
                    type: 'input',
                    name: 'username',
                    message: 'insert your username:',
                },
                {
                    type: 'password',
                    name: 'password',
                    message: 'insert your password:',
                },
            ]);

            const result = await User.registerUser(userData.name, userData.username, userData.password);

            // await connection.close();
            if (result._id != undefined) {
                return { userData: result, success: true };
            } else {
                logger.info('User registration failed');
                return { userData: result, success: false };
            }
        } catch (error) {
            // await connection.close();
            return { userData: null, success: false, error: error.message };
        }
    },
};

module.exports = sessionsController;
