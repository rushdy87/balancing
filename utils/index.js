const {
  TanksInfo,
  Unit52Tank,
  Unit53Tank,
  Unit90Tank,
  HttpError,
} = require('../models');

const allowedUpdateFields = ['bottom', 'working_volume', 'is_active'];

const findTankByTag = (tag_number) => {
  return TanksInfo.findOne({
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

const findFactorByTag = async (tag_number) => {
  const tank = await TanksInfo.findOne({
    where: { tag_number, is_active: true },
    attributes: ['factor'],
  });
  return tank ? tank.factor : null;
};

const findProductByTag = async (tag_number) => {
  const tank = await TanksInfo.findOne({
    where: { tag_number, is_active: true },
    attributes: ['product'],
  });

  return tank ? tank.product : null;
};

const findProductByTagWVByTag = async (tag_number) => {
  const tank = await TanksInfo.findOne({
    where: { tag_number, is_active: true },
    attributes: ['working_volume'],
  });

  return tank ? tank.working_volume : null;
};

const transformData = (tanks) => {
  return Object.values(
    tanks.reduce((acc, tank) => {
      const { product, pumpable, working_volume } = tank;

      if (!acc[product]) {
        acc[product] = {
          product,
          pumpable: 0,
          working_volume: 0,
        };
      }

      acc[product].pumpable += pumpable;
      acc[product].working_volume += working_volume;

      return acc;
    }, {})
  );
};

const getTanksByDay = (unitModel, formattedDate) => {
  return unitModel.findAll({
    where: { day: formattedDate },
    attributes: ['id', 'tag_number', 'pumpable'],
    raw: true,
  });
};

const fetchTanksData = async (formattedDate) => {
  const [u52Tanks, u53Tanks, u90Tanks] = await Promise.all([
    getTanksByDay(Unit52Tank, formattedDate),
    getTanksByDay(Unit53Tank, formattedDate),
    getTanksByDay(Unit90Tank, formattedDate),
  ]);
  return [...u52Tanks, ...u53Tanks, ...u90Tanks];
};

const handleError = (next, message, statusCode = 500) => {
  return next(new HttpError(message, statusCode));
};

module.exports = {
  allowedUpdateFields,
  findTankByTag,
  findBottomByTag,
  findFactorByTag,
  findProductByTag,
  findProductByTagWVByTag,
  transformData,
  getTanksByDay,
  fetchTanksData,
  handleError,
};
