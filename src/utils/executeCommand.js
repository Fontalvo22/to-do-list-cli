const { spawn } = require('child_process');
const path = require('path');

const executeCommand = (command, inputs = []) => {
    return new Promise((resolve, reject) => {
        const cliPath = path.join(__dirname, '../../index.js');
        const cliProcess = spawn('node', [cliPath, command]);

        inputs.forEach(input => {
            cliProcess.stdin.write(`${input}\n`);
        });
        cliProcess.stdin.end();

        let output = '';
        let errorOutput = '';

        cliProcess.stdout.on('data', data => {
            output += data.toString();
        });

        cliProcess.stderr.on('data', data => {
            const dataStr = data.toString();
            console.error(dataStr);
            errorOutput += dataStr;
        });

        cliProcess.on('close', code => {
            if (code !== 0) {
                reject(`Process exited with code ${code}: ${errorOutput}`);
            } else if (errorOutput.includes('unknown command')) {
                reject(`Unknown command: ${command}`);
            } else {
                console.log(output);
                resolve(output);
            }
        });
    });
};

// Example usage:
// executeCommand('login', ['example name', 'testpass'])
//     .then(output => {
//         console.log('Command output:', output);
//     })
//     .catch(error => {
//         console.error('Command error:', error);
//     });

module.exports = executeCommand;
