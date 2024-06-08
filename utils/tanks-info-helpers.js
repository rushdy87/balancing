const { TanksInfo } = require('../models');

const allowedUpdateFields = ['bottom', 'working_volume', 'is_active'];

const findTankByTag = async (tag_number) => {
  return await TanksInfo.findOne({
    where: { tag_number, is_active: true },
    attributes: [
      'id',
      'tag_number',
      'product',
      'unit',
      'bottom',
      'working_volume',
    ],
  });
};

module.exports = { allowedUpdateFields, findTankByTag };
