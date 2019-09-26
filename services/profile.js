const User = require('../models/user');
const cloudinary = require('cloudinary').v2;

async function newAvatar(pseudo, image) {
  const response = await cloudinary.upload(image);
  const user = User.findOne({ pseudo });
  await user.update({ avatarUrl: response });
}

module.exports = { newAvatar };
