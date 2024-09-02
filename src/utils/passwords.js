require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const PEPPER = process.env.PEPPER;

const pepperPassword = password => {
    return password + PEPPER;
};

const generateSalt = () => {
    return bcrypt.genSaltSync(10);
};

const hashPassword = (password, salt) => {
    const pepperedPassword = pepperPassword(password);
    const saltedPassword = pepperedPassword + salt;
    return bcrypt.hashSync(saltedPassword, salt);
};

const createPasswordHash = password => {
    const salt = generateSalt();
    const hash = hashPassword(password, salt);
    return { salt: salt, hash: hash };
};

const verifyPassword = (password, hash, salt) => {
    const pepperedPassword = pepperPassword(password);
    const saltedPassword = pepperedPassword + salt;
    return bcrypt.compareSync(saltedPassword, hash);
};

module.exports = {
    createPasswordHash,
    hashPassword,
    verifyPassword,
};

// /c:/Users/Franklin/Documents/personal/to-do-cli/src/utils/passwords.test
