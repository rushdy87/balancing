const { Op } = require('sequelize');
const moment = require('moment');
const { Unit90Tank } = require('../../models');
const {
  findBottomByTag,
  findFactorByTag,
  handleError,
} = require('../../utils');
const { isAuthorized } = require('../../utils/authorization');
const { confireTank } = require('../../utils/tanks');

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

  checkAuthorization(userData, 'u90', next);

  try {
    const tanks = await Unit90Tank.findAll({
      where: { day: formattedDate },
      attributes: ['id', 'day', 'tag_number', 'pumpable', 'isConfirmed'],
    });

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json({ tanks });
  } catch (error) {
    handleError(next, `Error fetching tanks for day: ${day} from Unit 90.`);
  }
};

// Controller to get all tanks between two dates
exports.getAllTanksBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const tanks = await Unit90Tank.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'day', 'tag_number', 'pumpable', 'isConfirmed'],
    });

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json({ tanks });
  } catch (error) {
    handleError(next, 'Error fetching tanks between dates from Unit 90.');
  }
};

// Controller to add volume to tanks
exports.addVolumeToTanks = async (req, res, next) => {
  const { day, tanks } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTanks = await Unit90Tank.findAll({
      where: { day: formattedDate },
    });

    if (existingTanks.length > 0) {
      return handleError(
        next,
        'The tanks volumes for this day are already added.',
        400
      );
    }

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

      const pumpable =
        tanks[tag_number] === 0
          ? tanks[tag_number]
          : tanks[tag_number] - factor * bottom;

      return Unit90Tank.create({
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

  checkAuthorization(userData, 'u90', next);

  try {
    const existingTank = await Unit90Tank.findOne({
      where: { day: formattedDate },
    });

    if (existingTank) {
      return handleError(
        next,
        'The tank volume for this day are already added.',
        400
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

    const pumpable = tov === 0 ? tov : tov - factor * bottom;

    const tank = await Unit90Tank.create({
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
    console.log(error);
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

  checkAuthorization(userData, 'u90', next);

  try {
    const tank = await Unit90Tank.findOne({
      where: { tag_number, day: formattedDate },
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

    const pumpable = tov - bottom;
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

exports.confirmeTank = async (req, res, next) => {
  const { tag_number, day } = req.body;

  if (!day || !tag_number) {
    return handleError(next, 'Missing required tag_number :day.', 400);
  }

  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    await confireTank(Unit90Tank, tag_number, formattedDate);

    res.status(200).json({
      message: `The tank (${tag_number}) have been successfully confirmed.`,
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming tank (${tag_number})  in this day. Error: ${error.message}`
    );
  }
};
