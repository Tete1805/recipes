const { BitlyClient } = require('bitly');

const bitly = new BitlyClient(process.env.BITLY_KEY);

function getShortUrl(recette) {
  return bitly.shorten(
    'http://diyrecipes.herokuapp.com/recette/' + recette._id + '/detail'
  );
}

module.exports = { getShortUrl };
