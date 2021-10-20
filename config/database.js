// config/database.js
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.MLAB_USER}:${process.env.MLAB_PWD}@${process.env.MLAB_URL}`;

module.exports = { configureDatabase, url };

function configureDatabase() {
  // Permet de spécifier un autre moteur de promesses que mPromise
  mongoose.Promise = global.Promise;

  // Connexion à la base de données
  mongoose
    .set('useNewUrlParser', true)
    .set('useUnifiedTopology', true)
    .connect(url)
    .then(() => console.log('Connected to database.'))
    .catch((error) => console.log("Couldn't connect to database.\n", error));

  return mongoose;
}
