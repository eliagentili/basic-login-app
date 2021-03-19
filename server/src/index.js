// eseguo il file pensato per l'ambiente di test
if (process.env.NODE_ENV !== 'development') {
  const prod = require('./prod');
  return prod();
}

// altrimenti eseguo il file pensato per l'ambiente di produzine
if (process.env.NODE_ENV == 'development') {
  const dev = require('./dev');
  return dev();
}
