const { Op } = require('sequelize');

const { TanksInfo } = require('../models');

const findTankInfo = async (tag_number) => {
  return await TanksInfo.findOne({
    where: { tag_number },
    attributes: [
      'id',
      'tag_number',
      'product',
      'unit',
      'low_level',
      'high_level',
      'working_volume',
      'is_active',
    ],
  });
};

const findAllTanksInfo = async () => {
  return await TanksInfo.findAll({
    where: { is_active: true },
    attributes: [
      'id',
      'tag_number',
      'product',
      'unit',
      'low_level',
      'high_level',
      'working_volume',
      'is_active',
    ],
  });
};

const findTanksInfoByUnit = async (unit) => {
  return await TanksInfo.findAll({
    where: { unit, is_active: true },
    attributes: [
      'tag_number',
      'product',
      'working_volume',
      'low_level',
      'high_level',
    ],
  });
};

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

const countTanksByDate = async (model, day) => {
  return await model.count({ where: { day } });
};

const deleteTanksVolumes = async (model, day) => {
  return await model.destroy({ where: { day } });
};

const addTankData = async (model, data) => {
  return await model.create(data);
};

const tanksDataFormatting = async (tanksData) => {
  const tankPromises = Object.keys(tanksData).map(async (tag_number) => {
    const { working_volume, low_level, high_level, product } =
      await findTankInfo(tag_number);

    const tankVolume = tanksData[tag_number];
    const pumpable = tankVolume === 0 ? 0 : tankVolume - low_level;

    if (pumpable > high_level || pumpable < 0) {
      throw new Error(`The pumpable volume for ${tag_number} is out of range.`);
    }

    return {
      tag_number,
      product,
      pumpable,
      working_volume,
    };
  });

  return await Promise.all(tankPromises);
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
  findAllTanksInfo,
  findTanksInfoByUnit,
  findUnitTanksInfo,
  findTanksByDate,
  findTanksByDateRange,
  countTanksByDate,
  deleteTanksVolumes,
  addTankData,
  tanksDataFormatting,
  editTank,
  confirmTank,
};
