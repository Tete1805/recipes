var express = require('express');
var router = express.Router();

const accueil = require('./accueil');
const authentication = require('./authentication');
const profile = require('./profile');
const recettes = require('./recettes');
const recette = require('./recette');
const aromes = require('./aromes');
const admin = require('./admin');
const list = require('./list');

router.use('/', accueil);
router.use('/recettes', recettes);
router.use('/recette', recette);
router.use('/aromes', aromes);
router.use('/authentication', authentication);
router.use('/profile', profile);
router.use('/admin', admin);
router.use('/list', list);

module.exports = router;
