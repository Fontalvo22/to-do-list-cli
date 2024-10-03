const fileSystem = require('fs');

const getTokenFile = () => {
    const tokenFile = fileSystem.readFileSync('.session_token', 'utf8');
    return tokenFile;
};

const setTokenFile = token => {
    let result = fileSystem.writeFileSync('.session_token', token);
    console.log(result);
};

const deleteTokenFile = () => {};

module.exports = { getTokenFile, setTokenFile, deleteTokenFile };
