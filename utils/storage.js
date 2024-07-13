const { Op } = require('sequelize');
const { Unit54Storage } = require('../models');

const findSolidSulphurByDate = async (day) => {
  return await Unit54Storage.findOne({
    where: { day },
    attributes: ['day', 'working_quantity', 'actual_quantity', 'isConfirmed'],
  });
};

const findSolidSulphurByDateRange = async (startDate, endDate) => {
  return await Unit54Storage.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['day', 'working_quantity', 'actual_quantity', 'isConfirmed'],
    order: [['day', 'ASC']],
  });
};

module.exports = { findSolidSulphurByDate, findSolidSulphurByDateRange };
