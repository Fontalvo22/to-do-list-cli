const { mongoose, connection } = require('mongoose');
const uri = 'mongodb://root:example@localhost:27018/tasks?authSource=admin';

const connectDatabase = async () => {
    await mongoose.connect(uri);
    console.log('connected to the database');
};

connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = { connectDatabase, connection };
