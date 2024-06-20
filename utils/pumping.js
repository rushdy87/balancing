const { Op } = require('sequelize');
const { handleError } = require('.');

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
