const {
  Unit90Tank,
  RGPumping,
  PGPumping,
  DieselPumping,
  KerosenePumping,
  LPGTransport,
  PGTransport,
  RGTransport,
  ATKTransport,
  HFOTransport,
} = require('../../models');
const {
  validateInput,
  formatDate,
  handleError,
  findTanksByDate,
  checkAuthorization,
  findTankInfo,
  findPumping,
  findTransport,
} = require('../../utils');

exports.getAllData = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  try {
    checkAuthorization(userData, 'u90', next);

    const unit90Data = {};

    let tanks = await findTanksByDate(Unit90Tank, formattedDate);
    if (!tanks) {
      tanks = [];
    } else {
      tanks = await Promise.all(
        tanks.map(async (tank) => {
          const { low_level } = await findTankInfo(tank.tag_number);
          const tov = tank.pumpable + low_level;
          return {
            tag_number: tank.tag_number,
            product: tank.product,
            tov,
            day: tank.day,
            isConfirmed: tank.isConfirmed,
          };
        })
      );
    }
    unit90Data.tanks = tanks;

    const pumping = [];
    let pgPumping = await findPumping(PGPumping, formattedDate);
    if (pgPumping) pumping.push({ ...pgPumping.dataValues, product: 'PG' });
    let rgPumping = await findPumping(RGPumping, formattedDate);
    if (rgPumping) pumping.push({ ...rgPumping.dataValues, product: 'RG' });
    let dieselPumping = await findPumping(DieselPumping, formattedDate);
    if (dieselPumping)
      pumping.push({ ...dieselPumping.dataValues, product: 'diesel' });
    let kerosenePumping = await findPumping(KerosenePumping, formattedDate);
    if (kerosenePumping)
      pumping.push({ ...kerosenePumping.dataValues, product: 'kerosene' });
    unit90Data.pumping = [...pumping];

    const lightTransport = [];
    let lpgTransport = await findTransport(LPGTransport, formattedDate);
    if (lpgTransport)
      lightTransport.push({ ...lpgTransport.dataValues, product: 'LPG' });
    let pgTransport = await findTransport(PGTransport, formattedDate);
    if (pgTransport)
      lightTransport.push({ ...pgTransport.dataValues, product: 'PG' });
    let rgTransport = await findTransport(RGTransport, formattedDate);
    if (rgTransport)
      lightTransport.push({ ...rgTransport.dataValues, product: 'RG' });
    let atkTransport = await findTransport(ATKTransport, formattedDate);
    if (atkTransport)
      lightTransport.push({ ...atkTransport.dataValues, product: 'ATK' });
    unit90Data.lightTransport = [...lightTransport];

    let hfoTransport = await HFOTransport.findAll({
      where: { day: formattedDate },
      attributes: ['side', 'quantity', 'tankers'],
    });
    if (!hfoTransport) hfoTransport = [];
    unit90Data.hfoTransport = [...hfoTransport];

    res.status(200).json(unit90Data);
  } catch (error) {
    console.log(error);
    handleError(next, error.message, 500);
  }
};
