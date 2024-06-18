const { Op } = require('sequelize');
const moment = require('moment');
const { PavingAsphaltTransport } = require('../../models');
const { handleError } = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');

exports.getPavingAsphaltTransportbyDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const pAsphalt = await PavingAsphaltTransport.findOne({
      where: { day: formattedDate },
      attributes: ['day', 'quantity', 'tankers', 'isConfirmed'],
    });

    if (!pAsphalt) {
      return handleError(
        next,
        'Could not find any Paving Asphalt Transport for this day.',
        404
      );
    }

    res.status(200).json(pAsphalt);
  } catch (error) {
    handleError(
      next,
      `Error fetching Paving Asphalt Transport quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getPavingAsphaltTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    pAsphalt = await PavingAsphaltTransport.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['day', 'quantity', 'tankers', 'isConfirmed'],
    });

    if (!pAsphalt || pAsphalt.length === 0) {
      return handleError(
        next,
        'There is no Paving Asphalt Transport in this date range.',
        404
      );
    }
    res.status(200).json(pAsphalt);
  } catch (error) {
    handleError(
      next,
      `Error fetching Paving Asphalt Transport quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.addPavingAsphaltTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingAsphalt = await PavingAsphaltTransport.findOne({
      where: { day: formattedDate },
    });

    if (existingAsphalt) {
      return handleError(
        next,
        'The Paving Asphalt Transport for this date already exists.',
        404
      );
    }

    const pAsphalt = await PavingAsphaltTransport.create({
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!pAsphalt) {
      return handleError(
        next,
        'Could not add Paving Asphalt Transport at this time.',
        500
      );
    }

    res.status(201).json({
      message:
        'The Paving Asphalt Transport quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error fetching Paving Asphalt Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.updatePavingAsphaltTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingAsphalt = await PavingAsphaltTransport.findOne({
      where: { day: formattedDate },
    });

    if (!existingAsphalt) {
      return handleError(
        next,
        'There is no Paving Asphalt Transport for this date.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingAsphalt[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingAsphalt[item] = items[item];
      }
    }

    await existingAsphalt.save();

    res.status(200).json({
      message:
        'The Paving Asphalt Transport quantities have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Paving Asphalt Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.confirmePavingAsphaltTransport = async (req, res, next) => {
  const { day } = req.body;

  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingAsphalt = await PavingAsphaltTransport.findOne({
      where: { day: formattedDate },
    });

    if (!existingAsphalt) {
      return handleError(
        next,
        'There is no Paving Asphalt Transport for this date.',
        404
      );
    }

    existingAsphalt.isConfirmed = true;

    await existingAsphalt.save();

    res.status(200).json({
      message:
        'The Paving Asphalt Transport quantities have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Paving Asphalt Transport quantities for day: ${day}. Error: ${error.message}`
    );
  }
};
