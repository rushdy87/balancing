const { Op } = require('sequelize');
const moment = require('moment');
const { NaturalGas } = require('../../models');
const { handleError } = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');
const { findNaturalGasByDate } = require('../../utils/naturalGas');

exports.getNaturalGasByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const gasResult = await findNaturalGasByDate(formattedDate);

    if (!gasResult) {
      return handleError(
        next,
        'Could not find any Natural Gas results for this day.',
        404
      );
    }

    res.status(200).json(gasResult);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude Natural Gas for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getAllNaturalGasQuantitiesBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const gasResults = await NaturalGas.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: [
        'id',
        'day',
        'receiving_m3',
        'receiving_mscf',
        'isConfirmed',
      ],
    });

    if (!gasResults || gasResults.length === 0) {
      return handleError(
        next,
        'There is no Natural Gas in this date range.',
        404
      );
    }

    res.status(200).json(gasResults);
  } catch (error) {
    handleError(
      next,
      `Error fetching Natural Gas quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.AddNaturalGasVolumes = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const existingVolumes = await findNaturalGasByDate(formattedDate);
    if (existingVolumes) {
      return handleError(
        next,
        'The Natura Gas volumes for this date already exists.',
        400
      );
    }

    const gasVolumes = await NaturalGas.create({
      ...data,
      day: formattedDate,
      userId: userData.id,
    });
    if (!gasVolumes) {
      return handleError(
        next,
        'Could not add Natural Gas Volumes at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The Natural Gas volumes have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding Natural Gas quantities. Error: ${error.message}`
    );
  }
};

exports.updateNaturalGasVolumes = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day and items.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const gasResults = await findNaturalGasByDate(formattedDate);

    if (!gasResults) {
      return handleError(
        next,
        'Could not find any Natural Gas volumes result for this day.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        gasResults[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        gasResults[item] = items[item];
      }
    }

    await gasResults.save();

    res.status(200).json({
      message: 'The Natural Gas volumes have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Natural Gas volumes. Error: ${error.message}`
    );
  }
};

exports.confirmNaturalGasVolumes = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const gasResult = await findNaturalGasByDate(formattedDate);

    if (!gasResult) {
      return handleError(
        next,
        'Could not find any Natural Gas volumes result for this day.',
        404
      );
    }

    gasResult.isConfirmed = true;
    await gasResult.save();
    res.status(200).json({
      message: 'The Natural Gas volumes have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Natural Gas volumes. Error: ${error.message}`
    );
  }
};
