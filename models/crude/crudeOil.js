const Sequelize = require('sequelize');
const sequelize = require('../../database');

const CrudeOil = sequelize.define('CrudeOil', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  day: { type: Sequelize.DATEONLY, allowNull: false },

  // النفط الخام المستلم بالمتر المكعب
  receiving: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  // النفط الخام المرسل بالمتر المكعب
  sending: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

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

module.exports = CrudeOil;
