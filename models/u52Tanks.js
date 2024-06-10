const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Unit52Tank = sequelize.define('Unit52Tank', {
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

module.exports = Unit52Tank;
