const mongoose = require('mongoose');

class DbService {
  connect() {
    const url = process.env.MONGODB_URL;

    console.log('Establish new connection with url', url);

    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);

    return mongoose.connect(url);
  }
}

module.exports = DbService;
