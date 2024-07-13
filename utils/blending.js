const { Op } = require('sequelize');

const { Blending } = require('../models');

const findBlendingByDate = async (day) => {
  return await Blending.findOne({
    where: { day },
    attributes: [
      'id',
      'day',
      'lpg',
      'pg',
      'rg',
      'diesel',
      'hfo',
      'isConfirmed',
    ],
  });
};
const findBlendingByDateRange = async (startDate, endDate) => {
  return await Blending.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['day', 'lpg', 'pg', 'rg', 'diesel', 'hfo', 'isConfirmed'],
  });
};

const deleteBlendingVolumes = async (day) => {
  return await Blending.destroy({ where: { day } });
};

const addBlendingVolumes = async (blending) => {
  return await Blending.create(blending);
};

module.exports = {
  findBlendingByDate,
  findBlendingByDateRange,
  deleteBlendingVolumes,
  addBlendingVolumes,
};
