const cloudinary = require('cloudinary').v2;
const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');

class Profile {
  constructor(pseudo) {
    this.pseudo = pseudo;
  }
  async getProfile() {
    try {
      const { avatar, email } = await this.getDetails();
      return {
        pseudo: this.pseudo,
        login: this.pseudo,
        email,
        avatar,
        recipes: {
          count: await this.getRecettesCount(),
          tops: await this.getTopRecettes()
        },
        aromas: { count: await this.getAromesCount() },
        likes: {
          received: await this.getLikesReceived(),
          given: await this.getLikedRecettesCount()
        }
      };
    } catch (exception) {
      throw new Error("Je n'ai pas trouvé cet utilisateur.");
    }
  }
  async getDetails() {
    return await User.findOne({ 'local.pseudo': this.pseudo }).exec();
  }
  async getRecettesCount() {
    return await Recette.count({ auteur: this.pseudo }).exec();
  }
  async getAromesCount() {
    return await Arome.count({ users: this.pseudo }).exec();
  }
  async getTopRecettes() {
    return await Recette.aggregate([
      { $match: { auteur: this.pseudo } },
      { $sort: { likes: -1 } },
      { $limit: 3 }
    ]).exec();
  }
  async getLikedRecettesCount() {
    return await Recette.count({ likes: this.pseudo }).exec();
  }
  async getLikesReceived() {
    const likes = await Recette.aggregate([
      { $match: { auteur: this.pseudo } },
      { $group: { _id: '$auteur', total: { $sum: { $size: '$likes' } } } },
      { $sort: { total: -1 } }
    ]);
    return likes[0].total;
  }
}

async function newAvatar(pseudo, image) {
  const response = await cloudinary.upload(image);
  const user = User.findOne({ pseudo });
  await user.update({ avatar: response });
}

module.exports = { Profile, newAvatar };
