const { getDecodedToken, getTokenFile } = require('../utils/sessionTokenFileManager');
const logger = require('pino')();
const jwt = require('jsonwebtoken');
const isUserLoggedMiddleware = async request => {
    const token = await getTokenFile();
    try {
        jwt.verify(token.token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                logger.error('user is not logged');

                throw new Error(error);
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = isUserLoggedMiddleware;
