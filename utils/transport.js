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
    order: [['day', 'DESC']],
  });
};

exports.createTransport = async (model, transportData, userId) => {
  return await model.create({
    ...transportData,
    userId,
  });
};

exports.confirmTransport = async (model, day, next) => {
  try {
    const transport = await exports.findTransport(model, day);

    if (!transport) {
      return handleError(
        next,
        'Could not find any transport on this date.',
        404
      );
    }

    transport.isConfirmed = true;

    await transport.save();

    return true;
  } catch (error) {
    handleError(next, `Error confirming transport. Error: ${error.message}`);
    return false;
  }
};
