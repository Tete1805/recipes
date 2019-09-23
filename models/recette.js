// app/models/recette.js
var mongoose = require('mongoose');

// define the schema for our model
var recetteSchema = mongoose.Schema({
  nom: String,
  ajoute: { type: Date, default: Date.now },
  auteur: String,
  bases: [
    {
      ratio: String,
      nicotine: Number,
      pourcentage: Number
    }
  ],
  aromes: [
    {
      // nom: { type: mongoose.Schema.Types.ObjectId, ref: 'Arome' },
      marque: String,
      nom: String,
      pourcentage: Number
    }
  ],
  maturation: Number,
  notes: String,
  shortUrl: String,
  hashtags: [String],
  comments: [
    {
      auteur: String,
      ajoute: { type: Date, default: Date.now },
      corps: String
    }
  ],
  likes: [String]
});

// create the model and expose it to our app
module.exports = mongoose.model('Recette', recetteSchema);
