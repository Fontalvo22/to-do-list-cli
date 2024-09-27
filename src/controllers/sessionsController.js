const logger = require('pino')();
const inquirer = require('inquirer');
const databaseConnection = require('../config/db');
const { connection } = require('../config/db');
const User = require('../models/User');
console.log('another example');

const sessionsController = {
    login: async () => {
        try {
            logger.error('login executing');
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
            return userData;
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
            await connection.close();

            if (result._id) {
                logger.info('User registered successfully');
                return { userData: result, success: true };
            } else {
                logger.info('User registration failed');
                return { userData: result, success: false };
            }
        } catch (error) {
            await connection.close();
            return { userData: null, success: false, error: error.message };
        }
    },
};

module.exports = sessionsController;
