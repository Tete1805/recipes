// app/models/recette.js
var mongoose = require('mongoose');

// define the schema for our model
var aromeSchema = mongoose.Schema({

    marque        : String,
    ajoute        : {
      type        : Date,
      default     : Date.now
    },
    nom           : String,
    description   : String,
    users         : [String]

});

aromeSchema.statics.updateWithReq = function(req) {

  var aromesMarque = [].concat(req.body['arome-marque']);
  var aromesNom = [].concat(req.body['arome-nom']);

  for (i = 0; i < aromesMarque.length; i++) {
    var aromeToFind = { marque: aromesMarque[i], nom: aromesNom[i] };
    this.findOneAndUpdate(aromeToFind, aromeToFind, { upsert: true }).exec();
  }
}

var Arome = mongoose.model('Arome', aromeSchema);

// create the model and expose it to our app
module.exports = Arome;