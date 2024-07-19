const {
  validateInput,
  checkAuthorization,
  findTankInfo,
  findAllTanksInfo,
  handleError,
  findTanksInfoByUnit,
} = require('../../utils');

exports.getTankInfo = async (req, res, next) => {
  const { tag_number } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['tag_number'], next)) return;

  try {
    checkAuthorization(userData, null, next);
    const tank = await findTankInfo(tag_number);

    if (!tank) {
      return handleError(
        next,
        'Could not find a tank for the provided tag number.',
        404
      );
    }
    res.status(200).json(tank);
  } catch (error) {
    handleError(
      next,
      `Something went wrong, could not retrieve tank info right now.  Error: ${error.message}`
    );
  }
};
exports.getTanksInfo = async (req, res, next) => {
  const { userData } = req;

  try {
    checkAuthorization(userData, null, next);
    const tanks = await findAllTanksInfo();

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tank.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(
      next,
      `Something went wrong, could not retrieve tank info right now.  Error: ${error.message}`
    );
  }
};

exports.getTanksInfoByUnit = async (req, res, next) => {
  const { unit } = req.params;

  const { userData } = req;

  try {
    checkAuthorization(userData, unit, next);
    console.log(unit);
    const tanks = await findTanksInfoByUnit(unit);
    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tank.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(
      next,
      `Something went wrong, could not retrieve tank info right now.  Error: ${error.message}`
    );
  }
};

exports.updateTanksInfo = async (req, res, next) => {
  const updatedData = req.body; // Array of tanks to update

  if (!Array.isArray(updatedData) || updatedData.length === 0) {
    return handleError(next, 'No data provided for update.', 400);
  }

  const { userData } = req;

  try {
    checkAuthorization(userData, null, next);

    const updatePromises = updatedData.map(async (tankData) => {
      const { tag_number } = tankData;
      const tank = await findTankInfo(tag_number);

      if (tank) {
        for (let key in tankData) {
          if (tank.hasOwnProperty(key) && tankData[key] !== undefined) {
            tank[key] = tankData[key];
          }
        }
        return tank.save(); // Save the updated tank to the database
      } else {
        console.log(`Tank with tag number ${tag_number} not found.`);
        return null; // Return null if the tank was not found
      }
    });

    const results = await Promise.all(updatePromises);

    // Check if there were tanks that were not updated
    const notFound = results.filter((result) => result === null).length;
    if (notFound > 0) {
      return handleError(
        next,
        `${notFound} tanks were not found and therefore not updated.`,
        404
      );
    }

    res.status(200).json({ message: 'All tanks have been updated.' });
  } catch (error) {
    handleError(
      next,
      `Something went wrong, could not retrieve tank info right now.  Error: ${error.message}`
    );
  }
};

exports.changeTankActivation = async (req, res, next) => {
  const { tag_number } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['tag_number'], next)) return;

  try {
    checkAuthorization(userData, null, next);

    const tank = await findTankInfo(tag_number);

    if (!tank) {
      return handleError(
        next,
        'Could not find a tank for the provided tag number.',
        404
      );
    }

    tank.is_active = !tank.is_active;

    await tank.save();

    res.status(200).json("the tank's activation mode has been changed.");
  } catch (error) {
    handleError(
      next,
      `Something went wrong, could not retrieve tank info right now.  Error: ${error.message}`
    );
  }
};
