const express = require('express');
const router = express.Router();
const authRequired = require('../../authRequired');
const { RatingServiceAPI } = require('../../../services/rating');
const ALLOWED_MODELS = ['recette'];
const ALLOWED_ACTIONS = ['like', 'unlike'];

router.post('/:model/:action/:id/', authRequired, async (req, res) => {
  const { model, action, id } = req.params;
  const { pseudo } = req.user.local;
  if (!ALLOWED_MODELS.includes(model) || !ALLOWED_ACTIONS.includes(action)) {
    res.status(400).send('Modèle ou action erroné');
  }
  const result = await RatingServiceAPI[model][action]({ id, pseudo });
  res.status(200).json(result);
});

module.exports = router;
