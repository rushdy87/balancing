const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const SolidSulphurTransport = sequelize.define('SolidSulphurTransport', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  day: { type: Sequelize.DATEONLY, allowNull: false },

  quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  tankers: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

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
    // Adding the foreign key
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Name of the target model
      key: 'id', // Key in the target model that is referenced
    },
  },
});

module.exports = SolidSulphurTransport;
