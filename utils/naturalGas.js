const { NaturalGas } = require('../models');

const cheakGas = (gasObj) => {
  if (!gasObj) {
    return {
      receiving_m3: 0,
      receiving_mscf: 0,
    };
  }
  return gasObj;
};

const findNaturalGasByDate = async (day) => {
  const naturalGas = await NaturalGas.findOne({
    where: { day },
    attributes: ['id', 'day', 'receiving_m3', 'receiving_mscf', 'isConfirmed'],
  });

  return cheakGas(naturalGas);
};

module.exports = {
  findNaturalGasByDate,
};
