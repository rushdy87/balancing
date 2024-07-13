const { Unit54Storage } = require('../models');
const { findTanksByDate, findUnitTanksInfo } = require('./tanks');

const checkTanksList = async (tanks, unit) => {
  if (!tanks || tanks.length === 0) {
    return await findUnitTanksInfo(unit);
  }
  return tanks;
};

const findTanksForReport = async (model, unit, day) => {
  const tanks = await findTanksByDate(model, day);
  return await checkTanksList(tanks, unit);
};

const calculateTanksVolumes = (tanks) => {
  // Initialize a result object
  const result = {};

  // Iterate through the combined array
  tanks.forEach((item) => {
    const { product, pumpable, working_volume } = item;

    if (!result[product]) {
      result[product] = { product, pumpable: 0, working_volume: 0 };
    }

    result[product].pumpable += pumpable;
    result[product].working_volume += working_volume;
  });

  // Convert the result object to an array
  return Object.values(result);
};

const findSolidSulphurStorageForReport = async (day) => {
  const sulphurStore = await Unit54Storage.findOne({
    where: { day },
    attributes: ['day', 'working_quantity', 'actual_quantity'],
  });
  if (!sulphurStore) {
    return { working_quantity: 0, actual_quantity: 0 };
  }
  return sulphurStore;
};

module.exports = {
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurStorageForReport,
};
