const { CrudeOil } = require('../models');

const cheakCrude = (crudeObj) => {
  if (!crudeObj) {
    return {
      w_v_m3: 0,
      reservoir_m3: 0,
      w_v_bbl: 0,
      reservoir_bbl: 0,
      receiving: 0,
      sending: 0,
    };
  }
  return crudeObj;
};

const findOilByDate = async (day) => {
  const crudeOil = await CrudeOil.findOne({
    where: { day },
    attributes: [
      'id',
      'day',
      'w_v_m3',
      'reservoir_m3',
      'w_v_bbl',
      'reservoir_bbl',
      'receiving',
      'sending',
      'isConfirmed',
    ],
  });

  return cheakCrude(crudeOil);
};

module.exports = {
  findOilByDate,
};
