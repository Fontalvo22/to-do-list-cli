module.exports = async () => {
    const chalk = (await import('chalk')).default;
    return chalk;
};
