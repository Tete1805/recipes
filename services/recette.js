const Recette = require('../models/recette'),
  formatHashtags = require('../utils/formatHashtags'),
  { getShortUrl } = require('../config/bitly');

module.exports = { findByIdOrDefault, update, like };

async function findByIdOrDefault(id) {
  const recette = await Recette.findOne({ _id: id });
  return recette || new Recette();
}

async function update(recette, request, auteur) {
  recette.auteur = auteur;
  recette.nom = request.nom;
  recette.notes = request.notes;
  recette.maturation = request.maturation;
  recette.aromes = [];
  recette.bases = [];
  recette.likes = [];

  recette.hashtags = formatHashtags(request.hashtags);

  request['base-ratio'].forEach((base, index) =>
    recette.bases.push({
      ratio: request['base-ratio'][index],
      nicotine: request['base-nicotine'][index],
      pourcentage: request['base-pourcentage'][index]
    })
  );

  request['arome-marque'].forEach((arome, index) =>
    recette.aromes.push({
      marque: request['arome-marque'][index],
      nom: request['arome-nom'][index],
      pourcentage: request['arome-pourcentage'][index]
    })
  );

  if (!recette.shortUrl) {
    recette.shortUrl = await getShortUrl(recette._id);
  }

  await recette.save();
}

async function like(recette, user) {
  recette.likes = recette.likes || [];
  if (!recette.likes.contains(user)) {
    recette.likes.push(user);
  }
  await recette.save();
}