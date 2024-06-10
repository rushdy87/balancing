const { Op } = require('sequelize');
const moment = require('moment');
const { Unit52Tank, Unit53Tank, Unit90Tank, HttpError } = require('../models');
const {
  findProductByTag,
  findProductByTagWVByTag,
  transformData,
  fetchTanksData,
  handleError,
} = require('../utils');
const { isAuthorized } = require('../utils/authorization');

const checkAuthorization = (userData, requiredUnit, next) => {
  if (!isAuthorized(userData, requiredUnit)) {
    return handleError(next, 'Access Denied.', 403);
  }
};

exports.getAllTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY');

  const { userData } = req;

  checkAuthorization(userData, 'all', next);

  try {
    const allTanks = await fetchTanksData(formattedDate);

    if (!allTanks || allTanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }
    res.status(200).json({ allTanks });
  } catch (error) {
    console.error(`Error fetching tanks at : ${day}.`, error);
    return next(
      new HttpError(
        'Something went wrong, could not retrieve tanks right now.',
        500
      )
    );
  }
};

exports.getTankByDay = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY', true);
  const unitNumber = tag_number.split('-')[1];

  const { userData } = req;

  checkAuthorization(userData, 'all', next);

  const unitMap = {
    52: Unit52Tank,
    53: Unit53Tank,
    90: Unit90Tank,
  };

  const unitModel = unitMap[unitNumber];
  if (!unitModel) {
    return next(new HttpError('Invalid tag number provided.', 400));
  }

  try {
    const tank = await unitModel.findOne({
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
    console.error(`Error fetching tanks at : ${day}.`, error);
    return next(
      new HttpError(
        'Something went wrong, could not retrieve tanks right now.',
        500
      )
    );
  }
};

exports.getAllTankBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  startDate = moment(from, 'DD-MM-YYYY');
  endDate = moment(to, 'DD-MM-YYYY');

  const { userData } = req;

  checkAuthorization(userData, 'all', next);

  try {
    const [u52Tanks, u53Tanks, u90Tanks] = await Promise.all([
      Unit52Tank.findAll({
        where: { day: { [Op.between]: [startDate, endDate] } },
        attributes: ['id', 'tag_number', 'pumpable', 'day'],
      }),
      Unit53Tank.findAll({
        where: { day: { [Op.between]: [startDate, endDate] } },
        attributes: ['id', 'tag_number', 'pumpable', 'day'],
      }),
      Unit90Tank.findAll({
        where: { day: { [Op.between]: [startDate, endDate] } },
        attributes: ['id', 'tag_number', 'pumpable', 'day'],
      }),
    ]);

    const allTanks = [...u52Tanks, ...u53Tanks, ...u90Tanks];

    if (!allTanks || allTanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }
    res.status(200).json({ allTanks });
  } catch (error) {
    console.error(`Error fetching tanks at : ${day}.`, error);
    return next(
      new HttpError(
        'Something went wrong, could not retrieve tanks right now.',
        500
      )
    );
  }
};

exports.getTanksReportByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY');

  const { userData } = req;

  checkAuthorization(userData, 'all', next);

  try {
    const allTanks = await fetchTanksData(formattedDate);

    if (!allTanks || allTanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }

    const tanksPromises = allTanks.map(async (tank) => {
      const product = await findProductByTag(tank.tag_number);
      const working_volume = await findProductByTagWVByTag(tank.tag_number);
      return { ...tank, product, working_volume };
    });

    const tanks = await Promise.all(tanksPromises);

    const tanksReport = transformData(tanks);

    res.status(200).json({ tanksReport });
  } catch (error) {
    console.error(`Error fetching tanks at : ${day}.`, error);
    return next(
      new HttpError(
        'Something went wrong, could not retrieve tanks right now.',
        500
      )
    );
  }
};
