// const pino = require('pino');
// const pretty = require('pino-pretty');

// const { green, red, yellow, blue, magenta, cyan, white } = require('colorette');

// const stream = pretty({
//     colorize: true,
//     levelFirst: true,
//     translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
//     ignore: 'pid,hostname',
//     prettyPrint: {
//         levelFirst: true,
//     },
//     customPrettifiers: {
//         level: label => {
//             switch (label) {
//                 case 30:
//                     return green(label);
//                 case 'error':
//                     return red(label);
//                 case 'warn':
//                     return yellow(label);
//                 case 'debug':
//                     return blue(label);
//                 case 'trace':
//                     return magenta(label);
//                 case 'fatal':
//                     return cyan(label);
//                 default:
//                     return white(label);
//             }
//         },
//     },
// });

// const logger = pino(stream);

// module.exports = logger;
