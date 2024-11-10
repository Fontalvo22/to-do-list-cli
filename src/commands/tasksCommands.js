const TasksController = require('../controllers/tasksController');
const logger = require('pino')();

const commands = [
    {
        name: 'create',
        description: 'Create a task',
        action: TasksController.createTask,
    },
    {
        name: 'list',
        description: 'Get all tasks',
        action: TasksController.getAllUserTasks,
    },
    {
        name: 'filterby',
        description: 'Filter tasks by field',
        arguments: '<field> <value>',
        action: TasksController.filterTasksByField,
        helpCommand: '$ filterby title "task title"\n$ filterby status "status"',
    },
    {
        name: 'edit',
        description: 'Edit especific task',
        arguments: '<taskId>',
        action: TasksController.editTask,
        helpCommand: '$ edit "672d10cdd870f337c5a622b4"',
    },

    {
        name: 'delete',
        description: 'Delete especific task',
        arguments: '<taskId>',
        action: TasksController.deleteTask,
        helpCommand: '$ delete "672d10cdd870f337c5a622b4"',
    },
    {
        name: 'status',
        description: 'Change task status',
        arguments: '<taskId>',
        action: TasksController.updateTaskStatus,
        helpCommand: '$ status "672d10cdd870f337c5a622b4"',
    },
];

module.exports = program => {
    commands.forEach(cmd => {
        const command = program.command(cmd.name).description(cmd.description);
        if (cmd.arguments) {
            command.arguments(cmd.arguments);
        }
        if (cmd.helpCommand) {
            command.addHelpText('after', `\nExamples:\n${cmd.helpCommand}`);
        }
        command.action(cmd.action);
    });
};
