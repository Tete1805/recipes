// app/models/groupe.js
var mongoose = require('mongoose');

// define the schema for our model
var aromeSchema = mongoose.Schema({

    nom: String,
    description: String

});

// create the model and expose it to our app
module.exports = mongoose.model('Arome', aromeSchema);