const { Unit52Tank } = require('../../models');
const {
  formatDate,
  validateInput,
  checkAuthorization,
  handleError,
  findTanksByDate,
} = require('../../utils');
const { findTanksByDateRange } = require('../../utils/tanks');

exports.getTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u52', next);

  try {
    const tanks = await findTanksByDate(Unit52Tank, formattedDate);
    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(next, `Error fetching tanks for day: ${day}.`, 500);
  }
};

exports.getTanksBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['from', 'to'], next)) return;

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  checkAuthorization(userData, 'u52', next);

  try {
    const tanks = await findTanksByDateRange(Unit52Tank, startDate, endDate);

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(
      next,
      `Error fetching tanks between dates: ${from} and ${to}.`,
      500
    );
  }
};
