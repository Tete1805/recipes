// config/database.js
module.exports = {

  // La chaîne de connexion à la base de données
  'url' : 'mongodb://' + process.env.MLAB_USER + ':' + process.env.MLAB_PWD + '@ds013270.mlab.com:13270/recipes'

};