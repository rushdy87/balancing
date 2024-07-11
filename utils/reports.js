const { TanksInfo } = require('../models');

// utils/tanksInfo
const findUnitTanksInfo = async (unit) => {
  const tanks = await TanksInfo.findAll({
    where: { unit },
    attributes: ['tag_number', 'product', 'working_volume'],
  });
  return tanks.map((tank) => ({ ...tank.get(), pumpable: 0 }));
};

const checkTanksList = async (tanks, unit) => {
  if (!tanks || tanks.length === 0) {
    return await findUnitTanksInfo(unit);
  }
  return tanks;
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

module.exports = { checkTanksList, calculateTanksVolumes };
