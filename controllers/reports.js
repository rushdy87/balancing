const moment = require('moment');

const { checkAuthorization } = require('../utils/authorization');

const { handleError } = require('../utils');
const { Unit52Tank, Unit90Tank } = require('../models');
const { findTanksByDate } = require('../utils/tanks');

exports.getReportByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const u52Tanks = await findTanksByDate(Unit52Tank, formattedDate);
    const u90Tanks = await findTanksByDate(Unit90Tank, formattedDate);

    /**
     id: 1,
    day: "2024-06-08",
    tag_number: "TK-52-401A",
    pumpable: 11580,
    isConfirmed: true
     */

    res.json({ u52Tanks, u90Tanks });
  } catch (error) {}
};
