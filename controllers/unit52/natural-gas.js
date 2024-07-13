const {
  formatDate,
  checkAuthorization,
  findNaturalGasByDate,
  handleError,
} = require('../../utils');

exports.getNaturalGasByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const gasResult = await findNaturalGasByDate(formattedDate);

    if (!gasResult) {
      return handleError(
        next,
        'Could not find any Natural Gas results for this day.',
        404
      );
    }

    res.status(200).json(gasResult);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude Natural Gas for day: ${day}. Error: ${error.message}`
    );
  }
};
