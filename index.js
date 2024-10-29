#!/usr/bin/env node

const { Command } = require('commander');
// const connectDB = require('./src/config/db');
// const taskCommands = require('./commands/taskCommands');
const sessionsCommands = require('./src/commands/sessionsCommands');
const { connectDatabase, connection } = require('./src/config/db');
const program = new Command();

const main = async () => {
    try {
        await connectDatabase();

        program.name('todo list').description('A simple CLI Todo app').version('1.0.0');

        // Register your commands here
        program.addCommand(sessionsCommands);

        program.parse(process.argv);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

main();
