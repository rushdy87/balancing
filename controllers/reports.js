const moment = require('moment');

const { checkAuthorization } = require('../utils/authorization');

const { handleError } = require('../utils');
const { Unit52Tank, Unit53Tank, Unit90Tank } = require('../models');
const { findAllTanksByDate } = require('../utils/tanks');

exports.getReportByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const u52Tanks = await findAllTanksByDate(Unit52Tank, formattedDate);
    const u53Tanks = await findAllTanksByDate(Unit53Tank, formattedDate);
    const u90Tanks = await findAllTanksByDate(Unit90Tank, formattedDate);

    const allTanks = [...u52Tanks, ...u53Tanks, ...u90Tanks];

    // Initialize a result object
    const result = {};

    // Iterate through the combined array
    allTanks.forEach((item) => {
      const { product, pumpable, working_volume } = item;

      if (!result[product]) {
        result[product] = { product, pumpable: 0, working_volume: 0 };
      }

      result[product].pumpable += pumpable;
      result[product].working_volume += working_volume;
    });

    // Convert the result object to an array
    const mergedArray = Object.values(result);

    res.json(mergedArray);
  } catch (error) {}
};
