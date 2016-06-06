// app/models/recette.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var recetteSchema = mongoose.Schema({

    nom: String,
    ajoute: { type: Date, default: Date.now },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bases: [
        {
            pg: Number,
            vg: Number,
            taux: Number,
            pourcentage: Number
        }
    ],
    aromes: [
        {
            nom: { type: mongoose.Schema.Types.ObjectId, ref: 'Arome' },
            pourcentage: Number
        }
    ],
    maturation: Number,
    notes: String,
    hashtags: [String]

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Recette', recetteSchema);