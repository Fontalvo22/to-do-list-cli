require('dotenv').config();
const { mongoose, connection } = require('mongoose');
const logger = require('pino')();
const connectDatabase = async () => {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
};

connection.on('error', error => {
    logger.error('an error on the DB has occurred', error);
});

module.exports = { connectDatabase, connection };
