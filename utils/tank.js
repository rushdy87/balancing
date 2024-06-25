const { Op } = require('sequelize');

const findTankByDate = async (model, tag_number, day) => {
  return await model.findOne({
    where: { day, tag_number },
    attributes: ['day', 'tag_number', 'pumpable', 'isConfirmed'],
    // attributes: ['day', 'tag_number', 'product', 'pumpable', 'isConfirmed'],
  });
};

const findTankByDateRange = async (model, tag_number, from, to) => {
  return await model.findAll({
    where: { tag_number, day: { [Op.between]: [from, to] } },
    attributes: ['day', 'tag_number', 'pumpable', 'isConfirmed'],
    // attributes: ['day', 'tag_number', 'product', 'pumpable', 'isConfirmed'],
  });
};

const findAllTanksByDate = async (model, day) => {
  return await model.findAll({
    where: { day },
    attributes: ['day', 'tag_number', 'pumpable', 'isConfirmed'],
    // attributes: ['day', 'tag_number', 'product', 'pumpable', 'isConfirmed'],
  });
};
const findAllTanksByDateRange = async (model, from, to) => {
  return await model.findAll({
    where: { day: { [Op.between]: [from, to] } },
    attributes: ['day', 'tag_number', 'pumpable', 'isConfirmed'],
    // attributes: ['day', 'tag_number', 'product', 'pumpable', 'isConfirmed'],
  });
};

module.exports = {
  findTankByDate,
  findTankByDateRange,
  findAllTanksByDate,
  findAllTanksByDateRange,
};
