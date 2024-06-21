const moment = require('moment');
const { ATKTransport } = require('../../../models');
const { checkAuthorization } = require('../../../utils/authorization');
const {
  findTransport,
  findTransportInDateRange,
  createTransport,
  confirmTransport,
} = require('../../../utils/transport');
const { handleError } = require('../../../utils');

exports.getATKTransport = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await findTransport(ATKTransport, formattedDate);

    if (!transport) {
      return handleError(next, 'There is no ATK transport on this date.');
    }

    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching ATK transport on this date. Error: ${error.message}`
    );
  }
};

exports.getATKTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await findTransportInDateRange(
      ATKTransport,
      startDate,
      endDate
    );

    if (!transport || transport.length === 0) {
      return handleError(next, 'There is no ATK transport in this date range.');
    }
    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching ATK transport in this date range. Error: ${error.message}`
    );
  }
};

exports.addATKTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await findTransport(ATKTransport, formattedDate);

    if (existingTransport) {
      return handleError(
        next,
        'The ATK transport for this day already exists.',
        404
      );
    }

    const transport = await createTransport(
      ATKTransport,
      { ...data, day: formattedDate },
      userData.id
    );

    if (!transport) {
      return handleError(
        next,
        'Could not add ATK transport at this time.',
        500
      );
    }

    res
      .status(200)
      .json({ message: 'The ATK transport has been successfully added.' });
  } catch (error) {
    return handleError(
      next,
      `Error adding ATK transport in this date. Error: ${error.message}`
    );
  }
};

exports.updateATKTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await findTransport(ATKTransport, formattedDate);

    if (!existingTransport) {
      return handleError(next, 'There is no ATK Transport for this day.', 404);
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
      .json({ message: 'The ATK Transport has been successfully updated.' });
  } catch (error) {
    return handleError(
      next,
      `Error updating ATK Transport on this date. Error: ${error.message}`
    );
  }
};

exports.confirmATKTransport = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const isConfirmed = await confirmTransport(
      ATKTransport,
      formattedDate,
      next
    );
    if (isConfirmed) {
      return res
        .status(200)
        .json({ message: 'ATK Transport has been successfully confirmed.' });
    }
  } catch (error) {
    return handleError(
      next,
      `Error confirming ATK Transport on this date. Error: ${error.message}`
    );
  }
};
