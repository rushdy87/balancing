const { Op } = require('sequelize');

const findTransport = async (model, day) => {
  return await model.findOne({
    where: { day },
    attributes: ['id', 'day', 'quantity', 'tankers', 'isConfirmed'],
  });
};

const findTransportInDateRange = async (model, startDate, endDate) => {
  return await model.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['id', 'day', 'quantity', 'tankers', 'isConfirmed'],
    order: [['day', 'DESC']],
  });
};

const deleteTransport = async (model, day) => {
  return await model.destroy({ where: { day } });
};

const createTransport = async (model, transportData) => {
  return await model.create({
    ...transportData,
  });
};

const findHFOTransportBySide = async (module, side, day) => {
  return await module.findOne({
    where: { side, day },
    attributes: ['id', 'day', 'side', 'quantity', 'tankers', 'isConfirmed'],
  });
};

module.exports = {
  findTransport,
  findTransportInDateRange,
  deleteTransport,
  createTransport,
  findHFOTransportBySide,
};
