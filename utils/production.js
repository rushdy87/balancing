const { Op } = require('sequelize');
const { SolidSulphurProduction } = require('../models');

const findSolidSulphurProductionByDate = async (day) => {
  return await SolidSulphurProduction.findOne({
    where: { day },
    attributes: ['id', 'day', 'quantity', 'isConfirmed'],
  });
};

const findSolidSulphurProductionByDateRange = async (startDate, endDate) => {
  return await SolidSulphurProduction.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['id', 'day', 'quantity', 'isConfirmed'],
  });
};

const deleteSolidSulphurProduction = async (day) => {
  return await SolidSulphurProduction.destroy({ where: { day } });
};

const addSolidSulphurProduction = async (SolidSulphurData) => {
  return await SolidSulphurProduction.create(SolidSulphurData);
};

module.exports = {
  findSolidSulphurProductionByDate,
  findSolidSulphurProductionByDateRange,
  deleteSolidSulphurProduction,
  addSolidSulphurProduction,
};
