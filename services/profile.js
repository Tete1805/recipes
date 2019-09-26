const Arome = require('../models/arome');
const Recette = require('../models/recette');
const User = require('../models/user');
const Avatar = require('./avatar');

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
    return await Recette.countDocuments({ auteur: this.pseudo }).exec();
  }
  async getAromesCount() {
    return await Arome.countDocuments({ users: this.pseudo }).exec();
  }
  async getTopRecettes() {
    return await Recette.aggregate([
      { $match: { auteur: this.pseudo } },
      { $sort: { likes: -1 } },
      { $limit: 3 }
    ]).exec();
  }
  async getLikedRecettesCount() {
    return await Recette.countDocuments({ likes: this.pseudo }).exec();
  }
  async getLikesReceived() {
    const likes = await Recette.aggregate([
      { $match: { auteur: this.pseudo } },
      { $group: { _id: '$auteur', total: { $sum: { $size: '$likes' } } } },
      { $sort: { total: -1 } }
    ]);
    return likes[0].total;
  }

  async update({ email, avatar, avatarImageBase64 }) {
    if (avatarImageBase64) {
      const avatarService = new Avatar(this.pseudo);
      avatar = await avatarService.upload(avatarImageBase64);
    }
    await User.updateOne(
      { 'local.pseudo': this.pseudo },
      { email, avatar }
    ).exec();
  }
}

module.exports = { Profile };
