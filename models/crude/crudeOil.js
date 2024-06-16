const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');

const CrudeOil = sequelize.define('CrudeOil', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  day: { type: Sequelize.DATEONLY, allowNull: false },

  // خزين النفط الخام التشغيلي بالمتر المكعب
  w_v_m3: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 180000 },

  // خزين النفط الخام القابل بالمتر المكعب
  reservoir_m3: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  // خزين النفط الخام التشغيلي بالبرميل
  w_v_bbl: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1132164 },

  // خزين النفط الخام القابل بالبرميل
  reservoir_bbl: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  // النفط الخام المستلم بالمتر المكعب
  receiving: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

  // النفط الخام المرسل بالمتر المكعب
  sending: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },

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

module.exports = CrudeOil;
