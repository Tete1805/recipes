const Recette = require('../models/recette');

module.exports = { findByIdOrDefault };

async function findByIdOrDefault(id) {
  const recette = await Recette.findOne({ _id: id });
  return recette || new Recette();
}
