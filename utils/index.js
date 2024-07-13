const moment = require('moment');

const { checkAuthorization } = require('./authorization');
const { handleError } = require('./errors');
const {
  findTanksByDate,
  deleteTanksVolumes,
  countTanksByDate,
  addTankData,
  tanksDataFormatting,
  findTanksByDateRange,
  findTankInfo,
  editTank,
  confirmTank,
} = require('./tanks');
const {
  findSolidSulphurByDate,
  findSolidSulphurByDateRange,
} = require('./storage');
const {
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurStorageForReport,
  findBlendingByDateForReport,
  findCrudeOilByDateForReport,
  findNaturalGasByDateForReport,
} = require('./reports');
const {
  findBlendingByDate,
  findBlendingByDateRange,
  deleteBlendingVolumes,
  addBlendingVolumes,
} = require('./blending');
const {
  findCrudeOilByDate,
  findCrudeOilByDateRange,
  deleteCrudeOil,
  addCrudeOilVolumes,
} = require('./crude-oil');
const {
  findNaturalGasByDate,
  findNaturalGasByDateRange,
  deleteNaturalGas,
  addNaturalGasVolumes,
} = require('./natural-gas');
const { findNotesByDate, addNote, editNote, destroyNote } = require('./notes');
const {
  findTransport,
  findTransportInDateRange,
  deleteTransport,
  createTransport,
} = require('./transport');

const formatDate = (date) => moment(date, 'DD-MM-YYYY').toDate();

const validateInput = (input, fields, next) => {
  for (const field of fields) {
    if (!input[field]) {
      return handleError(
        next,
        `Invalid input data: ${field} is required.`,
        400
      );
    }
  }
  return true;
};

module.exports = {
  checkAuthorization,
  handleError,
  formatDate,
  validateInput,
  findTankInfo,
  findTanksByDate,
  findTanksByDateRange,
  findSolidSulphurByDate,
  countTanksByDate,
  addTankData,
  tanksDataFormatting,
  deleteTanksVolumes,
  editTank,
  confirmTank,
  findBlendingByDate,
  findBlendingByDateRange,
  deleteBlendingVolumes,
  addBlendingVolumes,
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurByDateRange,
  findSolidSulphurStorageForReport,
  findBlendingByDateForReport,
  findCrudeOilByDateForReport,
  findNaturalGasByDateForReport,
  findCrudeOilByDate,
  findCrudeOilByDateRange,
  deleteCrudeOil,
  addCrudeOilVolumes,
  findNaturalGasByDate,
  findNaturalGasByDateRange,
  deleteNaturalGas,
  addNaturalGasVolumes,
  findNotesByDate,
  addNote,
  editNote,
  destroyNote,
  findTransport,
  findTransportInDateRange,
  deleteTransport,
  createTransport,
};
