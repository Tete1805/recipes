const cloudinary = require('cloudinary').v2;

class Avatar {
  constructor(pseudo) {
    this.pseudo = pseudo;
  }
  async upload(data) {
    const response = await cloudinary.uploader.upload(data, {
      folder: 'users/',
      public_id: this.pseudo,
      overwrite: true,
      tags: 'user_avatar',
      width: 150,
      height: 150,
      crop: 'scale'
    });
    return response.url;
  }
}

module.exports = Avatar;
