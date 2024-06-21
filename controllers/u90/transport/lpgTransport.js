const moment = require('moment');
const { LPGTransport } = require('../../../models');
const { checkAuthorization } = require('../../../utils/authorization');
const {
  findTransport,
  findTransportInDateRange,
  createTransport,
} = require('../../../utils/transport');
const { handleError } = require('../../../utils');

exports.getLPGTransport = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await findTransport(LPGTransport, formattedDate);

    if (!transport) {
      return handleError(next, 'There is no LPG transport on this date.');
    }

    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching LPG transport on this date. Error: ${error.message}`
    );
  }
};

exports.getLPGTransportBetweenTwoDates = async (req, res, next) => {
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
      LPGTransport,
      startDate,
      endDate
    );

    if (!transport || transport.length === 0) {
      return handleError(next, 'There is no LPG transport in this date range.');
    }
    res.status(200).json(transport);
  } catch (error) {
    return handleError(
      next,
      `Error fetching LPG transport in this date range. Error: ${error.message}`
    );
  }
};

exports.addLPGTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = findTransport(LPGTransport, formattedDate);

    if (existingTransport) {
      return handleError(
        next,
        'The LPG transport for this day already exists.',
        404
      );
    }

    const transport = await createTransport(
      LPGTransport,
      { ...data, day: formattedDate },
      userData.id
    );

    if (!transport) {
      return handleError(
        next,
        'Could not add LPG transport at this time.',
        500
      );
    }

    res
      .status(200)
      .json({ message: 'The LPG transport has been successfully added.' });
  } catch (error) {
    return handleError(
      next,
      `Error adding LPG transport in this date. Error: ${error.message}`
    );
  }
};
