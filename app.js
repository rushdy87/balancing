const express = require('express');
require('dotenv').config();

const sequelize = require('./utils/database');
const {
  tanksInfoRoutes,
  u52TanksRoutes,
  u53TanksRoutes,
  u90TanksRoutes,
  allTanksRoutes,
  UsersRoutes,
  AuthRoutes,
} = require('./Routes');
const { unsupportedRoutes, checkAuth } = require('./middlewares');
const { errorHandling } = require('./middlewares/error-handling');

const app = express();

app.use(express.json());

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
