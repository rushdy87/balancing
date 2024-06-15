const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Blending = sequelize.define('Blending', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  lpg: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  pg: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  rg: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  diesel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  hfo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isConfirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  notes: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = Blending;
