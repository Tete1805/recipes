const { BitlyClient } = require('bitly');

const bitly = new BitlyClient(process.env.BITLY_KEY);

function getShortUrl(id) {
  return bitly.shorten('https://diyrecipes.cloudno.de/recette/' + id);
}

module.exports = { getShortUrl };
