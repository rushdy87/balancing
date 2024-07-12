const { Unit54Storage } = require('../models');

const findSolidSulphurByDate = async (day) => {
  return await Unit54Storage.findOne({
    where: { day },
    attributes: ['day', 'working_quantity', 'actual_quantity', 'isConfirmed'],
  });
};

module.exports = { findSolidSulphurByDate };
