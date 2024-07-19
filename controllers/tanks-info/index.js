const {
  validateInput,
  checkAuthorization,
  findTankInfo,
  findAllTanksInfo,
  handleError,
} = require('../../utils');

exports.getTankInfo = async (req, res, next) => {
  const { tag_number } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['tag_number'], next)) return;

  checkAuthorization(userData, null, next);

  try {
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
  checkAuthorization(userData, null, next);

  try {
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