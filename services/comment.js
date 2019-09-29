const Recette = require('../models/recette');

const CommentService = {
  recette: {
    comment
  }
};

module.exports = { CommentService };

async function comment({ _id, auteur, corps }) {
  const recette = await Recette.findOne({ _id });
  recette.comments.push({ auteur, corps });
  return await recette.save();
}
