const Recette = require('../models/recette');

const RatingServiceAPI = {
  recette: {
    like: ({ id, pseudo }) => {
      return likeRecette(id, pseudo)
        .then(() => ({ status: 200, data: 'Thanks for the rating' }))
        .catch(exception => ({ status: 400, data: exception }));
    },
    unlike: ({ id, pseudo }) => {
      return unlikeRecette(id, pseudo)
        .then(() => ({ status: 200, data: 'Thanks for the rating' }))
        .catch(exception => ({ status: 400, data: exception }));
    }
  }
};

module.exports = { RatingServiceAPI };

async function findById(_id) {
  return await Recette.findOne({ _id });
}

async function likeRecette(id, user) {
  const recette = await findById(id);
  if (!recette.likes.includes(user)) {
    recette.likes = recette.likes.concat(user);
  }
  await recette.save();
}

async function unlikeRecette(id, user) {
  const recette = await findById(id);
  if (recette.likes.includes(user)) {
    recette.likes = recette.likes.filter(name => name != user);
  }
  await recette.save();
}
