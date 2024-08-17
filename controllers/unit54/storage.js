const { Unit54Storage, U54Note } = require('../../models');
const {
  handleError,
  formatDate,
  validateInput,
  findSolidSulphurByDate,
  findSolidSulphurByDateRange,
  findSolidSulphurProductionByDate,
  deleteSolidSulphurProduction,
  addSolidSulphurProduction,
  addNote,
  getYesterday,
} = require('../../utils');
const { checkAuthorization } = require('../../utils/authorization');

// Helper function for checking and deleting existing production
const updateProduction = async (today, actual_quantity, userId, next) => {
  const yesterdayQuantity = await findSolidSulphurByDate(getYesterday(today));
  if (!yesterdayQuantity) {
    return handleError(
      next,
      "Could not find yesterday's Solid Sulphur Storage.",
      500
    );
  }

  const production = actual_quantity - yesterdayQuantity.actual_quantity;

  const existingProduction = await findSolidSulphurProductionByDate(
    formatDate(today)
  );
  if (existingProduction) {
    await deleteSolidSulphurProduction(formatDate(today));
  }

  const sulphurProduction = await addSolidSulphurProduction({
    quantity: production,
    day: formatDate(today),
    userId,
  });

  if (!sulphurProduction) {
    return handleError(
      next,
      'Could not add Solid Sulphur Production at this time.',
      500
    );
  }
};

exports.getSolidSulphurByDay = async (req, res, next) => {
  const { day } = req.params;

  if (!validateInput(req.params, ['day'], next)) return;

  try {
    const formattedDate = formatDate(day);
    checkAuthorization(req.userData, 'u53', next);

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
      `Error fetching Solid Sulphur Storage for day: ${day}.`,
      500
    );
  }
};

exports.getSolidSulphurBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;

  if (!validateInput(req.params, ['from', 'to'], next)) return;

  try {
    const startDate = formatDate(from);
    const endDate = formatDate(to);
    checkAuthorization(req.userData, 'u54', next);

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
      'Error fetching Solid Sulphur Storage in this date range.',
      500
    );
  }
};

exports.addSolidSulphur = async (req, res, next) => {
  const { day, big_bag, small_bag, silos, temporary_shelter } = req.body;

  if (
    !validateInput(
      req.body,
      ['day', 'big_bag', 'small_bag', 'silos', 'temporary_shelter'],
      next
    )
  )
    return;

  try {
    const formattedDate = formatDate(day);
    checkAuthorization(req.userData, 'u54', next);

    await Unit54Storage.destroy({ where: { day: formattedDate } });

    const actual_quantity = +big_bag + +small_bag + +silos + +temporary_shelter;

    const sulphurStore = await Unit54Storage.create({
      actual_quantity,
      big_bag,
      small_bag,
      silos,
      temporary_shelter,
      day: formattedDate,
      userId: req.userData.id,
    });

    if (!sulphurStore) {
      return handleError(
        next,
        'Could not add Solid Sulphur Storage at this time.',
        500
      );
    }

    await updateProduction(day, actual_quantity, req.userData.id, next);

    await addNote(U54Note, {
      note: `القابل لتجهيز الكبريت الصلب متوفر بأكياس بكمية ${
        +big_bag + +small_bag
      } طن وبكمية ${silos} طن بالسايلوات وبكمية ${temporary_shelter} طن بالخزن المؤقت.`,
      day: formattedDate,
      userId: req.userData.id,
    });

    res.status(201).json({
      message:
        'The Solid Sulphur Storage and today Production have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding Solid Sulphur Storage. ${error.message}`,
      500
    );
  }
};

exports.updateSolidSulphurStore = async (req, res, next) => {
  const { day, data } = req.body;

  if (!validateInput(req.body, ['day', 'data'], next)) return;

  try {
    const formattedDate = formatDate(day);
    checkAuthorization(req.userData, 'u54', next);

    const sulphurStore = await findSolidSulphurByDate(formattedDate);
    if (!sulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage on this day.',
        404
      );
    }

    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        key !== 'isConfirmed' &&
        key !== 'actual_quantity'
      ) {
        sulphurStore[key] = data[key];
      }
    }

    sulphurStore.actual_quantity =
      sulphurStore.big_bag +
      sulphurStore.small_bag +
      sulphurStore.silos +
      sulphurStore.temporary_shelter;
    await sulphurStore.save();

    await updateProduction(
      day,
      sulphurStore.actual_quantity,
      req.userData.id,
      next
    );

    res.status(200).json({
      message: 'The Solid Sulphur Storage has been successfully updated.',
    });
  } catch (error) {
    handleError(next, 'Error updating Solid Sulphur Storage on this day.', 500);
  }
};

exports.confirmSolidSulphurStore = async (req, res, next) => {
  const { day } = req.body;

  if (!validateInput(req.body, ['day'], next)) return;

  try {
    const formattedDate = formatDate(day);
    checkAuthorization(req.userData, 'u54', next);

    const sulphurStore = await findSolidSulphurByDate(formattedDate);
    if (!sulphurStore) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Storage on this day.',
        404
      );
    }

    sulphurStore.isConfirmed = true;
    await sulphurStore.save();

    res.status(200).json({
      message: 'The Solid Sulphur Storage has been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      'Error confirming Solid Sulphur Storage on this day.',
      500
    );
  }
};
