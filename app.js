const express = require('express');
require('dotenv').config();

const sequelize = require('./utils/database');
const {
  tanksInfoRoutes,
  u52TanksRoutes,
  u53TanksRoutes,
  u90TanksRoutes,
  allTanksRoutes,
} = require('./Routes');

const app = express();

app.use(express.json());

// ROUTES
app.use('/api/u52', u52TanksRoutes);
app.use('/api/u53', u53TanksRoutes);
app.use('/api/u90', u90TanksRoutes);
app.use('/api/all', allTanksRoutes);
app.use('/api/tanks-info', tanksInfoRoutes);

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World!</h1>');
});

// Error handling medilware
// This functon will execute when any middleware in front of it yield an erroe
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

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
