const { Op } = require('sequelize');
const moment = require('moment');
const {
  DieselBlending,
  HFOBlending,
  LPGBlending,
  PGBlending,
  RGBlending,
} = require('../../models');
const { handleError } = require('../../utils');
const { isAuthorized } = require('../../utils/authorization');

// Utility function to check authorization
const checkAuthorization = (userData, requiredUnit, next) => {
  if (!isAuthorized(userData, requiredUnit)) {
    return handleError(next, 'Access Denied.', 403);
  }
};

exports.getAllBlendingQuantitiesByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  const blending = { day };

  try {
    const blendingTypes = [
      { model: DieselBlending, key: 'diesel' },
      { model: HFOBlending, key: 'HFO' },
      { model: LPGBlending, key: 'LPG' },
      { model: PGBlending, key: 'PG' },
      { model: RGBlending, key: 'RG' },
    ];

    for (const { model, key } of blendingTypes) {
      const result = await model.findAll({
        where: { day: formattedDate },
        attributes: ['id', 'quantity', 'isConfirmed'],
      });

      if (!result || result.length === 0) {
        return handleError(next, `There is no blending for ${key}`, 404);
      }

      blending[key] = result;
    }

    res.status(200).json({ blending });
  } catch (error) {
    handleError(
      next,
      `Error fetching blending quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getAllBlendingQuantitiesBetweenTwoDates = async (req, res, next) => {
  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  const blending = { from: startDate, to: endDate };

  try {
    const blendingTypes = [
      { model: DieselBlending, key: 'diesel' },
      { model: HFOBlending, key: 'HFO' },
      { model: LPGBlending, key: 'LPG' },
      { model: PGBlending, key: 'PG' },
      { model: RGBlending, key: 'RG' },
    ];

    for (const { model, key } of blendingTypes) {
      const result = await model.findAll({
        where: { day: { [Op.between]: [startDate, endDate] } },
        attributes: ['day', 'quantity'],
      });

      if (!result || result.length === 0) {
        return handleError(next, `There is no blending for ${key}`, 404);
      }

      blending[key] = result;
    }

    res.status(200).json({ blending });
  } catch (error) {
    handleError(
      next,
      `Error fetching blending quantities. Error: ${error.message}`
    );
  }
};

exports.AddBlendingVolumes = async () => {};
