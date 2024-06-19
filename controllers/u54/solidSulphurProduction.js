const { Op } = require('sequelize');
const moment = require('moment');
const { SolidSulphurProduction } = require('../../models');
const { handleError } = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');

exports.getSolidSulphurProduction = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const sulphurProduction = await SolidSulphurProduction.findOne({
      where: { day: formattedDate },
      attributes: ['day', 'quantity', 'isConfirmed'],
    });

    if (!sulphurProduction) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Production on this day.',
        404
      );
    }

    res.status(200).json(sulphurProduction);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Production for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getSolidSulphurProductionBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);
  try {
    const sulphurProduction = await SolidSulphurProduction.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['day', 'quantity', 'isConfirmed'],
      order: [['day', 'ASC']],
    });

    if (!sulphurProduction || sulphurProduction.length === 0) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Production in this date range.',
        404
      );
    }

    res.status(200).json(sulphurProduction);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Production in this date range. Error: ${error.message}`
    );
  }
};

exports.addSolidSulphurProduction = async (req, res, next) => {
  const { day, quantity } = req.body;
  if (!day || !quantity) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSulphurProduction = await SolidSulphurProduction.findOne({
      where: { day: formattedDate },
    });

    if (existingSulphurProduction) {
      return handleError(
        next,
        'The Solid Sulphur Production fo this day for this date already exists.',
        404
      );
    }

    const sulphurProduction = await SolidSulphurProduction.create({
      quantity,
      day: formattedDate,
      userId: userData.id,
    });

    if (!sulphurProduction) {
      return handleError(
        next,
        'Could not add Solid Sulphur Production at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The Solid Sulphur Production have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding Solid Sulphur Production in this day. Error: ${error.message}`
    );
  }
};

exports.updateSolidSulphurProduction = async (req, res, next) => {
  const { day, quantity } = req.body;
  if (!day || !quantity) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSulphurProduction = await SolidSulphurProduction.findOne({
      where: { day: formattedDate },
    });

    if (!existingSulphurProduction) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Production in this day.',
        404
      );
    }

    existingSulphurProduction.quantity = quantity;

    await existingSulphurProduction.save();

    res.status(201).json({
      message: 'The Solid Sulphur Production have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Solid Sulphur Production in this day. Error: ${error.message}`
    );
  }
};

exports.confirmeSolidSulphurProduction = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSulphurProduction = await SolidSulphurProduction.findOne({
      where: { day: formattedDate },
    });

    if (!existingSulphurProduction) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Production in this day.',
        404
      );
    }

    existingSulphurProduction.isConfirmed = true;

    await existingSulphurProduction.save();

    res.status(201).json({
      message: 'The Solid Sulphur Production have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Solid Sulphur Production in this day. Error: ${error.message}`
    );
  }
};
