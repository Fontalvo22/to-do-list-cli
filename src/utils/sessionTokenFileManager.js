const fileSystem = require('fs');
const jwt = require('jsonwebtoken');

const getTokenFile = () => {
    const tokenFile = fileSystem.readFileSync('.session_token', 'utf8');
    return JSON.parse(tokenFile);
};

const setTokenFile = token => {
    let result = fileSystem.writeFileSync('.session_token', token);
    console.log(result);
};

const getDecodedToken = () => {
    const token = getTokenFile();
    const decodedToken = jwt.decode(token.token);
    return decodedToken;
};
const deleteTokenFile = () => {};

module.exports = { getTokenFile, setTokenFile, deleteTokenFile, getDecodedToken };
