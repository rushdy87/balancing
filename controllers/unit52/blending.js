const {
  findBlendingByDate,
  formatDate,
  checkAuthorization,
  handleError,
} = require('../../utils');

exports.getBlendingByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const blendingResult = await findBlendingByDate(formattedDate);

    if (!blendingResult) {
      return handleError(
        next,
        'Could not find any blending result for this day.',
        404
      );
    }

    res.status(200).json(blendingResult);
  } catch (error) {
    handleError(
      next,
      `Error fetching blending quantities for day: ${day}. Error: ${error.message}`
    );
  }
};
