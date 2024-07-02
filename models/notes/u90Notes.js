const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const U90Note = sequelize.define('U90Note', {
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

module.exports = U90Note;
