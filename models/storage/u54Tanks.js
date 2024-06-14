const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Unit53Tank = sequelize.define('Unit53Tank', {
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

  working_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 9720,
  },
  actual_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isConfirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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

module.exports = Unit53Tank;
