const Arome = require('../models/arome'),
  Recette = require('../models/recette');

const MAX_RECIPES_PER_PAGE = 8;

function list(type) {
  switch (type) {
    case 'recettes':
      return listRecettes();
    case 'aromes':
      return Arome.find();
    case 'users':
      return [];
  }
}

function listRecettes() {
  return {
    getPage: async page => {
      return await Recette.find({ nom: { $exists: true } })
        .skip((page - 1) * MAX_RECIPES_PER_PAGE)
        .limit(MAX_RECIPES_PER_PAGE)
        .exec();
    }
  };
}

module.exports = { list };
