const commentSeeds = require('./commentSeeds');
const userSeeds = require('./userSeeds');
const postSeeds = require('./postSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await userSeeds();
    await postSeeds();
    await commentSeeds();
    console.log('SEEDING SUCCESSFUL');

    process.exit(0);
}

seedAll();