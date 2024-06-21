const moment = require('moment');
const { RGTransport } = require('../../../models');
const { checkAuthorization } = require('../../../utils/authorization');
const {
  findTransport,
  findTransportInDateRange,
  createTransport,
  confirmTransport,
} = require('../../../utils/transport');
const { handleError } = require('../../../utils');

exports.getRGTransport = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await findTransport(RGTransport, formattedDate);

    if (!transport) {
      return handleError(next, 'There is no RG transport on this date.');
    }

    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching RG transport on this date. Error: ${error.message}`
    );
  }
};

exports.getRGTransportBetweenTwoDates = async (req, res, next) => {
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
      RGTransport,
      startDate,
      endDate
    );

    if (!transport || transport.length === 0) {
      return handleError(next, 'There is no RG transport in this date range.');
    }
    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching RG transport in this date range. Error: ${error.message}`
    );
  }
};

exports.addRGTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await findTransport(RGTransport, formattedDate);

    if (existingTransport) {
      return handleError(
        next,
        'The RG transport for this day already exists.',
        404
      );
    }

    const transport = await createTransport(
      RGTransport,
      { ...data, day: formattedDate },
      userData.id
    );

    if (!transport) {
      return handleError(next, 'Could not add RG transport at this time.', 500);
    }

    res
      .status(200)
      .json({ message: 'The RG transport has been successfully added.' });
  } catch (error) {
    return handleError(
      next,
      `Error adding RG transport in this date. Error: ${error.message}`
    );
  }
};

exports.updateRGTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await findTransport(RGTransport, formattedDate);

    if (!existingTransport) {
      return handleError(next, 'There is no RG Transport for this day.', 404);
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
      .json({ message: 'The RG Transport has been successfully updated.' });
  } catch (error) {
    return handleError(
      next,
      `Error updating RG Transport on this date. Error: ${error.message}`
    );
  }
};

exports.confirmRGTransport = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const isConfirmed = await confirmTransport(
      RGTransport,
      formattedDate,
      next
    );
    if (isConfirmed) {
      return res
        .status(200)
        .json({ message: 'RG Transport has been successfully confirmed.' });
    }
  } catch (error) {
    return handleError(
      next,
      `Error confirming RG Transport on this date. Error: ${error.message}`
    );
  }
};
