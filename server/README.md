# Basic Login App Server

Questa cartella `Server` include un piccolo server Node.js che utilizza Express e MongoDB per gestire il login di utenti.

## Architettura

Tutti i file sono inclusi nella cartella `src` che è strutturata così:

- `/config`: contiene i file `.env` necessari per avviare il server con le corrette variabili d'ambiente
- `/db`: contiene la configurazione necessaria ad aprire la connessione con il DB Mongo
- `/middleware`: contiene tutti i middleware dell'app, di base `auth` e `permit` necessari per verificare se l'utente è loggato e se ha il permesso di accedere ad una specifica route
- `/model`: contiene gli Schemas Mongoose
- `/routers`: contene le routes di ciascuno model, di base `user`
- `dev.js`: file eseguito in ambiente di test
- `index.js`: file principale dell'app che, in base alla variabile d'ambiene `NODE_ENV`, esegue la funzione `dev()` o `prod()` caricate dai rispettivi file
- `prod.js`: file eseguito in ambiente di produzione

## Config

Creare all'interno della cartella il file `dev.env` contenente le variabili d'ambiente necessarie al corretto funzionamento dell'app.

### Variabili minime necessarie

```
NODE_ENV=development
JWT_SECRET=1234567890abcdefghijklmnopqrstuvwxyz
MONGODB_URL=mongodb://localhost:27017/app
PORT=3000
```

Dove:

- `NODE_ENV` è la variabile che definisce se ci si trova in ambiente di test (development) o di produzione (production)
- `JWT_SECRET` è la chiave segreta necessaria per la generazione dei token JWT
- `MONGODB_URL` URL del database Mongo, in locale, dovrebbe essere sempre `mongodb://localhost:27017/` + il nome del db
- `PORT` la porta su cui eseguire il server Express

## Installazione

Per iniziare ad utilizzare il server è necessario seguire questi step:

- `npm i` per installare tutte le dipendenze
- creare il file `dev.env` all'interno della cartella `src/config` con le variabili d'ambiente minime necessarie (vedi sezione precedente)
- eseguire il server con il comando `npm run dev`
