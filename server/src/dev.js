const path = require('path');
const secure = require('ssl-express-www');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

/**
 * Establish DB connection
 */
const DbService = require('./shared/services/db.service');
const db = new DbService();
db.connect()
  .then((response) => console.log('Connected to DB'))
  .catch((error) =>
    console.log('An error occurs while connecting to the DB', error)
  );

/**
 * Load all routes
 */
const userRouter = require('./features/users/users-routing');

/**
 * Initialize express app
 */
const app = express();
const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, '../../client/dist');

const initApp = async () => {
  app.use(express.static(publicDirectoryPath));
  app.use(compression());
  app.use(secure);
  app.use(cors());
  app.use(express.json());

  app.use(userRouter);

  // Va obbligatoriamente per ultima per poter essere utilizzata come
  // fallback per tutte le route non trovate
  app.all('/api/*', (req, res) => {
    res.redirect('/');
  });

  // ---- SERVE STATIC FILES ---- //
  app.get('*.*', express.static(publicDirectoryPath, { maxAge: '1y' }));

  // ---- SERVE APLICATION PATHS ---- //
  app.all('*', (req, res) => {
    res.status(200).sendFile(`/`, { root: publicDirectoryPath });
  });

  app.listen(port, () => {
    console.log('Server is up on http://localhost:' + port);
  });
};

module.exports = initApp;
