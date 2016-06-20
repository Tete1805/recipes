// app/models/recette.js
var mongoose = require('mongoose');

// define the schema for our model
var recetteSchema = mongoose.Schema({

    nom: String,
    ajoute: { type: Date, default: Date.now },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    hashtags: [String]

});

recetteSchema.methods.parse = function(req) {

    this.nom = req.body.nom;
    this.auteur = req.user;
    this.notes = req.body.notes;
    this.maturation = req.body.maturation;
    this.hashtags = req.body.hashtags.replace(/[^a-zA-Z0-9\#\s]*/g, '').split(' ').filter(function(elm) { return elm.length > 0 ? true : false })
    this.aromes = [];
    this.bases = [];
    this.shortUrl = req.shortUrl;

    var basesRatio = [].concat(req.body['base-ratio']);
    var basesNicotine = [].concat(req.body['base-nicotine']);
    var basesPourcentage = [].concat(req.body['base-pourcentage']);

    for (var i = 0; i < basesRatio.length; i++) {
      this.bases.push({
        ratio: basesRatio[i],
        nicotine: basesNicotine[i],
        pourcentage: basesPourcentage[i]
      })
    }

    var aromesMarque = [].concat(req.body['arome-marque']);
    var aromesNom = [].concat(req.body['arome-nom']);
    var aromesPourcentage = [].concat(req.body['arome-pourcentage']);    

    for (var i = 0; i < aromesMarque.length; i++) {
      this.aromes.push({
        marque: aromesMarque[i],
        nom: aromesNom[i],
        pourcentage: aromesPourcentage[i]
      })
    }

    return this;
}

// create the model and expose it to our app
module.exports = mongoose.model('Recette', recetteSchema);