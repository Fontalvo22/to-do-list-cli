// /c:/Users/Franklin/Documents/personal/to-do-cli/src/controllers/sessionsController.test.js
const sessionsController = require('../controllers/sessionsController');
const logger = require('pino')();
const databaseConnection = require('../config/db');
const { seeder, collections } = require('../config/seeders');
const inquirer = require('inquirer');
const mongoose = require('mongoose');

jest.mock('inquirer');

describe('sessionsController', () => {
    describe('register', () => {
        const testUser = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpass',
        };
        it('user should be registered successfully', async () => {
            // Mockear inquirer.prompt para devolver testUser
            inquirer.default.prompt.mockResolvedValue(testUser);
            // Ejecutar el método registerUser
            const result = await sessionsController.registerUser();
            // Verificar que el resultado es el esperado
            expect(result.success).toBe(true);
        });
    });
    // describe('login', () => {
    //     beforeAll(async () => {
    //         // await databaseConnection();
    //         await seeder.import(collections);
    //     });
    //     it('should log user data on successful login', async () => {
    //         const cliPath = path.join(__dirname, '../../index.js');
    //         const cliProcess = spawn('node', [cliPath, 'login']);
    //         cliProcess.stdin.write('example name\n');
    //         cliProcess.stdin.write('testpass\n');
    //         cliProcess.stdin.end();
    //         let output = '';
    //         cliProcess.stdout.on('data', data => {
    //             // logger.info(`stdout: ${data}`);
    //             output += data.toString();
    //         });
    //     });
    // });
});
