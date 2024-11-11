const logger = require('pino')();

const { connectDatabase, connection } = require('../config/db');
const User = require('@models/User');
const inquirer = require('inquirer');
const sessionsController = require('@controllers/sessionsController');
const tasksController = require('@controllers/tasksController');
const Task = require('@models/Task');
const getSpinner = require('../utils/spinnerImporter');

jest.mock('inquirer');
describe('tasksController', () => {
    beforeAll(async () => {
        await connectDatabase();
        // for silence the console.table when will show the info
        jest.spyOn(console, 'table').mockImplementation(() => {});

        // const ora = await getSpinner();
        // const spinner = ora('loging user');

        // console.log('################', ora);
        // jest.spyOn(spinner.prototype, 'start').mockImplementation(() => spinner.prototype);
        // jest.spyOn(spinner.prototype, 'succeed').mockImplementation(() => spinner.prototype);

        // database clean
        await Task.deleteMany({});
        const testUser = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpass',
        };

        inquirer.default.prompt.mockResolvedValue(testUser);
        // a logged user that is required to create a task
        await sessionsController.login();
    });

    describe('createTask', () => {
        const taskData = {
            taskTitle: 'Test Task',
            taskDescription: 'Test Description',
        };

        it('should create a task', async () => {
            inquirer.default.prompt.mockResolvedValue(taskData);
            const result = await tasksController.createTask();
            taskData._id = result.task._id;

            expect(result.success).toBe(true);
            expect(result.task.title).toBe(taskData.taskTitle);
            expect(result.task.description).toBe(taskData.taskDescription);

            const existingTask = await Task.findOne({ title: taskData.taskTitle });
            expect(existingTask).not.toBeNull();
        });

        it('should edit the task', async () => {
            const existingTask = await Task.findOne({ title: taskData.taskTitle });
            const newTaskData = {
                taskTitle: 'Edited Task',
                taskDescription: 'Edited Description',
            };

            inquirer.default.prompt.mockResolvedValue(newTaskData);

            const result = await tasksController.editTask(existingTask._id);

            expect(result.success).toBe(true);
            expect(result.task.title).toBe(newTaskData.taskTitle);
            expect(result.task.description).toBe(newTaskData.taskDescription);

            // const existingTask = await Task.findOne({ title: newTaskData.taskTitle });
            // expect(existingTask).not.toBeNull();
        });

        it('should list all the existing tasks', async () => {
            const tasks = await tasksController.getAllUserTasks();
            expect(tasks.tasks.length).toBeGreaterThanOrEqual(1);
        });

        it('should delete the task', async () => {
            const existingTask = await Task.findOne({ _id: taskData._id });

            // inquirer.default.prompt.mockResolvedValue({ taskId: existingTask._id });

            const result = await tasksController.deleteTask(existingTask._id);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Task deleted successfully');

            const deletedTask = await Task.findOne({ _id: taskData._id });
            expect(deletedTask).toBeNull();
        });
    });
});
