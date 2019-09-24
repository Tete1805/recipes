const Arome = require('../models/arome'),
  Recette = require('../models/recette'),
  MAX_ITEMS_TO_FETCH = 50;

async function list(type) {
  switch (type) {
    case 'recettes':
      return await Recette.find();
  }
}

module.exports = { list };
