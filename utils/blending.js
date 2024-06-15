const { Blending } = require('../models');

const findBlendingByDate = async (day) => {
  return await Blending.findOne({ where: { day } });
};

module.exports = {
  findBlendingByDate,
};
