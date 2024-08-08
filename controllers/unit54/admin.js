const {
  validateInput,
  formatDate,
  handleError,
  findSolidSulphurByDate,
} = require('../../utils');

exports.getAllData = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  try {
    checkAuthorization(userData, 'u54', next);

    const unit54Data = {};

    const solidSulphurStore = await findSolidSulphurByDate(formattedDate);

    res.status(200).json(unit54Data);
  } catch (error) {
    console.log(error);
    handleError(next, error.message, 500);
  }
};
