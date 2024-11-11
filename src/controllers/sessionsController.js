const inquirer = require('inquirer');
const User = require('../models/User');
const { setTokenFile } = require('../utils/sessionTokenFileManager');
const { loginValidator, registerUserValidator } = require('../validators/sessions');
const cfonts = require('cfonts');
const getChalk = require('../utils/chalkImporter');
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
            console.table([userData]);
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
        const ora = await getSpinner();
        const spinner = ora('loging user');
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
            spinner.start();

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

    getAppInfo: async () => {
        const chalk = await getChalk();

        cfonts.say('To do CLI app', {
            font: 'tiny',
            align: 'left',
            colors: ['#084298'],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 1,
            space: false,
        });

        cfonts.say('by:|Franklin Fontalvo', {
            font: 'simple',
            align: 'left',
            colors: ['#ff6b6b'],
            background: 'transparent',
            letterSpacing: 0.1,
            lineHeight: 1,
            space: false, // define if the output text should have empty lines on top and on the bottom
            maxLength: '0',
        });

        console.log(chalk.blue('hello, im Franklin Fontalvo, backend developer and devops engineer'));

        console.log(chalk.blue('This app is a command line tool for quick management of personal to-do tasks.'));
        console.log(chalk.yellow('\nmy github: ' + chalk.blue('https://github.com/Fontalvo22/')));
        console.log(chalk.yellow('my personal website: ' + chalk.blue('https://fontalvo22.github.io/fontalvo/')));
        console.log(chalk.yellow('my linkedin: ' + chalk.blue('https://www.linkedin.com/in/franklin-fontalvo/')));

        console.log(chalk.yellow('contact me: ' + chalk.blue('franklin.fontalvo.76@gmail.com')));

        console.log(chalk.yellow('\nyou can find the source code of this project in: '), chalk.blue('https://github.com/Fontalvo22/to-do-list-cli'));

        console.log(chalk.green('\napp version: ' + chalk.blue('1.0') + '\nenvironment: ' + chalk.blue('nodejs') + '\ndependencies: ' + chalk.blue('docker')));
        console.log(chalk.yellow('\nDocker automatically installs: nodeJS, MongoDB and mongo-express '));
    },
};

module.exports = sessionsController;
