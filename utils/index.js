const moment = require('moment');

const { handleError } = require('./errors');
const { checkAuthorization } = require('./authorization');
const {
  findTankInfo,
  findTankByDate,
  countTanksByDate,
  findTankByDateRange,
  findAllTanksByDate,
  findAllTanksByDateRange,
  addTankData,
  editTank,
  confirmTank,
  tanksDataFormatting,
} = require('./tanks');
const { findOilByDate } = require('./crudeOil');
const { findNaturalGasByDate } = require('./naturalGas');
const { findBlendingByDate } = require('./blending');
const { findAllPumpingByDate } = require('./pumping');
const {
  findLightTransportByDate,
  findPavingAsphaltTransportBayDate,
  findSolidSulphurTransportBayDate,
  findHfoTransportByDay,
} = require('./transport');
const { findSolidSulphurStorageByDay } = require('./sulphurStorage');
const {
  findNotesByDate,
  addNote,
  editNote,
  destroyNote,
  findAllNotesByDay,
} = require('./notes');

const { checkTanksList, calculateTanksVolumes } = require('./reports');

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
  formatDate,
  validateInput,
  handleError,
  checkAuthorization,
  findTankInfo,
  findTankByDate,
  countTanksByDate,
  findTankByDateRange,
  findAllTanksByDate,
  findAllTanksByDateRange,
  addTankData,
  editTank,
  confirmTank,
  tanksDataFormatting,
  findOilByDate,
  findNaturalGasByDate,
  findBlendingByDate,
  findAllPumpingByDate,
  findLightTransportByDate,
  findPavingAsphaltTransportBayDate,
  findSolidSulphurTransportBayDate,
  findHfoTransportByDay,
  findSolidSulphurStorageByDay,
  findNotesByDate,
  addNote,
  editNote,
  destroyNote,
  findAllNotesByDay,
  checkTanksList,
  calculateTanksVolumes,
};
