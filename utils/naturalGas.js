const { NaturalGas } = require('../models');

const findNaturalGasByDate = async (day) => {
  return await NaturalGas.findOne({ where: { day } });
};

module.exports = {
  findNaturalGasByDate,
};
