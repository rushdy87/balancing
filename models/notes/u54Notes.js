const Sequelize = require('sequelize');
const sequelize = require('../../database');

const U54Note = sequelize.define('U54Note', {
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
  note: {
    type: Sequelize.STRING,
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

module.exports = U54Note;
