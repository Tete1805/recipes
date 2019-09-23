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

recetteSchema.methods.comment = function(user, corps) {
  var fields = {
    auteur: user,
    corps: corps
  };
  // L'opérateur de mise à jour [`$push`](http://docs.mongodb.org/manual/reference/operator/update/push/#up._S_push)
  // permet l'ajout à une propriété tableau. Rappel : l`appel de `.exec()` sans argument sur un objet `Query` de
  // Mongoose le transforme en promesse.
  return this.update({ $push: { comments: fields } }).exec();
};

// create the model and expose it to our app
module.exports = mongoose.model('Recette', recetteSchema);
