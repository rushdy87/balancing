const { Op } = require('sequelize');
const { HFOTransport } = require('../../../models');
const {
  formatDate,
  checkAuthorization,
  handleError,
  findHFOTransportBySide,
} = require('../../../utils');

exports.getHFOTransportBySide = async (req, res, next) => {
  const { side, day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const transport = await findHFOTransportBySide(
      HFOTransport,
      side,
      formattedDate
    );

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
  const formattedDate = formatDate(day);
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

  const startDate = formatDate(from);
  const endDate = formatDate(to);
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

  const startDate = formatDate(from);
  const endDate = formatDate(to);
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
  const { day, data } = req.body;
  if (!day || !data) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await HFOTransport.findAll({
      where: { day: formattedDate },
    });

    if (existingTransport.length > 0) {
      await HFOTransport.destroy({ where: { day: formattedDate } });
    }

    const createPromises = data.map(async (item) => {
      return await HFOTransport.create({
        ...item,
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
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await HFOTransport.findOne({
      where: { day: formattedDate, side: items.side },
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
  const { day, side } = req.body;
  if (!day || !side) {
    return handleError(next, 'Missing required data: day, to.', 400);
  }
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTransport = await HFOTransport.findOne({
      where: { day: formattedDate, side },
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
