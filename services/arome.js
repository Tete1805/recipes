const Arome = require('../models/arome');

function upsert(recette) {
  recette.aromes.forEach(async arome => {
    const { nom, marque } = arome;
    await Arome.findOneAndUpdate(
      { nom, marque },
      { nom, marque },
      {
        upsert: true
      }
    ).exec();
  });
}

async function fetch(limit, skip = 0) {
  return await Arome.find()
    .sort('marque')
    .limit(50)
    .skip(skip * limit)
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
