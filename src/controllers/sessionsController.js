const inquirer = require('inquirer');
const User = require('../models/User');
const { setTokenFile } = require('../utils/sessionTokenFileManager');

let spinner;
(async () => {
    spinner = await require('../utils/spinner');
})();

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

            const spinnerSecond = spinner.default('Loading unicorns').start();
            spinnerSecond.color = 'blue';
            spinnerSecond.text = 'verifying credentials \n';

            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('user registered successfully');

                    if (!result._id) {
                        spinnerSecond.fail('user not registered');
                        console.log('user not registered');
                        reject({ userData: result, success: result._id ? true : false });
                    }

                    spinnerSecond.succeed('user registered successfully');
                    resolve({ userData: result, success: result._id ? true : false });
                }, 1000); // 1 second delay
            });
        } catch (error) {
            // await connection.close();
            console.log(error);
            setTimeout(() => {
                console.log('user not registered successfully');
                resolve({ userData: result, success: result._id ? true : false });
            }, 1000);
        }
    },
};

module.exports = sessionsController;
