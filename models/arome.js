// app/models/recette.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var aromeSchema = mongoose.Schema({

    marque: String
    nom: String,
    description: String,
    hashtags: [String],
    vendeurs: [String]

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Arome', aromeSchema);