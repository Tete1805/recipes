const express = require('express');
const router = express.Router();
const { RecetteServiceAPI } = require('../../../services/recette');

router.get('/:id', async (req, res, next) => {
  req.result = await RecetteServiceAPI.find(req.params.id);
  next();
});

router.use('/', (req, res) => {
  const { status = 200, data } = req.result;
  res.status(status).json(data);
});

module.exports = router;
