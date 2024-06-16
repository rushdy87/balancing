const { CrudeOil } = require('../models');

const findOilByDate = async (day) => {
  return await CrudeOil.findOne({ where: { day } });
};

module.exports = {
  findOilByDate,
};
