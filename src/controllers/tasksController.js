const logger = require('pino')();
const inquirer = require('inquirer');
const User = require('@models/User');
const { setTokenFile } = require('@utils/sessionTokenFileManager');
const tasksController = {
    createTask: async () => {
        try {
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

            const taskCreated = await Task.createTask(taskData.taskTitle, taskData.taskDescription);

            return { success: true, message: 'Task created successfully', task: taskCreated };
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, message: error.message, task: null };
        }
    },
};

module.exports = tasksController;
