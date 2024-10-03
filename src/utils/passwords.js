require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const PEPPER = process.env.PEPPER_KEY;

const pepperPassword = password => {
    return password + PEPPER;
};

const generateSalt = () => {
    return bcrypt.genSaltSync(10);
};

const hashPassword = password => {
    const pepperedPassword = pepperPassword(password);

    return bcrypt.hashSync(pepperedPassword, 10);
};

const createPasswordHash = password => {
    // const salt = generateSalt();
    const hash = hashPassword(password);
    return { hash: hash };
};

const verifyPassword = (password, hash) => {
    const pepperedPassword = pepperPassword(password);
    return bcrypt.compareSync(pepperedPassword, hash);
};

const comparePassword = async (password, storedHash) => {
    const pepperedPassword = pepperPassword(password);
    return await bcrypt.compare(pepperedPassword, storedHash);
};

module.exports = {
    createPasswordHash,
    hashPassword,
    verifyPassword,
    comparePassword,
};

// /c:/Users/Franklin/Documents/personal/to-do-cli/src/utils/passwords.test
