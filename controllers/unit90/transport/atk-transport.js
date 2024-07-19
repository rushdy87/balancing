const { ATKTransport } = require('../../../models');
const {
  formatDate,
  checkAuthorization,
  findTransport,
  handleError,
  findTransportInDateRange,
  deleteTransport,
  createTransport,
} = require('../../../utils');

exports.getTransportbyDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u90', next);
    const transport = await findTransport(ATKTransport, formattedDate);

    if (!transport) {
      return handleError(
        next,
        'Could not find any ATK Transport for this day.',
        404
      );
    }

    res.status(200).json(transport);
  } catch (error) {
    handleError(
      next,
      `Error fetching ATK Transport quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u90', next);
    const transport = await findTransportInDateRange(
      ATKTransport,
      startDate,
      endDate
    );

    if (!transport || transport.length === 0) {
      return handleError(
        next,
        'There is no ATK Transport  in this date range.',
        404
      );
    }
    res.status(200).json(transport);
  } catch (error) {
    handleError(
      next,
      `Error fetching ATK Transport quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.addTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(data.day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u90', next);
    const existingTransport = await findTransport(ATKTransport, formattedDate);

    if (existingTransport) {
      await deleteTransport(ATKTransport, formattedDate);
    }

    const transport = await createTransport(ATKTransport, {
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!transport) {
      return handleError(
        next,
        'Could not add ATK Transport at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The ATK Transport quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error fetching ATK Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.updateTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u90', next);
    const existingTransport = await findTransport(ATKTransport, formattedDate);

    if (!existingTransport) {
      return handleError(next, 'There is no ATK Transport for this date.', 404);
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

    res.status(200).json({
      message: 'The ATK Transport quantities have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating ATK Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.confirmeTransport = async (req, res, next) => {
  const { day } = req.body;

  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u90', next);
    const existingTransport = await findTransport(ATKTransport, formattedDate);
    if (!existingTransport) {
      return handleError(next, 'There is no ATK Transport for this date.', 404);
    }
    existingTransport.isConfirmed = true;

    await existingTransport.save();
    res.status(200).json({
      message: 'ATK Transport has been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming ATK Transportquantities for day: ${day}. Error: ${error.message}`
    );
  }
};
