module.exports = (async () => {
    return ({ default: ora } = await import('ora'));
})();
