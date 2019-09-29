const express = require('express');
const router = express.Router();
const recette = require('./recette');
const list = require('./list');
const rating = require('./rating');

router.use('/recette', recette);
router.use('/list', list);
router.use('/rating', rating);

router.use((req, res) => {
  res.status(404).json({ data: "This route doesn't exist in the API." });
});

module.exports = router;
