const { Op } = require('sequelize');
const { TanksInfo } = require('../models');

const findTankInfo = async (tag_number) => {
  return await TanksInfo.findOne({
    where: { tag_number },
    attributes: ['low_level', 'high_level', 'working_volume', 'product'],
  });
};

const findTankByDate = async (model, tag_number, day) => {
  return await model.findOne({
    where: { day, tag_number },
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

const countTanksByDate = async (model, day) => {
  return await model.count({ where: { day } });
};

const findTankByDateRange = async (model, tag_number, from, to) => {
  return await model.findAll({
    where: { tag_number, day: { [Op.between]: [from, to] } },
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

const findAllTanksByDate = async (model, day) => {
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

const findAllTanksByDateRange = async (model, from, to) => {
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

const addTankData = async (model, data) => {
  return await model.create(data);
};

const editTank = async (model, tag_number, day, pumpable) => {
  const tank = await model.findOne({
    where: { tag_number, day },
  });

  if (!tank) {
    return null;
  }

  tank.pumpable = pumpable;
  await tank.save();
  return tank;
};

const confirmTank = async (model, tag_number, day) => {
  const tank = await model.findOne({
    where: { tag_number, day },
  });

  if (!tank) {
    return null;
  }

  tank.isConfirmed = true;
  await tank.save();
  return tank;
};

module.exports = {
  findTankInfo,
  findTankByDate,
  countTanksByDate,
  findTankByDateRange,
  findAllTanksByDate,
  findAllTanksByDateRange,
  addTankData,
  editTank,
  confirmTank,
};
