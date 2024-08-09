const { SolidSulphurTransport } = require('../../models');
const {
  validateInput,
  formatDate,
  checkAuthorization,
  handleError,
  findSolidSulphurByDate,
  findSolidSulphurProductionByDate,
  findTransport,
} = require('../../utils');

exports.getAllData = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  try {
    checkAuthorization(userData, 'u54', next);

    const unit54Data = {};

    let store = await findSolidSulphurByDate(formattedDate);
    if (store) {
      unit54Data.store = {
        big_bag: store.big_bag,
        small_bag: store.small_bag,
        silos: store.silos,
        temporary_shelter: store.temporary_shelter,
        working_quantity: store.working_quantity,
        actual_quantity: store.actual_quantity,
      };
    } else {
      unit54Data.store = {};
    }

    let production = await findSolidSulphurProductionByDate(formattedDate);
    if (production) {
      unit54Data.production = {
        quantity: production.quantity,
      };
    } else {
      unit54Data.production = {};
    }

    let transport = await findTransport(SolidSulphurTransport, formattedDate);
    if (transport) {
      unit54Data.transport = {
        quantity: transport.quantity,
        tankers: transport.tankers,
      };
    } else {
      unit54Data.transport = {};
    }

    res.status(200).json(unit54Data);
  } catch (error) {
    console.log(error);
    handleError(next, error.message, 500);
  }
};
