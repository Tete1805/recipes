const Arome = require('../models/arome');

module.exports = { upsert };

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
