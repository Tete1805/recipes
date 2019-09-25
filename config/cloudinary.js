const cloudinary = require('cloudinary').v2;

function upload(fileName, userName) {
  const options = {
    tags: 'user_avatar',
    folder: 'users/',
    public_id: userName,
    width: 200,
    height: 150,
    crop: 'scale',
    format: 'jpg'
  };

  // File upload from Cloudinary docs
  cloudinary.uploader.upload(fileName, options, function(err, image) {
    console.log('** File Upload');
    if (err) {
      console.warn(err);
    }
    console.log(
      "* public_id for the uploaded image is generated by Cloudinary's service."
    );
    console.log('* ' + image.public_id);
    console.log('* ' + image.url);
  });
}

module.exports = { upload };
