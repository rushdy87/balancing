const { Op } = require('sequelize');
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
const findCrudeOilByDateRange = async (startDate, endDate) => {
  return await CrudeOil.findAll({
    where: { day: { [Op.between]: [startDate, endDate] } },
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

const deleteCrudeOil = async (day) => {
  return await CrudeOil.destroy({ where: { day } });
};

const addCrudeOil = async (crudeOil) => {
  return await CrudeOil.create(crudeOil);
};

module.exports = {
  findCrudeOilByDate,
  findCrudeOilByDateRange,
  deleteCrudeOil,
  addCrudeOil,
};
