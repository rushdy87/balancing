const express = require('express');
require('dotenv').config();
const bcryptjs = require('bcryptjs');

const sequelize = require('./utils/database');
const {
  tanksInfoRoutes,
  u52TanksRoutes,
  u53TanksRoutes,
  u90TanksRoutes,
  allTanksRoutes,
  UsersRoutes,
  AuthRoutes,
} = require('./routes');
const { unsupportedRoutes, checkAuth } = require('./middlewares');
const { errorHandling } = require('./middlewares/error-handling');

const app = express();

// const { TanksInfo } = require('./models');
// app.use(async (req, res, next) => {
//   await TanksInfo.bulkCreate([
//     {
//       tag_number: 'TK-52-401A',
//       product: 'Regular Gasoline',
//       bottom: 1,
//       factor: 765,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-401B',
//       product: 'Regular Gasoline',
//       bottom: 1,
//       factor: 765,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-401C',
//       product: 'Regular Gasoline',
//       bottom: 1,
//       factor: 765,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-402A',
//       product: 'Premium Gasoline',
//       bottom: 1,
//       factor: 765,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-402B',
//       product: 'Premium Gasoline',
//       bottom: 1,
//       factor: 765,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-402C',
//       product: 'Premium Gasoline',
//       bottom: 1,
//       factor: 765,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-403A',
//       product: 'Kerosene',
//       bottom: 1,
//       factor: 474,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-403B',
//       product: 'Kerosene',
//       bottom: 1,
//       factor: 474,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-403C',
//       product: 'Kerosene',
//       bottom: 1,
//       factor: 474,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-404A',
//       product: 'ATK',
//       bottom: 1,
//       factor: 519,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-404B',
//       product: 'ATK',
//       bottom: 1,
//       factor: 519,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-404C',
//       product: 'ATK',
//       bottom: 1,
//       factor: 519,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-405A',
//       product: 'Diesel',
//       bottom: 1,
//       factor: 979,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-405B',
//       product: 'Diesel',
//       bottom: 1,
//       factor: 979,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-405C',
//       product: 'Diesel',
//       bottom: 1,
//       factor: 979,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-406A',
//       product: 'Heavy Diesel',
//       bottom: 1,
//       factor: 224,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-406B',
//       product: 'Heavy Diesel',
//       bottom: 1,
//       factor: 224,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-406C',
//       product: 'Heavy Diesel',
//       bottom: 1,
//       factor: 224,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-409A',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-409B',
//       product: 'LPG',
//       // bottom:1,factor: 0,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-409C',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-409D',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-409E',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-409F',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-408A',
//       product: 'HFO',
//       bottom: 1,
//       factor: 2218,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-408B',
//       product: 'HFO',
//       bottom: 1,
//       factor: 2218,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-52-408C',
//       product: 'HFO',
//       bottom: 1,
//       factor: 2218,
//       unit: 'U52',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-53-001A',
//       product: 'Paving Asphalt',
//       bottom: 1,
//       factor: 0,
//       unit: 'U53',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-53-001B',
//       product: 'Paving Asphalt',
//       bottom: 1,
//       factor: 0,
//       unit: 'U53',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-53-001C',
//       product: 'Paving Asphalt',
//       bottom: 1,
//       factor: 0,
//       unit: 'U53',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-53-001D',
//       product: 'Paving Asphalt',
//       bottom: 1,
//       factor: 0,
//       unit: 'U53',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-53-001E',
//       product: 'Paving Asphalt',
//       bottom: 1,
//       factor: 0,
//       unit: 'U53',
//       userId: 1,
//     },

//     {
//       tag_number: 'TK-90-001A',
//       product: 'Regular Gasoline',
//       bottom: 1,
//       factor: 930,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-001B',
//       product: 'Regular Gasoline',
//       bottom: 1,
//       factor: 930,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-001C',
//       product: 'Regular Gasoline',
//       bottom: 1,
//       factor: 930,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-002A',
//       product: 'Premium Gasoline',
//       bottom: 1,
//       factor: 930,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-002B',
//       product: 'Premium Gasoline',
//       bottom: 1,
//       factor: 930,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-002C',
//       product: 'Premium Gasoline',
//       bottom: 1,
//       factor: 930,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-003A',
//       product: 'Kerosene',
//       bottom: 1,
//       factor: 502,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-003B',
//       product: 'Kerosene',
//       bottom: 1,
//       factor: 502,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-003C',
//       product: 'Kerosene',
//       bottom: 1,
//       factor: 502,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-004A',
//       product: 'ATK',
//       bottom: 1,
//       factor: 527,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-004B',
//       product: 'ATK',
//       bottom: 1,
//       factor: 527,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-004C',
//       product: 'ATK',
//       bottom: 1,
//       factor: 527,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-005A',
//       product: 'Diesel',
//       bottom: 1,
//       factor: 1383,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-005B',
//       product: 'Diesel',
//       bottom: 1,
//       factor: 1383,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-005C',
//       product: 'Diesel',
//       bottom: 1,
//       factor: 1383,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-006A',
//       product: 'Heavy Diesel',
//       bottom: 1,
//       factor: 224,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-006B',
//       product: 'Heavy Diesel',
//       bottom: 1,
//       factor: 224,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-008A',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-008B',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-008C',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-008D',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-008E',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U90',
//       userId: 1,
//     },
//     {
//       tag_number: 'TK-90-008F',
//       product: 'LPG',
//       bottom: 1,
//       factor: 0,
//       unit: 'U90',
//       userId: 1,
//     },
//   ]);
//   next();
// });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.json());

// const { User } = require('./models');
// app.get('/', async (req, res) => {
//   const user = await User.create({
//     username: 'john_doe',
//     password: bcryptjs.hashSync('password', 10),
//     name: 'John Doe',
//     role: '0',
//   });
//   res.json(user);
// });

// ROUTES
app.use('/api/auth', AuthRoutes);
app.use(checkAuth);
app.use('/api/u52', u52TanksRoutes);
app.use('/api/u53', u53TanksRoutes);
app.use('/api/u90', u90TanksRoutes);
app.use('/api/all', allTanksRoutes);
app.use('/api/tanks-info', tanksInfoRoutes);
app.use('/api/users', UsersRoutes);

// This medilware handle unsupported Routes
app.use(unsupportedRoutes);

// Error handling medilware
// This functon will execute when any middleware in front of it yield an erroe
app.use(errorHandling);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    const PORT = process.env.PORT_NUMBER;
    app.listen(PORT, () => {
      console.log(`The server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
