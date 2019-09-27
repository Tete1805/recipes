const Arome = require('../models/arome');

const MAX_AROMAS_PER_PAGE = 100;

async function upsert(recette) {
  const bulkAromes = recette.aromes.map(arome => {
    const { nom, marque } = arome;
    return {
      updateOne: {
        filter: { nom, marque },
        update: { nom, marque },
        upsert: true
      }
    };
  });
  await Arome.bulkWrite(bulkAromes);
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
