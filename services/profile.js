const cloudinary = require('cloudinary').v2;
const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');

async function getProfile(pseudo) {
  const details = await User.findOne({ 'local.pseudo': pseudo }).exec();
  const recettes = await Recette.find({ auteur: pseudo }).exec();
  const aromes = await Arome.find({ users: pseudo }).exec();
  const liked = await Recette.find({ likes: pseudo }).exec();
  return { details, recettes, aromes, liked };
}

async function newAvatar(pseudo, image) {
  const response = await cloudinary.upload(image);
  const user = User.findOne({ pseudo });
  await user.update({ avatar: response });
}

module.exports = { getProfile, newAvatar };
