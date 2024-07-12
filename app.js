const express = require('express');
require('dotenv').config();

const sequelize = require('./database');

const {
  unsupportedRoutes,
  checkAuth,
  errorHandling,
} = require('./middlewares');

const { AuthRoutes } = require('./routes');

const app = express();

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
// app.use(checkAuth);
// app.use('/api/u52', u52Routes);
// app.use('/api/u53', u53Routes);
// app.use('/api/u54', u54Routes);
// app.use('/api/u90', u90Routes);
// app.use('/api/reports', reportsRoutes);
// app.use('/api/tanks-info', tanksInfoRoutes);
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
