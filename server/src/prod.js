const path = require('path');
const secure = require('ssl-express-www');
const express = require('express');
const cors = require('cors');

require('./db/mongoose');

const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, '../../client/dist');

const prod = async () => {
  app.use(secure);
  app.use(express.static(publicDirectoryPath));
  app.use(cors());
  app.use(express.json());

  app.use(userRouter);

  app.listen(port, () => {
    console.log('Server is up on port ' + port);
  });
};

module.exports = prod;
