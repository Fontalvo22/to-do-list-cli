const logger = require('pino')();
const inquirer = require('inquirer');
const { getDecodedToken } = require('../utils/sessionTokenFileManager');
const Task = require('../models/Task');
const isUserLoggedMiddleware = require('../middlewares/isUserLogged.middleware');

const tasksController = {
    createTask: async () => {
        try {
            isUserLoggedMiddleware();
            const taskData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'taskTitle',
                    message: 'Insert title fo the task: ',
                },
                {
                    type: 'input',
                    name: 'taskDescription',
                    message: 'insert the description of the task: ',
                },
            ]);

            const token = getDecodedToken();

            const taskCreated = await Task.createTask(taskData.taskTitle, taskData.taskDescription, token.userId);
            console.table(taskCreated._doc);
            return { success: true, message: 'Task created successfully', task: taskCreated };
        } catch (error) {
            console.log(error);
            return { success: false, message: error.message, task: null };
        }
    },

    editTask: async () => {
        try {
            const taskData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'taskId',
                    message: 'Insert the id of the task you want to edit: ',
                },
                {
                    type: 'input',
                    name: 'taskTitle',
                    message: 'Insert title fo the task: (optional)',
                },
                {
                    type: 'input',
                    name: 'taskDescription',
                    message: 'insert the description of the task: (optional)',
                },
                {
                    type: 'input',
                    name: 'taskStatus',
                    message: 'insert the status of the task (optional): ',
                },
            ]);

            const taskEdited = await Task.editTask(taskData.taskId, taskData.taskTitle, taskData.taskDescription, taskData.taskStatus);
            console.table(taskEdited._doc);

            return { success: true, message: 'Task created successfully', task: taskEdited };
        } catch (error) {
            logger.error(error);
            return { success: false, message: error.message, task: null };
        }
    },

    getAllUserTasks: async () => {
        try {
            await isUserLoggedMiddleware();
            const token = getDecodedToken();

            const tasks = await Task.find({ user_id: token.userId });
            console.table(tasks._doc);
            return { success: true, message: 'Tasks fetched successfully', tasks: tasks };
        } catch (error) {
            logger.error(error);
            return [];
        }
    },

    deleteTask: async () => {
        try {
            const taskData = await inquirer.default.prompt([
                {
                    type: 'input',
                    name: 'taskId',
                    message: 'Insert the id of the task you want to delete: ',
                },
            ]);

            const taskDeleted = await Task.deleteOne({ _id: taskData.taskId });

            return { success: true, message: 'Task deleted successfully', task: taskDeleted };
        } catch (error) {
            logger.error(error);
            return { success: false, message: error.message, task: null };
        }
    },
};

module.exports = tasksController;
