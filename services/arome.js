const Arome = require('../models/arome');

const MAX_AROMAS_PER_PAGE = 50;

function upsert(recette) {
  recette.aromes.forEach(async arome => {
    const { nom, marque } = arome;
    await Arome.updateOne(
      { nom, marque },
      { nom, marque },
      {
        upsert: true
      }
    ).exec();
  });
}

async function fetch(skip = 0) {
  return await Arome.find()
    .sort('marque')
    .limit(MAX_AROMAS_PER_PAGE)
    .skip(skip * MAX_AROMAS_PER_PAGE)
    .exec();
}

async function create(_arome) {
  const arome = new Arome();
  arome.marque = _arome.marque;
  arome.nom = _arome.nom;
  arome.description = _arome.description;
  await arome.save();
}

module.exports = { create, fetch, upsert };
