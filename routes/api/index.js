const express = require('express');
const router = express.Router();
const recette = require('./recette');
const list = require('./list');

router.use('/recette', recette);
router.use('/list', list);

module.exports = router;
