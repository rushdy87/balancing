const User = require('./user');
const Unit52Tank = require('./u52Tanks');
const Unit53Tank = require('./u53Tanks');
const Unit90Tank = require('./u90Tanks');
const TanksInfo = require('./tanks-info');
const HttpError = require('./http-error');

// Define associations
User.hasMany(Unit52Tank, { foreignKey: 'userId' });
Unit52Tank.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Unit53Tank, { foreignKey: 'userId' });
Unit53Tank.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Unit90Tank, { foreignKey: 'userId' });
Unit90Tank.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(TanksInfo, { foreignKey: 'userId' });
TanksInfo.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Unit52Tank,
  Unit53Tank,
  Unit90Tank,
  TanksInfo,
  HttpError,
};
