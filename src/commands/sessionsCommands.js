const sessionsController = require('../controllers/sessionsController');
const logger = require('pino')();

const commands = [
    {
        name: 'login',
        description: 'Attempt to login',
        action: sessionsController.login,
    },
    {
        name: 'register',
        description: 'Register a new user',
        action: sessionsController.registerUser,
    },
];

module.exports = program => {
    commands.forEach(cmd => {
        program.command(cmd.name).description(cmd.description).action(cmd.action);
    });
};
