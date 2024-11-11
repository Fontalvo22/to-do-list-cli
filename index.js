#!/usr/bin/env node

const { Command } = require('commander');
// const connectDB = require('./src/config/db');
// const taskCommands = require('./commands/taskCommands');
const sessionsCommands = require('./src/commands/sessionsCommands');
const tasksCommands = require('./src/commands/tasksCommands');
const { connectDatabase, connection } = require('./src/config/db');
const program = new Command();

const main = async () => {
    if (process.env.RUN_MODE == 'dev') {
        return undefined;
    }
    try {
        await connectDatabase();

        program.name('todo list').description('A simple CLI Todo app').version('1.0.0');

        // Register your commands here
        sessionsCommands(program);
        tasksCommands(program);
        program.parseAsync(process.argv).then(() => {
            process.exit(0);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    } // finally {
    //    await closeDatabaseConnection();
    // }
};

main();
