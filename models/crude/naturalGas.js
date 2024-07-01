const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const NaturalGas = sequelize.define('NaturalGas', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  day: { type: Sequelize.DATEONLY, allowNull: false },

  // Cubic Meters
  receiving_m3: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  // Million standard cubic feet
  receiving_mscf: {
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
    // Adding the foreign key
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Name of the target model
      key: 'id', // Key in the target model that is referenced
    },
  },
});

module.exports = NaturalGas;
