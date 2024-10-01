// /c:/Users/Franklin/Documents/personal/to-do-cli/src/controllers/sessionsController.test.js
const sessionsController = require('../controllers/sessionsController');
const logger = require('pino')();
const databaseConnection = require('../config/db');
const mongoose = require('mongoose');

jest.mock('inquirer');

describe('sessionsController', () => {
    describe('database connection', () => {
        it('should verify that the database connection is successful', async () => {
            // Configurar la URL de la base de datos real
            const dbUrl = 'mongodb://root:example@mongo:27017/tasks?authSource=admin'; // Cambia esto a tu URL de base de datos real

            await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

            expect(mongoose.connection.readyState).toBe(1);

            await mongoose.connection.close();
        });
    });
});
