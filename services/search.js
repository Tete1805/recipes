module.exports = { getFilterFromParams };

function getFilterFromParams(params) {
  const search = {};
  if (params.searchField === 'auteur') {
    search[params.searchField] = params.searchString;
  } else if (params.searchField !== 'all') {
    search[params.searchField] = {
      $regex: params.searchString,
      $options: 'gi'
    };
  } else {
    search.$or = [
      { nom: { $regex: params.searchString, $options: 'gi' } },
      { hashtags: { $regex: params.searchString, $options: 'gi' } },
      { 'aromes.nom': { $regex: params.searchString, $options: 'gi' } },
      {
        'aromes.marque': { $regex: params.searchString, $options: 'gi' }
      },
      { notes: { $regex: params.searchString, $options: 'gi' } },
      { auteur: params.searchString }
    ];
  }
  return search;
}
