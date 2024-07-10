const { Unit54Storage } = require('../models');

const cheakStorage = (sulphurObj) => {
  if (!sulphurObj) {
    return { working_quantity: 0, actual_quantity: 0 };
  }
  return sulphurObj;
};

const findSolidSulphurStorageByDay = async (day) => {
  const sulphurStore = await Unit54Storage.findOne({
    where: { day },
    attributes: ['day', 'working_quantity', 'actual_quantity'],
  });

  return cheakStorage(sulphurStore);
};

module.exports = { findSolidSulphurStorageByDay };
