const { Blending } = require('../models');

const cheakBlending = (blendingObj) => {
  if (!blendingObj) {
    return {
      lpg: 0,
      pg: 0,
      rg: 0,
      diesel: 0,
      hfo: 0,
    };
  }
  return blendingObj;
};

const findBlendingByDate = async (day) => {
  const blending = await Blending.findOne({
    where: { day },
    attributes: [
      'id',
      'day',
      'lpg',
      'pg',
      'rg',
      'diesel',
      'hfo',
      'isConfirmed',
    ],
  });

  return cheakBlending(blending);
};

module.exports = {
  findBlendingByDate,
};
