const Sequelize = require('sequelize');
const sequelize = require('../../database');

const HFOBlending = sequelize.define('HFOBlending', {
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

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = HFOBlending;
