const sequelize = require('../config/connection');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const userData = require('./userData.json');
const commentSeeds = require('./commentSeeds.json');
const postSeeds = require('./postSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentSeeds, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};



seedDatabase();
