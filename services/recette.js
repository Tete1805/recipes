const Recette = require('../models/recette'),
  formatHashtags = require('../utils/formatHashtags'),
  { getShortUrl } = require('../config/bitly');

module.exports = { findByIdOrDefault, update, like, unlike, comment };

async function findByIdOrDefault(id) {
  const recette = await Recette.findOne({ _id: id });
  return recette || new Recette();
}

async function update({ id, auteur, data }) {
  const { nom, notes, maturation, hashtags, shortUrl } = data;
  const payload = {
    auteur,
    nom,
    notes,
    maturation,
    aromes: getAromesFromData(data),
    bases: getBasesFromData(data),
    hashtags: formatHashtags(hashtags),
    shortUrl
  };
  const recette = await Recette.updateOne({ _id: id }, payload);
  if (!shortUrl) setShortUrlForId(id);
  return recette._id;
}

async function setShortUrlForId(_id) {
  getShortUrl(_id).then(({ url }) =>
    Recette.updateOne({ _id }, { shortUrl: url })
  );
}

function getAromesFromData(data) {
  const aromes = [];
  data['arome-marque'].forEach((arome, index) =>
    aromes.push({
      marque: data['arome-marque'][index],
      nom: data['arome-nom'][index],
      pourcentage: data['arome-pourcentage'][index]
    })
  );
  return aromes;
}

function getBasesFromData(data) {
  const bases = [];
  data['base-ratio'].forEach((base, index) =>
    bases.push({
      ratio: data['base-ratio'][index],
      nicotine: data['base-nicotine'][index],
      pourcentage: data['base-pourcentage'][index]
    })
  );
  return bases;
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
