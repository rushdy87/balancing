const express = require('express');
require('dotenv').config();

const sequelize = require('./utils/database');
const { Unit52Tank, Unit53Tank, Unit90Tank, TanksInfo } = require('./models');

const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World!</h1>');
});

const PORT = process.env.PORT_NUMBER;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
