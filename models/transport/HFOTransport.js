const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const HFOTransport = sequelize.define('HFOTransport', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  day: { type: Sequelize.DATEONLY, allowNull: false },

  quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  tankers: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  // 1. حكومي
  // 2. أهلي
  // 3. تصدير
  side: {
    type: Sequelize.ENUM('1', '2', '3'),
    allowNull: false,
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

module.exports = HFOTransport;
