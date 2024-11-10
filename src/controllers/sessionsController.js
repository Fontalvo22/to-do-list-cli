const inquirer = require('inquirer');
const User = require('../models/User');
const { setTokenFile } = require('../utils/sessionTokenFileManager');
const { loginValidator, registerUserValidator } = require('../validators/sessions');
const getSpinner = require('../utils/spinnerImporter');

const sessionsController = {
    login: async () => {
        try {
            const ora = await getSpinner();
            const spinner = ora('loging user');

            const userData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'username',
                    message: 'insert your username: ',
                },
                {
                    type: 'password',
                    name: 'password',
                    message: 'insert your password: ',
                },
            ]);
            console.clear();
            spinner.start();

            // validator
            await loginValidator(userData);

            const result = await User.login(userData.username, userData.password);

            if (result.logged) {
                setTokenFile(JSON.stringify({ token: result.token, refreshToken: result.refreshToken }));
                spinner.succeed('user loged successfully');
            } else {
                spinner.fail('user not loged successfully');
            }

            return { success: result.logged, message: result.logged ? 'Login successful' : 'Login failed, check your data', token: result.token, refreshToken: result.refreshToken, user: result.user };
        } catch (error) {
            // spinner.fail('user not loged successfully');
            // console.error(error);
            return { success: false, message: error.message, token: null, refreshToken: null, user: null };
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
            console.clear();

            const spinner = spinnerImported.default('Registering user \n').start();
            spinner.color = 'blue';
            await registerUserValidator(userData);
            const result = await User.registerUser(userData.name, userData.username, userData.password);

            spinner.succeed('user registered successfully');
            return { userData: result, success: result._id ? true : false };
        } catch (error) {
            // await connection.close();
            console.log('user not registered successfully');
            console.log(error);
            return { userData: null, success: false, message: error.message };
        }
    },
};

module.exports = sessionsController;
