module.exports = { getFilterFromParams, getFilterForRecettes };

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

function getFilterForRecettes({ search, fields }) {
  if (!search) return {};
  if (!fields) return { $regex: search, $options: 'gi' };

  const filter = { $or: [] };
  fields.forEach(field => {
    if (['nom', 'auteur', 'hashtags', 'notes'].includes(field)) {
      filter['$or'].push({ [field]: { $regex: search, $options: 'gi' } });
    }
    if (field === 'aromes') {
      filter['$or'].push(
        { 'aromes.nom': { $regex: search, $options: 'gi' } },
        {
          'aromes.marque': { $regex: search, $options: 'gi' }
        }
      );
    }
  });

  return filter;
}
