const Recette = require('../models/recette'),
  formatHashtags = require('../utils/formatHashtags'),
  { getShortUrl } = require('../config/bitly');

const RecetteService = {
  findByIdOrDefault,
  update,
  deleteById,
  comment
};

const RecetteServiceAPI = {
  find: _id => {
    return Recette.findOne({ _id })
      .then(recette => ({ status: 200, data: recette }))
      .catch(exception => ({ status: 400, data: exception }));
  },
  post: ({ auteur, data }) => {
    return update({ id: null, auteur, data })
      .then(id => ({ status: 200, data: id }))
      .catch(exception => ({ status: 400, data: exception }));
  },
  update: ({ id, auteur, data }) => {
    return update({ id, auteur, data })
      .then(id => ({ status: 200, data: id }))
      .catch(exception => ({ status: 400, data: exception }));
  }
};

module.exports = { RecetteService, RecetteServiceAPI };

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
  const recette = await findByIdOrDefault(id);
  await recette.save();
  await recette.updateOne(payload);
  if (!shortUrl) setShortUrlForId(recette._id);
  return recette._id;
}

async function deleteById(id) {
  await Recette.deleteOne({ _id: id });
}

async function comment(recette, user, corps) {
  recette.comments.push({ auteur: user, corps: corps });
  await recette.save();
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
