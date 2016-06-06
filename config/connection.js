// Connexion à mongoDB
// ===================

'use strict';

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://admin:dbpass@ds013270.mlab.com:13270/recipes');

// On prend soin de toujours indiquer si la connexion a échoué, car c’est
// pénible à diagnostiquer sinon.
var db = mongoose.connection;
db.on('error', function() {
  // La propriété `.red` est fournie par le chargement préalable du
  // module `colors` (par `server.js`).
  console.error('✘ CANNOT CONNECT TO mongoDB DATABASE recipes!'.red);
});

// On exporte une fonction d'enregistrement d'un callback de connexion
// réussie, si ça intéresse l'appelant (`server.js` s'en sert pour confirmer
// dans la console que la connexion est prête).
//
// Ce n'est pas anodun, car Mongoose va mettre en file d'attente toute opération
// DB jusqu'à ce que la connexion soit établie, donc vérifier ce dernier point
// est utile.
module.exports = function(onceReady) {
  if (onceReady) {
    db.on('open', onceReady);
  }
};
