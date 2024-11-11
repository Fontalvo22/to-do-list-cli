const logger = require('pino')();
const inquirer = require('inquirer');
const { getDecodedToken } = require('../utils/sessionTokenFileManager');
const Task = require('../models/Task');
const isUserLoggedMiddleware = require('../middlewares/isUserLogged.middleware');
const { createTaskValidator, deleteTaskValidator, updateTaskValidator } = require('../validators/tasks');
const getSpinner = require('../utils/spinnerImporter');
const tasksController = {
    // done
    createTask: async () => {
        await isUserLoggedMiddleware();

        const ora = await getSpinner();
        const spinner = ora('Creating task');

        inquirer.default.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

        try {
            const taskData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'taskTitle',
                    message: 'Insert title of the task: ',
                },
                {
                    type: 'input',
                    name: 'taskDescription',
                    message: 'insert the description of the task: ',
                },
                {
                    type: 'datetime',
                    name: 'deadLine',
                    message: 'insert the deadline of the task: (optional format: dd/mm/yyyy hh:mm AM/PM)',
                    format: ['d', '/', 'm', '/', 'yy', ' ', 'h', ':', 'MM', ' ', 'TT'],
                },
            ]);

            const token = getDecodedToken();
            console.clear();
            spinner.start();

            await createTaskValidator(taskData);

            const taskCreated = await Task.createTask(taskData.taskTitle, taskData.taskDescription, token.userId, taskData.deadLine);

            spinner.succeed('Task created successfully!');

            console.table([taskCreated.toObject()]);

            return { success: true, message: 'Task created successfully', task: taskCreated };
        } catch (error) {
            spinner.fail('Task not created');
            console.table(error);
            return { success: false, message: error.message, task: null };
        }
    },
    // done
    editTask: async taskId => {
        await isUserLoggedMiddleware();
        const ora = await getSpinner();
        const spinner = ora('Updating task');
        try {
            await updateTaskValidator(taskId);

            const foundTask = await Task.findById(taskId);
            const taskData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'taskTitle',
                    message: 'Insert title fo the task: (optional)',
                    default: foundTask.title,
                },
                {
                    type: 'input',
                    name: 'taskDescription',
                    message: 'insert the description of the task: (optional)',
                    default: foundTask.description,
                },
            ]);

            console.clear();
            spinner.start();

            const taskEdited = await Task.editTask(taskId, taskData.taskTitle, taskData.taskDescription);

            spinner.succeed('Task updated successfully');
            console.table([taskEdited.toObject()]);

            return { success: true, message: 'Task created successfully', task: taskEdited };
        } catch (error) {
            spinner.fail('Task not updated');
            console.table(error);
            return { success: false, message: error.message, task: null };
        }
    },
    // done
    getAllUserTasks: async () => {
        await isUserLoggedMiddleware();

        const ora = await getSpinner();

        const spinner = ora('Fetching all tasks');
        try {
            await isUserLoggedMiddleware();
            const token = getDecodedToken();
            spinner.start();
            const tasks = await Task.find({ user_id: token.userId });
            const displayTasks = tasks.map(task => {
                const { _id, title, description, status, createdAt, updatedAt } = task.toObject();
                return { _id, title, description, status, createdAt, updatedAt };
            });

            spinner.succeed('Tasks fetched successfully');
            console.table(displayTasks);

            return { success: true, message: 'Tasks fetched successfully', tasks: tasks };
        } catch (error) {
            spinner.fail('Tasks not fetched');
            console.table(error);
            return { sucess: false, message: error.message, tasks: null };
        }
    },
    // done
    deleteTask: async taskId => {
        await isUserLoggedMiddleware();

        const ora = await getSpinner();

        const spinner = ora('deleting task');
        try {
            await deleteTaskValidator(taskId);
            console.clear();
            spinner.start();
            const taskDeleted = await Task.deleteOne({ _id: taskId });

            spinner.succeed('Task deleted successfully');

            return { success: true, message: 'Task deleted successfully', task: taskDeleted };
        } catch (error) {
            spinner.fail('Task not deleted');
            console.table(error);
            return { success: false, message: error.message, task: null };
        }
    },
    // done
    filterTasksByField: async (field, fieldValue) => {
        await isUserLoggedMiddleware();

        const ora = await getSpinner();
        const spinner = ora('fetching tasks');
        console.clear();
        spinner.start();
        try {
            const tasks = await Task.find({ [field]: fieldValue });
            const displayTasks = tasks.map(task => {
                const { _id, title, description, status, createdAt, updatedAt } = task.toObject();
                return { _id, title, description, status, createdAt, updatedAt };
            });

            spinner.succeed('Tasks fetched successfully');
            console.table(displayTasks);

            return { success: true, message: 'Tasks fetched successfully', tasks: tasks };
        } catch (error) {
            spinner.fail('Tasks not fetched');
            console.table(error);
            return { success: false, message: error.message, tasks: null };
        }
    },
    // done
    updateTaskStatus: async taskId => {
        await isUserLoggedMiddleware();

        inquirer.default.registerPrompt('search-list', require('inquirer-search-list'));
        const choices = ['Doing it', 'Done', 'Rejected', 'Testing', 'Reviewing', 'For Start'];

        const newStatus = await inquirer.default.prompt([
            {
                type: 'search-list',
                message: 'Select new task Status',
                name: 'taskStatus',
                choices: choices,
                validate: function (answer) {
                    if (choices.includes(answer)) {
                        return true;
                    } else {
                        return 'Please select a valid status, type any key for try again';
                    }
                },
            },
        ]);

        const ora = await getSpinner();
        const spinner = ora('updating task status');

        try {
            spinner.start();
            const taskUpdated = await Task.findOneAndUpdate({ _id: taskId }, { status: newStatus.taskStatus });
            spinner.succeed('Task status updated successfully');

            console.table([taskUpdated.toObject()]);

            return { success: true, message: 'Task status updated successfully', task: taskUpdated };
        } catch (error) {
            spinner.fail('Task status not updated');
            console.table(error);
            return { success: false, message: error.message, task: null };
        }
    },
};

module.exports = tasksController;
