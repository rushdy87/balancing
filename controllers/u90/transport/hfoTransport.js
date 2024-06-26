const { Op } = require('sequelize');
const moment = require('moment');
const { HFOTransport } = require('../../../models');
const { checkAuthorization } = require('../../../utils/authorization');
const { handleError } = require('../../../utils');

exports.getHFOTransportBySide = async (req, res, next) => {
  const { side, day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await HFOTransport.findOne({
      where: { side, day: formattedDate },
      attributes: ['id', 'day', 'side', 'quantity', 'tankers', 'isConfirmed'],
    });

    if (!transport) {
      return handleError(next, 'There is no HFO transport on this date.');
    }

    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching HFO transport on this date. Error: ${error.message}`
    );
  }
};

exports.getHFOTransportByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await HFOTransport.findAll({
      where: { day: formattedDate },
      attributes: ['id', 'day', 'side', 'quantity', 'tankers', 'isConfirmed'],
    });

    if (!transport || transport.length === 0) {
      return handleError(next, 'There is no HFO transport on this date.');
    }

    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching HFO transport on this date. Error: ${error.message}`
    );
  }
};

exports.getHFOTransportBySideBetweenTwoDates = async (req, res, next) => {
  const { side, from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await HFOTransport.findAll({
      where: { side, day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'day', 'side', 'quantity', 'tankers', 'isConfirmed'],
      order: [['day', 'DESC']],
    });

    if (!transport || transport.length === 0) {
      return handleError(next, 'There is no HFO transport in this date range.');
    }
    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching HFO transport on this date. Error: ${error.message}`
    );
  }
};

exports.getHFOTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await HFOTransport.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'day', 'side', 'quantity', 'tankers', 'isConfirmed'],
      order: [['day', 'DESC']],
    });

    if (!transport || transport.length === 0) {
      return handleError(next, 'There is no HFO transport in this date range.');
    }
    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching HFO transport on this date. Error: ${error.message}`
    );
  }
};

exports.addHFOTransport = async (req, res, next) => {
  const { day, quantites } = req.body;
  if (!day || !quantites) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await HFOTransport.findAll({
      where: { day: formattedDate },
    });

    if (existingTransport.length > 0) {
      return handleError(
        next,
        'The HFO transport for this day already exists.',
        404
      );
    }

    const createPromises = quantites.map(async (q) => {
      return await HFOTransport.create({
        ...q,
        day: formattedDate,
        userId: userData.id,
      });
    });

    await Promise.all(createPromises);
    res
      .status(201)
      .json({ message: 'The HFO transport has been successfully added.' });
  } catch (error) {
    return handleError(
      next,
      `Error adding HFO transport in this date. Error: ${error.message}`
    );
  }
};

exports.updateHFOTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await HFOTransport.findOne({
      where: { day: formattedDate, to: items.to },
    });

    if (!existingTransport) {
      return handleError(next, 'There is no HFO Transport for this day.', 404);
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingTransport[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingTransport[item] = items[item];
      }
    }

    await existingTransport.save();

    res
      .status(200)
      .json({ message: 'The HFO Transport has been successfully updated.' });
  } catch (error) {
    return handleError(
      next,
      `Error updating HFO Transport on this date. Error: ${error.message}`
    );
  }
};

exports.confirmHFOTransport = async (req, res, next) => {
  const { day, to } = req.body;
  if (!day || !to) {
    return handleError(next, 'Missing required data: day, to.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await HFOTransport.findOne({
      where: { day: formattedDate, to: to },
    });

    if (!existingTransport) {
      return handleError(next, 'There is no HFO Transport for this day.', 404);
    }
    existingTransport.isConfirmed = true;

    await existingTransport.save();

    res
      .status(200)
      .json({ message: 'The HFO Transport has been successfully confirme.' });
  } catch (error) {
    return handleError(
      next,
      `Error confirming AHFOTK Transport on this date. Error: ${error.message}`
    );
  }
};
