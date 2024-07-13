const { Unit54Storage } = require('../../models');
const {
  handleError,
  formatDate,
  validateInput,
  findSolidSulphurByDate,
  findSolidSulphurByDateRange,
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

exports.getSolidSulphurBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  checkAuthorization(userData, 'u54', next);
  try {
    const sulphurStore = await findSolidSulphurByDateRange(startDate, endDate);

    if (!sulphurStore || sulphurStore.length === 0) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage in this date range.',
        404
      );
    }

    res.status(200).json(sulphurStore);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Storage in this date range. Error: ${error.message}`
    );
  }
};

exports.addSolidSulphur = async (req, res, next) => {
  const { day, actual_quantity } = req.body;
  if (!day || !actual_quantity) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u54', next);

  try {
    const existingSulphurStore = await findSolidSulphurByDate(formattedDate);

    if (existingSulphurStore) {
      await Unit54Storage.destroy({ where: { day: formattedDate } });
    }

    const sulphurStore = await Unit54Storage.create({
      actual_quantity,
      day: formattedDate,
      userId: userData.id,
    });

    if (!sulphurStore) {
      return handleError(
        next,
        'Could not add Solid Sulphur Storage at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The Solid Sulphur Storage have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};

exports.updateSolidSulphurStore = async (req, res, next) => {
  const { day, actual_quantity } = req.body;
  if (!day || !actual_quantity) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u54', next);

  try {
    const existingSulphurStore = await findSolidSulphurByDate(formattedDate);

    if (!existingSulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage in this day.',
        404
      );
    }

    existingSulphurStore.actual_quantity = actual_quantity;

    await existingSulphurStore.save();

    res.status(201).json({
      message: 'The Solid Sulphur Storage have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};

exports.confirmeSolidSulphurStore = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u54', next);

  try {
    const existingSulphurStore = await findSolidSulphurByDate(formattedDate);

    if (!existingSulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage in this day.',
        404
      );
    }

    existingSulphurStore.isConfirmed = true;

    await existingSulphurStore.save();

    res.status(201).json({
      message: 'The Solid Sulphur Storage have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Solid Sulphur Storage in this day. Error: ${error.message}`
    );
  }
};
