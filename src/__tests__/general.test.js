// /c:/Users/Franklin/Documents/personal/to-do-cli/src/controllers/sessionsController.test.js
const sessionsController = require('../controllers/sessionsController');
const logger = require('pino')();
const { connectDatabase } = require('../config/db');
const mongoose = require('mongoose');

jest.mock('inquirer');

describe('General dependencies for the app', () => {
    describe('database connection', () => {
        it('should verify that the database connection is successful', async () => {
            await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);

            expect(mongoose.connection.readyState).toBe(1);

            await mongoose.connection.close();
        });
    });
});
