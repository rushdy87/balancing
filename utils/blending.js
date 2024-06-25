const { Blending } = require('../models');

const findBlendingByDate = async (day) => {
  return await Blending.findOne({
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
};

module.exports = {
  findBlendingByDate,
};
