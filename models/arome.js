// app/models/recette.js
var mongoose = require('mongoose');

// define the schema for our model
var aromeSchema = mongoose.Schema({
  marque: String,
  ajoute: {
    type: Date,
    default: Date.now
  },
  nom: String,
  description: String,
  users: [String]
});

var Arome = mongoose.model('Arome', aromeSchema);

// create the model and expose it to our app
module.exports = Arome;
