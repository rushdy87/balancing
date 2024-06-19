const { Op } = require('sequelize');
const moment = require('moment');
const { Unit54Storage } = require('../../models');
const { handleError } = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');

exports.getSolidSulphurStore = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const sulphurStore = await Unit54Storage.findOne({
      where: { day: formattedDate },
      attributes: ['day', 'working_quantity', 'actual_quantity', 'isConfirmed'],
    });

    if (!sulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage on this day.',
        404
      );
    }

    res.status(200).json(sulphurStore);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Storage for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getSolidSulphurStoreBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);
  try {
    const sulphurStore = await Unit54Storage.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['day', 'working_quantity', 'actual_quantity', 'isConfirmed'],
      order: [['day', 'ASC']],
    });

    if (!sulphurStore || sulphurStore.length === 0) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage in this date range.',
        404
      );
    }

    res.status(200).json(sulphurStore);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Storage in this date range. Error: ${error.message}`
    );
  }
};

exports.addSolidSulphurStore = async (req, res, next) => {
  const { day, actual_quantity } = req.body;
  if (!day || !actual_quantity) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSulphurStore = await Unit54Storage.findOne({
      where: { day: formattedDate },
    });

    if (existingSulphurStore) {
      return handleError(
        next,
        'The Solid Sulphur Storage fo this day for this date already exists.',
        404
      );
    }

    const sulphurStore = await Unit54Storage.create({
      actual_quantity,
      day: formattedDate,
      userId: userData.id,
    });

    if (!sulphurStore) {
      return handleError(
        next,
        'Could not add Solid Sulphur Storage at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The Solid Sulphur Storage have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};

exports.updateSolidSulphurStore = async (req, res, next) => {
  const { day, actual_quantity } = req.body;
  if (!day || !actual_quantity) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSulphurStore = await Unit54Storage.findOne({
      where: { day: formattedDate },
    });

    if (!existingSulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage in this day.',
        404
      );
    }

    existingSulphurStore.actual_quantity = actual_quantity;

    await existingSulphurStore.save();

    res.status(201).json({
      message: 'The Solid Sulphur Storage have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};

exports.confirmeSolidSulphurStore = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSulphurStore = await Unit54Storage.findOne({
      where: { day: formattedDate },
    });

    if (!existingSulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage in this day.',
        404
      );
    }

    existingSulphurStore.isConfirmed = true;

    await existingSulphurStore.save();

    res.status(201).json({
      message: 'The Solid Sulphur Storage have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};
