// app/models/groupe.js
const mongoose = require('mongoose');

// define the schema for our model
const aromeSchema = mongoose.Schema({
  nom: String,
  ajoute: { type: Date, default: Date.now },
  description: String
});

// create the model and expose it to our app
module.exports = mongoose.model('Arome', aromeSchema);
