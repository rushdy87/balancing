const User = require('./user');
const HttpError = require('./http-error');
const TanksInfo = require('./tanks-info');

const Blending = require('./blending/blending');
const HFOBlending = require('./blending/hfoBlending');
const SolidSulphurProduction = require('./blending/solidSulphurProduction');

const CrudeOil = require('./crude/crudeOil');
const NaturalGas = require('./crude/naturalGas');

const DieselPumping = require('./pumping/dieselPumping');
const KerosenePumping = require('./pumping/kerosenePumping');
const PGPumping = require('./pumping/PGPumping');
const RGPumping = require('./pumping/RGPumping');

const Unit52Tank = require('./storage/u52Tanks');
const Unit53Tank = require('./storage/u53Tanks');
const Unit54Storage = require('./storage/unit54Storage');
const Unit90Tank = require('./storage/u90Tanks');

const HFOTransport = require('./transport/HFOTransport');
const LPGTransport = require('./transport/LPGTransport');
const PavingAsphaltTransport = require('./transport/pavingAsphaltTransport');
const ATKTransport = require('./transport/ATKTransport');
const RGTransport = require('./transport/RGTransport');
const PGTransport = require('./transport/PGTransport');
const SolidSulphurTransport = require('./transport/solidSulphurTransport');

const U52Note = require('./notes/u52Notes');
const U53Note = require('./notes/u53Notes');
const U54Note = require('./notes/u54Notes');
const U90Note = require('./notes/u90Notes');

// Define associations
User.hasMany(TanksInfo, { foreignKey: 'userId' });
TanksInfo.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Blending, { foreignKey: 'userId' });
Blending.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(HFOBlending, { foreignKey: 'userId' });
HFOBlending.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SolidSulphurProduction, { foreignKey: 'userId' });
SolidSulphurProduction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(CrudeOil, { foreignKey: 'userId' });
CrudeOil.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(NaturalGas, { foreignKey: 'userId' });
NaturalGas.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(DieselPumping, { foreignKey: 'userId' });
DieselPumping.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(KerosenePumping, { foreignKey: 'userId' });
KerosenePumping.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PGPumping, { foreignKey: 'userId' });
PGPumping.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(RGPumping, { foreignKey: 'userId' });
RGPumping.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Unit52Tank, { foreignKey: 'userId' });
Unit52Tank.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Unit53Tank, { foreignKey: 'userId' });
Unit53Tank.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Unit54Storage, { foreignKey: 'userId' });
Unit54Storage.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Unit90Tank, { foreignKey: 'userId' });
Unit90Tank.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(HFOTransport, { foreignKey: 'userId' });
HFOTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(LPGTransport, { foreignKey: 'userId' });
LPGTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PavingAsphaltTransport, { foreignKey: 'userId' });
PavingAsphaltTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ATKTransport, { foreignKey: 'userId' });
ATKTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(RGTransport, { foreignKey: 'userId' });
RGTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PGTransport, { foreignKey: 'userId' });
PGTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SolidSulphurTransport, { foreignKey: 'userId' });
SolidSulphurTransport.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(U52Note, { foreignKey: 'userId' });
U52Note.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(U53Note, { foreignKey: 'userId' });
U53Note.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(U54Note, { foreignKey: 'userId' });
U54Note.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(U90Note, { foreignKey: 'userId' });
U90Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  HttpError,
  TanksInfo,
  Blending,
  HFOBlending,
  SolidSulphurProduction,
  CrudeOil,
  NaturalGas,
  DieselPumping,
  KerosenePumping,
  PGPumping,
  RGPumping,
  Unit52Tank,
  Unit53Tank,
  Unit54Storage,
  Unit90Tank,
  HFOTransport,
  LPGTransport,
  PavingAsphaltTransport,
  ATKTransport,
  PGTransport,
  RGTransport,
  SolidSulphurTransport,
  U52Note,
  U53Note,
  U54Note,
  U90Note,
};
