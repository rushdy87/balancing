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
} = require('./tanks');
const { findOilByDate } = require('./crudeOil');
const { findNaturalGasByDate } = require('./naturalGas');
const { findBlendingByDate } = require('./blending');
const { findAllPumpingByDate } = require('./pumping');
const { findNotesByDate, addNote, editNote, destroyNote } = require('./notes');

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
  findOilByDate,
  findNaturalGasByDate,
  findBlendingByDate,
  findAllPumpingByDate,
  findNotesByDate,
  addNote,
  editNote,
  destroyNote,
};
