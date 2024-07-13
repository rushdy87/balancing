const moment = require('moment');

const { checkAuthorization } = require('./authorization');
const { handleError } = require('./errors');
const { findTanksByDate } = require('./tanks');
const { findSolidSulphurByDate } = require('./storage');
const {
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurStorageForReport,
} = require('./reports');

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
  findTanksByDate,
  findSolidSulphurByDate,
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurStorageForReport,
};
