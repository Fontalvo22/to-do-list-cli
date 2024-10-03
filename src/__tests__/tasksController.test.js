const logger = require('pino')();

const { connectDatabase, connection } = require('../config/db');
const User = require('@models/User');
const inquirer = require('inquirer');
const sessionsController = require('@controllers/sessionsController');
const tasksController = require('@controllers/tasksController');

jest.mock('inquirer');
describe('tasksController', () => {
    beforeAll(async () => {
        await connectDatabase();
        const testUser = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpass',
        };

        inquirer.default.prompt.mockResolvedValue(testUser);
        await sessionsController.login();
    });
});
