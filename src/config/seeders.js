const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
    database: 'mongodb://root:example@localhost:27018/tasks?authSource=admin',
    dropDatabase: true,
};
const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve(__dirname, '../database/seeders/'));
// try {
//     await seeder.import(collections);
// } catch (error) {
//     logger.info(error);
// }

module.exports = { seeder, collections };
