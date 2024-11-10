module.exports = async () => {
    const { default: ora } = await import('ora');
    return ora;
};
