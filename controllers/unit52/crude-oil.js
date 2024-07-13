const {
  formatDate,
  checkAuthorization,
  handleError,
  findCrudeOilByDate,
} = require('../../utils');

exports.getCrudeOilByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const crudeOil = await findCrudeOilByDate(formattedDate);

    if (!crudeOil) {
      return handleError(
        next,
        'Could not find any oil result results for this day.',
        404
      );
    }

    res.status(200).json(crudeOil);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude oil quantities for day: ${day}. Error: ${error.message}`
    );
  }
};
