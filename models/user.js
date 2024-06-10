const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('0', '1', '2'),
    allowNull: false,
  },
  unit: {
    type: Sequelize.ENUM('u52', 'u53', 'u90'),
    allowNull: true,
  },
  group: {
    type: Sequelize.ENUM('A', 'B', 'C', 'D'),
    allowNull: true,
  },
});

module.exports = User;
