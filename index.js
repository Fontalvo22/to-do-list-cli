#!/usr/bin/env node

const { Command } = require('commander');
// const connectDB = require('./src/config/db');
// const taskCommands = require('./commands/taskCommands');
const sessionsCommands = require('./src/commands/sessionsCommands');
const { connectDatabase } = require('./src/config/db');
const program = new Command();
console.log('example');

connectDatabase();

program.name('todo list').description('A simple CLI Todo app').version('1.0.0');

program.parse(process.argv);

// program.addCommand(sessionsCommands);
// program.addCommand(taskCommands);
