const { Op } = require('sequelize');
const { NaturalGas } = require('../models');

const findNaturalGasByDate = async (day) => {
  return await NaturalGas.findOne({
    where: { day },
    attributes: ['id', 'day', 'receiving_m3', 'receiving_mscf', 'isConfirmed'],
  });
};

const findNaturalGasByDateRange = async (startDate, endDate) => {
  return await NaturalGas.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
    attributes: ['id', 'day', 'receiving_m3', 'receiving_mscf', 'isConfirmed'],
  });
};

const deleteNaturalGas = async (day) => {
  return await NaturalGas.destroy({ where: { day } });
};

const addNaturalGasVolumes = async (gasData) => {
  await NaturalGas.create(gasData);
};
module.exports = {
  findNaturalGasByDate,
  findNaturalGasByDateRange,
  deleteNaturalGas,
  addNaturalGasVolumes,
};
