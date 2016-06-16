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
    hashtags: [String]

});

// create the model and expose it to our app
module.exports = mongoose.model('Recette', recetteSchema);