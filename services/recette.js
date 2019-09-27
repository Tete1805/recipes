const Recette = require('../models/recette'),
  formatHashtags = require('../utils/formatHashtags'),
  { getShortUrl } = require('../config/bitly');

module.exports = { findByIdOrDefault, update, like, unlike, comment };

async function findByIdOrDefault(id) {
  const recette = await Recette.findOne({ _id: id });
  return recette || new Recette();
}

async function update({ recette, auteur, data }) {
  recette.auteur = auteur;
  recette.nom = data.nom;
  recette.notes = data.notes;
  recette.maturation = data.maturation;
  recette.aromes = [];
  recette.bases = [];
  recette.likes = [];

  recette.hashtags = formatHashtags(data.hashtags);

  data['base-ratio'].forEach((base, index) =>
    recette.bases.push({
      ratio: data['base-ratio'][index],
      nicotine: data['base-nicotine'][index],
      pourcentage: data['base-pourcentage'][index]
    })
  );

  data['arome-marque'].forEach((arome, index) =>
    recette.aromes.push({
      marque: data['arome-marque'][index],
      nom: data['arome-nom'][index],
      pourcentage: data['arome-pourcentage'][index]
    })
  );

  if (!recette.shortUrl) {
    const shortUrl = await getShortUrl(recette._id);
    recette.shortUrl = shortUrl.url;
  }

  await recette.save();
}

async function like(recette, user) {
  recette.likes = recette.likes || [];
  if (!recette.likes.includes(user)) {
    recette.likes = recette.likes.concat(user);
  }
  await recette.save();
}

async function unlike(recette, user) {
  recette.likes = recette.likes || [];
  if (recette.likes.includes(user)) {
    recette.likes = recette.likes.filter(name => name != user);
  }
  await recette.save();
}

async function comment(recette, user, corps) {
  recette.comments.push({ auteur: user, corps: corps });
  await recette.save();
}
