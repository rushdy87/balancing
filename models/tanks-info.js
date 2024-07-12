const Sequelize = require('sequelize');
const sequelize = require('../database');

const TanksInfo = sequelize.define('TanksInfo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tag_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  unit: {
    type: Sequelize.ENUM('u52', 'u53', 'u90'),
    allowNull: false,
  },

  low_level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  high_level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  working_volume: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  userId: {
    // Adding the foreign key
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Name of the target model
      key: 'id', // Key in the target model that is referenced
    },
  },
});

module.exports = TanksInfo;
