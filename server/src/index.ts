// eseguo il file pensato per l'ambiente di test
let initApp = require('./config/init/dev');

// altrimenti eseguo il file pensato per l'ambiente di produzine
if (process.env.NODE_ENV == 'production') {
  initApp = require('./config/init/prod');
}

return initApp();
