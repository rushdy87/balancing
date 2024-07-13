const { CrudeOil } = require('../models');

const findCrudeOilByDate = async (day) => {
  return await CrudeOil.findOne({
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
};

module.exports = { findCrudeOilByDate };
