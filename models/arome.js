// app/models/recette.js
const mongoose = require('mongoose');

// define the schema for our model
const aromeSchema = mongoose.Schema({
  marque: String,
  ajoute: {
    type: Date,
    default: Date.now
  },
  nom: String,
  description: String,
  users: [String]
});

const Arome = mongoose.model('Arome', aromeSchema);

// create the model and expose it to our app
module.exports = Arome;
