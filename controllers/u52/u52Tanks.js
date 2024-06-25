const { Op } = require('sequelize');
const moment = require('moment');
const { Unit52Tank } = require('../../models');
const {
  findBottomByTag,
  handleError,
  findFactorByTag,
} = require('../../utils');
const { isAuthorized } = require('../../utils/authorization');
const { confiremTank } = require('../../utils/tanks');

// Utility function to check authorization
const checkAuthorization = (userData, requiredUnit, next) => {
  if (!isAuthorized(userData, requiredUnit)) {
    return handleError(next, 'Access Denied.', 403);
  }
};

// Controller to get all tanks by day
exports.getAllTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const tanks = await Unit52Tank.findAll({
      where: { day: formattedDate },
      attributes: ['id', 'day', 'tag_number', 'pumpable', 'isConfirmed'],
    });

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json({ tanks });
  } catch (error) {
    handleError(next, `Error fetching tanks for day: ${day} from Unit 52.`);
  }
};

// Controller to get a tank by day
exports.getTankByDay = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const tank = await Unit52Tank.findOne({
      where: { tag_number, day: formattedDate },
      attributes: ['id', 'day', 'tag_number', 'pumpable', 'isConfirmed'],
    });

    if (!tank) {
      return handleError(
        next,
        'Could not find a tank for the provided tag number and this date.',
        404
      );
    }
    res.status(200).json(tank);
  } catch (error) {
    handleError(
      next,
      `Error fetching tank ${tag_number} at : ${day} from Unit 52.`
    );
  }
};

// Controller to get all tanks between two dates
exports.getAllTanksBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const tanks = await Unit52Tank.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'day', 'tag_number', 'pumpable', 'isConfirmed'],
    });

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(next, 'Error fetching tanks between dates from Unit 52.');
  }
};

// Controller to get a tank between two dates
exports.getTankBetweenTwoDates = async (req, res, next) => {
  const { tag_number, from, to } = req.params;
  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const tanks = await Unit52Tank.findAll({
      where: { tag_number, day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'day', 'tag_number', 'pumpable', 'isConfirmed'],
    });

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(
      next,
      `Error fetching tanks ${tag_number} between dates from Unit 52.`
    );
  }
};

// Controller to add volume to tanks
exports.addVolumeToTanks = async (req, res, next) => {
  const { day, tanks } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const createPromises = Object.keys(tanks).map(async (tag_number) => {
      const bottom = await findBottomByTag(tag_number);
      const factor = await findFactorByTag(tag_number);

      if (bottom === null || factor === null) {
        return handleError(
          next,
          `Could not find bottom for the tank: ${tag_number}`,
          404
        );
      }

      const pumpable = tanks[tag_number] - factor * bottom;

      return Unit52Tank.create({
        tag_number,
        pumpable,
        day: formattedDate,
        userId: userData.id,
      });
    });

    await Promise.all(createPromises);
    res
      .status(201)
      .json({ message: 'All tanks pumpable volumes have been added.' });
  } catch (error) {
    console.log(error);
    handleError(
      next,
      'Something went wrong, could not add tank volumes right now.'
    );
  }
};

// Controller to add volume to one tank
exports.addVolumeToOneTank = async (req, res, next) => {
  const { tag_number, tov, day } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const bottom = await findBottomByTag(tag_number);
    const factor = await findFactorByTag(tag_number);

    if (bottom === null || factor === null) {
      return handleError(
        next,
        `Could not find bottom for the tank: ${tag_number}`,
        404
      );
    }

    const pumpable = tov - bottom * factor;

    const tank = await Unit52Tank.create({
      tag_number,
      pumpable,
      day: formattedDate,
      userId: userData.id,
    });

    if (!tank) {
      return handleError(
        next,
        'Something went wrong, could not add tank volumes right now.',
        404
      );
    }

    res.status(201).json({ message: 'Tank volume has been added.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not add tank volumes right now.'
    );
  }
};

// Controller to update one tank volume
exports.updateOneTankVolume = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const { tov } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const tank = await Unit52Tank.findOne({
      where: { tag_number, day: formattedDate },
      attributes: ['id', 'tag_number', 'pumpable'],
    });

    if (!tank) {
      return handleError(
        next,
        'Could not find a tank for the provided tag number and this date.',
        404
      );
    }

    const bottom = await findBottomByTag(tag_number);
    const factor = await findFactorByTag(tag_number);

    if (bottom === null || factor === null) {
      return handleError(
        next,
        `Could not find bottom for the tank: ${tag_number}`,
        404
      );
    }

    const pumpable = tov - bottom * factor;
    tank.pumpable = pumpable;

    await tank.save();

    res.status(200).json({ message: 'The tank volume has been updated.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not update tank volumes right now.'
    );
  }
};

exports.confimTankVolume = async (req, res, next) => {
  const { tag_number, day } = req.body;

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    await confiremTank(Unit52Tank, tag_number, formattedDate);

    res.status(200).json({ message: 'The tank volume has been confirmed.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not confirme tank volumes right now.'
    );
  }
};
