const { getDecodedToken, getTokenFile } = require('../utils/sessionTokenFileManager');
const logger = require('pino')();
const jwt = require('jsonwebtoken');
const isUserLoggedMiddleware = async request => {
    const token = await getTokenFile();

    if (!token.token) {
        console.error('User is not logged');
        process.exit(1);
    }

    try {
        jwt.verify(token.token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                console.error('user is not logged');

                throw new Error(error);
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = isUserLoggedMiddleware;
