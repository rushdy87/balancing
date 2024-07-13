const { Op } = require('sequelize');

const { TanksInfo } = require('../models');

const findUnitTanksInfo = async (unit) => {
  const tanks = await TanksInfo.findAll({
    where: { unit },
    attributes: ['tag_number', 'product', 'working_volume'],
  });
  return tanks.map((tank) => ({ ...tank.get(), pumpable: 0 }));
};

const findTanksByDate = async (model, day) => {
  return await model.findAll({
    where: { day },
    attributes: [
      'day',
      'tag_number',
      'product',
      'pumpable',
      'working_volume',
      'isConfirmed',
    ],
  });
};

const findTanksByDateRange = async (model, from, to) => {
  return await model.findAll({
    where: { day: { [Op.between]: [from, to] } },
    attributes: [
      'day',
      'tag_number',
      'product',
      'pumpable',
      'working_volume',
      'isConfirmed',
    ],
  });
};

module.exports = { findUnitTanksInfo, findTanksByDate, findTanksByDateRange };
