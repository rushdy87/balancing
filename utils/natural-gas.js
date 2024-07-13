const { NaturalGas } = require('../models');

const findNaturalGasByDate = async (day) => {
  return await NaturalGas.findOne({
    where: { day },
    attributes: ['id', 'day', 'receiving_m3', 'receiving_mscf', 'isConfirmed'],
  });
};

module.exports = { findNaturalGasByDate };
