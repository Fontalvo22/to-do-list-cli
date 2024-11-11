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

    // I only put this here because I didn't want to create a new file just to display this information.
    {
        name: 'info',
        description: 'get info about the app and the creator',
        action: sessionsController.getAppInfo,
    },
];

module.exports = program => {
    commands.forEach(cmd => {
        program.command(cmd.name).description(cmd.description).action(cmd.action);
    });
};
