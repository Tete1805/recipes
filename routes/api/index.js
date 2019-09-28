const express = require('express');
const router = express.Router();
const recette = require('./recette');

router.use('/recette', recette);

module.exports = router;
