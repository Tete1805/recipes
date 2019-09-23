const { BitlyClient } = require('bitly');

const bitly = new BitlyClient('cee54271ec940460096c29dfb72644a5f3ad7be4');

function getShortUrl(recette) {
  return bitly.shorten(
    'http://diyrecipes.herokuapp.com/recette/' + recette._id + '/detail'
  );
}

module.exports = { getShortUrl };
