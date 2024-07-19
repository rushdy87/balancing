const {
  findBlendingByDate,
  formatDate,
  checkAuthorization,
  handleError,
  findBlendingByDateRange,
  deleteBlendingVolumes,
  addBlendingVolumes,
} = require('../../utils');

exports.getBlendingByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
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

exports.getBlendingBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const blendingResults = await findBlendingByDateRange(startDate, endDate);

    if (!blendingResults || blendingResults.length === 0) {
      return handleError(next, 'There is no blending in this date range.', 404);
    }

    res.status(200).json(blendingResults);
  } catch (error) {
    handleError(
      next,
      `Error fetching blending quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.AddBlendingVolumes = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(data.day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const existingBlending = await findBlendingByDate(formattedDate);
    if (existingBlending) {
      await deleteBlendingVolumes(formattedDate);
    }

    const blending = await addBlendingVolumes({
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!blending) {
      return handleError(
        next,
        'Could not add blending quantities at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The blending quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding blending quantities. Error: ${error.message}`
    );
  }
};

exports.updateBlendingVolumes = async (req, res, next) => {
  const { day, products } = req.body;
  if (!day || !products) {
    return handleError(next, 'Missing required data: day and products.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const blendingResult = await findBlendingByDate(formattedDate);

    if (!blendingResult) {
      return handleError(
        next,
        'Could not find any blending result for this day.',
        404
      );
    }

    for (const product in products) {
      if (
        products.hasOwnProperty(product) &&
        blendingResult[product] !== undefined &&
        product !== 'isConfirmed'
      ) {
        blendingResult[product] = products[product];
      }
    }

    await blendingResult.save();
    res.status(200).json({
      message: 'The blending quantities have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating blending quantities. Error: ${error.message}`
    );
  }
};

exports.confirmBlending = async (req, res, next) => {
  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const blendingResult = await findBlendingByDate(formattedDate);

    if (!blendingResult) {
      return handleError(
        next,
        'Could not find any blending result for this day.',
        404
      );
    }

    blendingResult.isConfirmed = true;
    await blendingResult.save();
    res.status(200).json({
      message: 'The blending quantities have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming blending quantities. Error: ${error.message}`
    );
  }
};
