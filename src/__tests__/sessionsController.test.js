// /c:/Users/Franklin/Documents/personal/to-do-cli/src/controllers/sessionsController.test.js
const sessionsController = require('@controllers/sessionsController');
const logger = require('pino')();

const { connectDatabase, connection } = require('../config/db');
const User = require('@models/User');
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('sessionsController', () => {
    beforeAll(async () => {
        await connectDatabase();
        jest.spyOn(console, 'table').mockImplementation(() => {});

        await User.deleteMany({});
    });

    afterAll(async () => {
        // await User.deleteMany({});
        await connection.close();
    });

    const testUser = {
        name: 'Test User',
        username: 'testuser',
        password: 'testpass',
    };

    describe('register user', () => {
        it.only('user should be registered successfully', async () => {
            // Mock inquirer.prompt to return testUser
            inquirer.default.prompt.mockResolvedValue(testUser);

            const result = await sessionsController.registerUser();
            expect(result.success).toBe(true);
        });

        it("user shouldn't be registered successfully, duplicated user", async () => {
            // Mock inquirer.prompt to return testUser
            inquirer.default.prompt.mockResolvedValue(testUser);

            const result = await sessionsController.registerUser();

            expect(result.success).toBe(false);
        });
    });

    describe('login', () => {
        it('user should login successfully', async () => {
            inquirer.default.prompt.mockResolvedValue(testUser);
            const result = await sessionsController.login();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Login successful');
        });

        it("user shouldn't login successfully, wrong password", async () => {
            inquirer.default.prompt.mockResolvedValue({ ...testUser, password: 'wrongpass' });
            const result = await sessionsController.login();
            expect(result.success).toBe(false);
            expect(result.message).toBe('Login failed, check your data');
        });
    });
});
