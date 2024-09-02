const { Command } = require('commander');
const sessionsController = require('../controllers/sessionsController');
const program = new Command();
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

commands.forEach(cmd => {
    const command = new Command(cmd.name).description(cmd.description).action(cmd.action);
    program.addCommand(command);
});

program.parse(process.argv);

module.exports = program;
