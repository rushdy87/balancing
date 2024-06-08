const { Op } = require('sequelize');
const moment = require('moment');
const { Unit53Tank, HttpError } = require('../models');
const { findBottomByTag } = require('../utils/tanks-info-helpers');

exports.getAllTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY');

  try {
    const tanks = await Unit53Tank.findAll({
      where: { day: formattedDate },
      attributes: ['id', 'tag_number', 'pumpable'],
    });

    if (!tanks || tanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }
    res.status(200).json({ tanks });
  } catch (error) {
    console.error(`Error fetching tank at : ${day} from Unit 53.`, error);
    return next(
      new HttpError(
        "Something went wrong, could not retrieve Unit 53 tank's right now.",
        500
      )
    );
  }
};

exports.getTankByDay = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY');

  try {
    const tank = await Unit53Tank.findOne({
      where: { tag_number, day: formattedDate },
      attributes: ['id', 'tag_number', 'pumpable'],
    });

    if (!tank) {
      return next(
        new HttpError(
          'Could not find a tank for the provided tag number and this date.',
          404
        )
      );
    }

    res.status(200).json({ tank });
  } catch (error) {
    console.error(
      `Error fetching tank ${tag_number} at : ${day} from Unit 53.`,
      error
    );
    return next(
      new HttpError(
        "Something went wrong, could not retrieve Unit 53 tank's right now.",
        500
      )
    );
  }
};

exports.getAllTanksBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  startDate = moment(from, 'DD-MM-YYYY');
  endDate = moment(to, 'DD-MM-YYYY');

  try {
    const tanks = await Unit53Tank.findAll({
      where: { day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'tag_number', 'pumpable', 'day'],
    });

    if (!tanks || tanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }
    res.status(200).json({ tanks });
  } catch (error) {
    console.error(`Error fetching tank from Unit 53.`, error);
    return next(
      new HttpError(
        "Something went wrong, could not retrieve Unit 53 tank's right now.",
        500
      )
    );
  }
};

exports.getTankBetweenTwoDates = async (req, res, next) => {
  const { tag_number, from, to } = req.params;
  startDate = moment(from, 'DD-MM-YYYY');
  endDate = moment(to, 'DD-MM-YYYY');

  try {
    const tanks = await Unit53Tank.findAll({
      where: { tag_number, day: { [Op.between]: [startDate, endDate] } },
      attributes: ['id', 'tag_number', 'pumpable', 'day'],
    });

    if (!tanks || tanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }
    res.status(200).json({ tanks });
  } catch (error) {
    console.error(
      `Error fetching tank ${tag_number} at : ${day} from Unit 53.`,
      error
    );
    return next(
      new HttpError(
        "Something went wrong, could not retrieve Unit 53 tank's right now.",
        500
      )
    );
  }
};

exports.addVolumeToTanks = async (req, res, next) => {
  const { day, tanks } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY');

  try {
    const createPromises = Object.keys(tanks).map(async (tag_number) => {
      const bottom = await findBottomByTag(tag_number);

      if (bottom === null) {
        throw new HttpError(
          `Could not find bottom for the tank: ${tag_number}`,
          404
        );
      }

      const pumpable = tanks[tag_number] - bottom;

      return await Unit53Tank.create({
        tag_number,
        pumpable,
        day: formattedDate,
      });
    });

    await Promise.all(createPromises);
    res
      .status(201)
      .json({ message: 'All tanks pumpable volumes have been added.' });
  } catch (error) {
    console.error(`Error adding volume to tanks in Unit 53.`, error);
    if (error instanceof HttpError) {
      return next(error);
    }
    return next(
      new HttpError(
        'Something went wrong, could not add tank volumes right now.',
        500
      )
    );
  }
};

exports.addVolumeToOneTank = async (req, res, next) => {
  const { tag_number, tov, day } = req.body;
  const formattedDate = moment(day, 'DD-MM-YYYY');

  const bottom = await findBottomByTag(tag_number);

  if (bottom === null) {
    throw new HttpError(
      `Could not find bottom for the tank: ${tag_number}`,
      404
    );
  }

  const pumpable = tov - bottom;

  try {
    const tank = await Unit53Tank.create({
      tag_number,
      pumpable,
      day: formattedDate,
    });

    if (!tank) {
      return next(
        new HttpError(
          'Something went wrong, could not add tank volume right now',
          404
        )
      );
    }
    res
      .status(201)
      .json({ message: 'All tanks pumpable volumes have been added.' });
  } catch (error) {
    console.error(`Error adding volume to tanks in Unit 53.`, error);
    if (error instanceof HttpError) {
      return next(error);
    }
    return next(
      new HttpError(
        'Something went wrong, could not add tank volumes right now.',
        500
      )
    );
  }
};

exports.updateOneTankVolume = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const { tov } = req.body;

  const formattedDate = moment(day, 'DD-MM-YYYY');

  try {
    const tank = await Unit53Tank.findOne({
      where: { tag_number, day: formattedDate },
      attributes: ['id', 'tag_number', 'pumpable'],
    });

    if (!tank) {
      return next(
        new HttpError(
          'Could not find a tank for the provided tag number and this date.',
          404
        )
      );
    }

    const bottom = await findBottomByTag(tag_number);

    if (bottom === null) {
      throw new HttpError(
        `Could not find bottom for the tank: ${tag_number}`,
        404
      );
    }
    const pumpable = tov - bottom;

    tank.pumpable = pumpable;

    await tank.save();

    res.status(200).json({ message: 'The tank Volume been updated.' });
  } catch (error) {
    console.error(`Error editing volume to tanks in Unit 53.`, error);
    if (error instanceof HttpError) {
      return next(error);
    }
    return next(
      new HttpError(
        'Something went wrong, could not edit tank volumes right now.',
        500
      )
    );
  }
};
