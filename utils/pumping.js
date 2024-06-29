const { Op } = require('sequelize');
const { handleError } = require('./errors');
const {
  PGPumping,
  RGPumping,
  DieselPumping,
  KerosenePumping,
} = require('../models');

exports.findPumping = async (model, day) => {
  return await model.findOne({
    where: { day },
    attributes: ['id', 'day', 'toKarbala', 'toNajaf', 'isConfirmed'],
  });
};

exports.findPumpingInDateRange = async (model, startDate, endDate) => {
  return await model.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['id', 'day', 'toKarbala', 'toNajaf', 'isConfirmed'],
    order: [['day', 'ASC']],
  });
};

exports.createPumping = async (model, pumpingData, userId) => {
  return model.create({
    ...pumpingData,
    userId,
  });
};

exports.confirmPumping = async (model, day, next) => {
  try {
    const pumping = await exports.findPumping(model, day);

    if (!pumping) {
      return handleError(next, 'Could not find any pumping on this date.', 404);
    }

    pumping.isConfirmed = true;
    await pumping.save();
    return true;
  } catch (error) {
    handleError(next, `Error confirming pumping. Error: ${error.message}`);
    return false;
  }
};

exports.findAllPumpingByDate = async (day) => {
  const pgPumping = await PGPumping.findOne({
    where: { day },
    attributes: ['toKarbala', 'toNajaf'],
  });
  const rgPumping = await RGPumping.findOne({
    where: { day },
    attributes: ['toKarbala', 'toNajaf'],
  });
  const dieselPumping = await DieselPumping.findOne({
    where: { day },
    attributes: ['toKarbala', 'toNajaf'],
  });
  const kerosenePumping = await KerosenePumping.findOne({
    where: { day },
    attributes: ['toKarbala', 'toNajaf'],
  });

  return {
    pgPumping: pgPumping.get(),
    rgPumping: rgPumping.get(),
    dieselPumping: dieselPumping.get(),
    kerosenePumping: kerosenePumping.get(),
  };
};
