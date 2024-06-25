const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const Unit53Tank = sequelize.define('Unit53Tank', {
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
  pumpable: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  day: {
    type: Sequelize.DATEONLY,
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

module.exports = Unit53Tank;
