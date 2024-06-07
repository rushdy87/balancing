const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

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
    type: Sequelize.ENUM(['u52', 'u53', 'u90']),
    allowNull: false,
  },
  bottom: {
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
});

module.exports = TanksInfo;
