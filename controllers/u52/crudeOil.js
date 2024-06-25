const { Op } = require('sequelize');
const moment = require('moment');
const { CrudeOil } = require('../../models');
const { handleError } = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');
const { findOilByDate } = require('../../utils/crudeOil');

exports.getAllOilQuantitiesByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const oilResult = await findOilByDate(formattedDate);

    if (!oilResult) {
      return handleError(
        next,
        'Could not find any oil result results for this day.',
        404
      );
    }

    res.status(200).json(oilResult);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude oil quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getAllOilQuantitiesBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const oilResults = await CrudeOil.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: [
        'id',
        'day',
        'w_v_m3',
        'reservoir_m3',
        'w_v_bbl',
        'reservoir_bbl',
        'receiving',
        'sending',
        'isConfirmed',
      ],
    });

    if (!oilResults || oilResults.length === 0) {
      return handleError(
        next,
        'There is no crude oil quantities in this date range.',
        404
      );
    }

    res.status(200).json(oilResults);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude oil quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.AddOilVolumes = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const existingVolumes = await findOilByDate(formattedDate);
    if (existingVolumes) {
      return handleError(
        next,
        'The crude oil volumes for this date already exists.',
        400
      );
    }

    const oilVolumes = await CrudeOil.create({
      ...data,
      day: formattedDate,
      userId: userData.id,
    });
    if (!oilVolumes) {
      return handleError(next, 'Could not add oil Volumes at this time.', 500);
    }

    res.status(201).json({
      message: 'The crude oil volumes quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding crude oil quantities. Error: ${error.message}`
    );
  }
};

exports.updateOilVolumes = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day and items.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const oilResults = await findOilByDate(formattedDate);

    if (!oilResults) {
      return handleError(
        next,
        'Could not find any oil volumes result for this day.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        oilResults[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        oilResults[item] = items[item];
      }
    }

    await oilResults.save();
    res.status(200).json({
      message: 'The crude oil volumes have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating crude oil volumes. Error: ${error.message}`
    );
  }
};

exports.confirmOilVolumes = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const oilResult = await findOilByDate(formattedDate);

    if (!oilResult) {
      return handleError(
        next,
        'Could not find any crude oil volumes result for this day.',
        404
      );
    }

    oilResult.isConfirmed = true;
    await oilResult.save();
    res.status(200).json({
      message: 'The crude oil volumes have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming crude oil volumes. Error: ${error.message}`
    );
  }
};
