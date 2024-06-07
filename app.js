const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World!</h1>');
});

const PORT = process.env.PORT_NUMBER;

app.listen(PORT, () => {
  console.log(`The server listening on port ${PORT}`);
});
