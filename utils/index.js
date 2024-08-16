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
  findAllTanksInfo,
  findTanksInfoByUnit,
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
  findSolidSulphurProductionForReport,
  findPumpingForReport,
  findTransportToReport,
  findHFOTransportForReport,
  getTotal,
  findNotesForReport,
  calculateOneTankVolumes,
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
  findHFOTransportBySide,
} = require('./transport');
const {
  findSolidSulphurProductionByDate,
  findSolidSulphurProductionByDateRange,
  deleteSolidSulphurProduction,
  addSolidSulphurProduction,
} = require('./production');
const {
  findPumping,
  findPumpingInDateRange,
  deletePumping,
  createPumping,
} = require('./pumping');

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

const getYesterday = (date) => {
  let [day, month, year] = date.split('-').map(Number);

  if (day === 1) {
    // Move to the last day of the previous month
    month -= 1;

    // If it's January, move to December of the previous year
    if (month === 0) {
      month = 12;
      year -= 1;
    }

    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    day = lastDayOfPrevMonth;
  } else {
    day -= 1;
  }

  // Format day and month to have leading zeros if needed
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  const yesterday = `${formattedDay}-${formattedMonth}-${year}`;

  return formatDate(yesterday);
};

module.exports = {
  checkAuthorization,
  handleError,
  formatDate,
  validateInput,
  getYesterday,
  findTankInfo,
  findAllTanksInfo,
  findTanksInfoByUnit,
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
  calculateOneTankVolumes,
  findSolidSulphurByDateRange,
  findSolidSulphurStorageForReport,
  findBlendingByDateForReport,
  findSolidSulphurProductionForReport,
  findCrudeOilByDateForReport,
  findNaturalGasByDateForReport,
  findPumpingForReport,
  findTransportToReport,
  findHFOTransportForReport,
  findNotesForReport,
  getTotal,
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
  findHFOTransportBySide,
  deleteTransport,
  createTransport,
  findSolidSulphurProductionByDate,
  findSolidSulphurProductionByDateRange,
  deleteSolidSulphurProduction,
  addSolidSulphurProduction,
  findPumping,
  findPumpingInDateRange,
  deletePumping,
  createPumping,
};
