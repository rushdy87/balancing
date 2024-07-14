const { Unit54Storage } = require('../models');
const { findBlendingByDate } = require('./blending');
const { findCrudeOilByDate } = require('./crude-oil');
const { findNaturalGasByDate } = require('./natural-gas');
const { findSolidSulphurProductionByDate } = require('./production');
const { findTanksByDate, findUnitTanksInfo } = require('./tanks');

const checkTanksList = async (tanks, unit) => {
  if (!tanks || tanks.length === 0) {
    return await findUnitTanksInfo(unit);
  }
  return tanks;
};

const findTanksForReport = async (model, unit, day) => {
  const tanks = await findTanksByDate(model, day);
  return await checkTanksList(tanks, unit);
};

const calculateTanksVolumes = (tanks) => {
  // Initialize a result object
  const result = {};

  // Iterate through the combined array
  tanks.forEach((item) => {
    const { product, pumpable, working_volume } = item;

    if (!result[product]) {
      result[product] = { product, pumpable: 0, working_volume: 0 };
    }

    result[product].pumpable += pumpable;
    result[product].working_volume += working_volume;
  });

  // Convert the result object to an array
  return Object.values(result);
};

const findSolidSulphurStorageForReport = async (day) => {
  const sulphurStore = await Unit54Storage.findOne({
    where: { day },
    attributes: ['day', 'working_quantity', 'actual_quantity'],
  });
  if (!sulphurStore) {
    return { working_quantity: 0, actual_quantity: 0 };
  }
  return sulphurStore;
};

const findBlendingByDateForReport = async (day) => {
  const blending = await findBlendingByDate(day);

  if (!blending) {
    return {
      lpg: 0,
      pg: 0,
      rg: 0,
      diesel: 0,
      hfo: 0,
    };
  }
  return {
    lpg: blending.lpg,
    pg: blending.pg,
    rg: blending.rg,
    diesel: blending.diesel,
    hfo: blending.hfo,
  };
};

const findSolidSulphurProductionForReport = async (day) => {
  const solidSulphur = await findSolidSulphurProductionByDate(day);
  if (!solidSulphur) {
    return 0;
  }
  return solidSulphur.quantity;
};

const findCrudeOilByDateForReport = async (day) => {
  const crudeOil = await findCrudeOilByDate(day);

  if (!crudeOil) {
    return {
      w_v_m3: 0,
      reservoir_m3: 0,
      w_v_bbl: 0,
      reservoir_bbl: 0,
      receiving: 0,
      sending: 0,
    };
  }

  return {
    w_v_m3: crudeOil.w_v_m3,
    reservoir_m3: crudeOil.reservoir_m3,
    w_v_bbl: crudeOil.w_v_bbl,
    reservoir_bbl: crudeOil.reservoir_bbl,
    receiving: crudeOil.receiving,
    sending: crudeOil.sending,
  };
};

const findNaturalGasByDateForReport = async (day) => {
  const naturalGas = await findNaturalGasByDate(day);

  if (!naturalGas) {
    return { receiving_m3: 0, receiving_mscf: 0 };
  }

  return {
    receiving_m3: naturalGas.receiving_m3,
    receiving_mscf: naturalGas.receiving_mscf,
  };
};

module.exports = {
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurStorageForReport,
  findBlendingByDateForReport,
  findSolidSulphurProductionForReport,
  findCrudeOilByDateForReport,
  findNaturalGasByDateForReport,
};
