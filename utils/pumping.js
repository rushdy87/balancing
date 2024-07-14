const { Op } = require('sequelize');

const findPumping = async (model, day) => {
  return await model.findOne({
    where: { day },
    attributes: ['id', 'day', 'toKarbala', 'toNajaf', 'isConfirmed'],
  });
};

const findPumpingInDateRange = async (model, startDate, endDate) => {
  return await model.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['id', 'day', 'toKarbala', 'toNajaf', 'isConfirmed'],
    order: [['day', 'ASC']],
  });
};

const deletePumping = async (model, day) => {
  return await model.destroy({ where: { day } });
};

const createPumping = async (model, pumpingData) => {
  return model.create(pumpingData);
};

module.exports = {
  findPumping,
  findPumpingInDateRange,
  deletePumping,
  createPumping,
};
