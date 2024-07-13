const { PavingAsphaltTransport } = require('../../models');
const {
  formatDate,
  checkAuthorization,
  findTransport,
  handleError,
  findTransportInDateRange,
  deleteTransport,
  createTransport,
} = require('../../utils');

exports.getPavingAsphaltTransportbyDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const transport = await findTransport(
      PavingAsphaltTransport,
      formattedDate
    );

    if (!transport) {
      return handleError(
        next,
        'Could not find any Paving Asphalt Transport for this day.',
        404
      );
    }

    res.status(200).json(transport);
  } catch (error) {
    handleError(
      next,
      `Error fetching Paving Asphalt Transport quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getPavingAsphaltTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const transport = await findTransportInDateRange(
      PavingAsphaltTransport,
      startDate,
      endDate
    );

    if (!transport || transport.length === 0) {
      return handleError(
        next,
        'There is no Paving Asphalt Transport in this date range.',
        404
      );
    }
    res.status(200).json(transport);
  } catch (error) {
    handleError(
      next,
      `Error fetching Paving Asphalt Transport quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.addPavingAsphaltTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(data.day);
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingTransport = await findTransport(
      PavingAsphaltTransport,
      formattedDate
    );

    if (existingTransport) {
      await deleteTransport(PavingAsphaltTransport, formattedDate);
    }

    const transport = await createTransport(PavingAsphaltTransport, {
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!transport) {
      return handleError(
        next,
        'Could not add Paving Asphalt Transport at this time.',
        500
      );
    }

    res.status(201).json({
      message:
        'The Paving Asphalt Transport quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error fetching Paving Asphalt Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.updatePavingAsphaltTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingTransport = await findTransport(
      PavingAsphaltTransport,
      formattedDate
    );

    if (!existingTransport) {
      return handleError(
        next,
        'There is no Paving Asphalt Transport for this date.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingTransport[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingTransport[item] = items[item];
      }
    }

    await existingTransport.save();

    res.status(200).json({
      message:
        'The Paving Asphalt Transport quantities have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Paving Asphalt Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.confirmePavingAsphaltTransport = async (req, res, next) => {
  const { day } = req.body;

  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u53', next);

  try {
    const existingTransport = await findTransport(
      PavingAsphaltTransport,
      formattedDate
    );
    if (!existingTransport) {
      return handleError(
        next,
        'There is no Paving Asphalt Transport for this date.',
        404
      );
    }
    existingTransport.isConfirmed = true;

    await existingTransport.save();
    res.status(200).json({
      message: 'Paving Asphalt Transport has been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Paving Asphalt Transport quantities for day: ${day}. Error: ${error.message}`
    );
  }
};
