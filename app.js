const express = require('express');
require('dotenv').config();
const bcryptjs = require('bcryptjs');

const sequelize = require('./utils/database');
const {
  tanksInfoRoutes,
  u52Routes,
  u53TanksRoutes,
  u90TanksRoutes,
  allTanksRoutes,
  UsersRoutes,
  AuthRoutes,
} = require('./routes');
const { unsupportedRoutes, checkAuth } = require('./middlewares');
const { errorHandling } = require('./middlewares/error-handling');

const app = express();

// const { addTanksInfo } = require('./testing/addTanksInfo');
// app.use(addTanksInfo);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

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
app.use('/api/u52', u52Routes);
// app.use('/api/u53', u53TanksRoutes);
// app.use('/api/u90', u90TanksRoutes);
// app.use('/api/all', allTanksRoutes);
app.use('/api/tanks-info', tanksInfoRoutes);
// app.use('/api/users', UsersRoutes);

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
