const { Op } = require('sequelize');
const { handleError } = require('.');

exports.findTransport = async (model, day) => {
  return await model.findOne({
    where: { day },
    attributes: ['id', 'day', 'quantity', 'tankers', 'isConfirmed'],
  });
};

exports.findTransportInDateRange = async (model, startDate, endDate) => {
  return await model.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['id', 'day', 'quantity', 'tankers', 'isConfirmed'],
    order: [['day', 'ASC']],
  });
};

exports.createTransport = async (model, transportData, userId) => {
  return model.create({
    ...transportData,
    userId,
  });
};
