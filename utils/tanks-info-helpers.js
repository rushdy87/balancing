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

const findBottomByTag = async (tag_number) => {
  const tank = await TanksInfo.findOne({
    where: { tag_number, is_active: true },
    attributes: ['bottom'],
  });
  return tank ? tank.bottom : null;
};

const findProductByTag = async (tag_number) => {
  const tank = await TanksInfo.findOne({
    where: { tag_number, is_active: true },
    attributes: ['product'],
  });
  return tank ? tank.bottom : null;
};

module.exports = {
  allowedUpdateFields,
  findTankByTag,
  findBottomByTag,
  findProductByTag,
};
