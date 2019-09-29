const Recette = require('../models/recette');
const formatHashtags = require('../utils/formatHashtags');
const { getShortUrl } = require('../config/bitly');
const { AromeService } = require('../services/arome');

const RecetteService = {
  findById,
  getDefault,
  post,
  update,
  deleteById
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

function getDefault() {
  return new Recette();
}

function findById(_id) {
  return Recette.findOne({ _id });
}

async function post({ auteur, data }) {
  const recette = new Recette();
  await recette.save();
  setShortUrlForId(recette._id);
  return await formatAndUpdate({ recette, auteur, data });
}

async function update({ auteur, data }) {
  const recette = await findById(data._id);
  return await formatAndUpdate({ recette, auteur, data });
}

async function deleteById(id) {
  await Recette.deleteOne({ _id: id });
}

async function setShortUrlForId(_id) {
  getShortUrl(_id).then(({ url }) =>
    Recette.updateOne({ _id }, { shortUrl: url })
  );
}

async function formatAndUpdate({ recette, auteur, data }) {
  const payload = getPayload({ auteur, data });
  await recette.update(payload);
  AromeService.updateBase(recette);
  return recette._id;
}

function getPayload({ auteur, data }) {
  const { nom, notes, maturation, hashtags, shortUrl, _id } = data;
  return {
    auteur,
    nom,
    notes,
    maturation,
    aromes: getAromesFromData(data),
    bases: getBasesFromData(data),
    hashtags: formatHashtags(hashtags),
    shortUrl
  };
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
