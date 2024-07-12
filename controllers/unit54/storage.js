const { Unit54Storage } = require('../../models');
const {
  handleError,
  formatDate,
  validateInput,
  findSolidSulphurByDate,
} = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');

exports.getSolidSulphurByDay = async (req, res, next) => {
  const { day } = req.params;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);

  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const sulphurStore = await findSolidSulphurByDate(formattedDate);

    if (!sulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage on this day.',
        404
      );
    }

    res.status(200).json(sulphurStore);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Storage for day: ${day}. Error: ${error.message}`
    );
  }
};
