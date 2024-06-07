const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Unit90Tank = sequelize.define('Unit90Tank', {
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
  pumpable: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  day: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = Unit90Tank;
