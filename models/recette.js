// app/models/recette.js
var mongoose = require('mongoose'),
  bitly = require('../config/bitly'),
  formatHashtags = require('../utils/formatHashtags');

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

recetteSchema.methods.parse = function(req) {
  // On récupère les éléments de la recette passés dans la requêtes ou le corps de la requête
  this.nom = req.body.nom;
  this.auteur = req.user.local.pseudo;
  this.notes = req.body.notes;
  this.maturation = req.body.maturation;
  this.aromes = [];
  this.bases = [];
  this.likes = [];

  // Les hashtags ne peuvent contenir que des lettres, des chiffres, des # (qu'on supprime) et des espaces entre eux
  this.hashtags = formatHashtags(req.body.hashtags);

  var bases = {};
  ['ratio', 'nicotine', 'pourcentage'].forEach(e => {
    bases[e] = [].concat(req.body['base-' + e]);
  });

  for (var i = 0; i < bases.ratio.length; i++) {
    this.bases.push({
      ratio: bases.ratio[i],
      nicotine: bases.nicotine[i],
      pourcentage: bases.pourcentage[i]
    });
  }

  var aromes = {};
  ['marque', 'nom', 'pourcentage'].forEach(e => {
    aromes[e] = [].concat(req.body['arome-' + e]);
  });

  for (var i = 0; i < aromes.marque.length; i++) {
    this.aromes.push({
      marque: aromes.marque[i],
      nom: aromes.nom[i],
      pourcentage: aromes.pourcentage[i]
    });
  }

  if (!this.shortUrl) {
    bitly
      .shorten(
        'http://diyrecipes.herokuapp.com/recette/' + this._id + '/detail'
      )
      .then(result => {
        this.shortUrl = result.data.url;
        this.save(err => {
          console.log('Erreur en sauvant la recette: ', this._id);
        });
      });
  }

  return this;
};

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

recetteSchema.methods.like = function(user) {
  // L'opérateur de mise à jour [`$push`](http://docs.mongodb.org/manual/reference/operator/update/push/#up._S_push)
  // permet l'ajout à une propriété tableau. Rappel : l`appel de `.exec()` sans argument sur un objet `Query` de
  // Mongoose le transforme en promesse.
  this.likes = this.likes || [];
  if (this.likes.indexOf(user) === -1) {
    this.likes.push(user);
  }
  return this;
};

// create the model and expose it to our app
module.exports = mongoose.model('Recette', recetteSchema);
