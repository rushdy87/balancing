const { Op } = require('sequelize');
const moment = require('moment');
const { SolidSulphurTransport } = require('../../models');
const { handleError } = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');

exports.getSolidSulphurTransport = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const solidSulphur = await SolidSulphurTransport.findOne({
      where: { day: formattedDate },
      attributes: ['day', 'quantity', 'tankers', 'isConfirmed'],
    });

    if (!solidSulphur) {
      return handleError(
        next,
        'Could not find any Solid Sulphur on this day.',
        404
      );
    }

    res.status(200).json(solidSulphur);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur transport for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getSolidSulphurTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const solidSulphur = await SolidSulphurTransport.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['day', 'quantity', 'tankers', 'isConfirmed'],
      order: [['day', 'ASC']],
    });

    if (!solidSulphur || solidSulphur.length === 0) {
      return handleError(
        next,
        'Could not find any Solid Sulphur tramsport in this date range.',
        404
      );
    }

    res.status(200).json(solidSulphur);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur transport in this date range. Error: ${error.message}`
    );
  }
};

exports.addSolidSulphurTransport = async (req, res, next) => {
  const { day, quantity, tankers } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSolidSulphur = await SolidSulphurTransport.findOne({
      where: { day: formattedDate },
    });
    if (existingSolidSulphur) {
      return handleError(
        next,
        'The Solid Sulphur transport for this date already exists.',
        404
      );
    }

    const solidSulphur = await SolidSulphurTransport.create({
      day: formattedDate,
      quantity,
      tankers,
      userId: userData.id,
    });

    if (!solidSulphur) {
      return handleError(
        next,
        'Could not add Solid Sulphur at this time.',
        500
      );
    }

    res
      .status(201)
      .json({ message: 'The Solid Sulphur have been successfully added.' });
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur transport for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.updateSolidSulphurTransport = async (req, res, next) => {
  const { day, items } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSolidSulphur = await SolidSulphurTransport.findOne({
      where: { day: formattedDate },
    });

    if (!existingSolidSulphur) {
      return handleError(
        next,
        'There is no Solid Sulphur transport for this date.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingSolidSulphur[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingSolidSulphur[item] = items[item];
      }
    }

    await existingSolidSulphur.save();

    res.status(200).json({
      message: 'The Solid Sulphur have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur transport for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.confirmeSolidSulphur = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingSolidSulphur = await SolidSulphurTransport.findOne({
      where: { day: formattedDate },
    });

    if (!existingSolidSulphur) {
      return handleError(
        next,
        'Could not find any Solid Sulphur in this day.',
        404
      );
    }

    existingSolidSulphur.isConfirmed = true;

    await existingSolidSulphur.save();

    res.status(201).json({
      message: 'The Solid Sulphur have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};
