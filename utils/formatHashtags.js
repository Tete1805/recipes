module.exports = function formatHashtags(hashtags) {
  if (!hashtags || hashtags.length === 0) return [];

  const cleanedHashtags = hashtags.replace(/[^a-zA-Z0-9\s]*/g, '');
  const splittedHashtags = cleanedHashtags.split(' ');
  const formattedHashtags = splittedHashtags.map(e => '#' + e);

  return formattedHashtags;
};
