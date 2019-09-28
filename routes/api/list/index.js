const express = require('express');
const router = express.Router();
const { ListServiceAPI } = require('../../../services/list');
const ALLOWED_ROUTES = /\/(recettes|aromes|users)/;

router.get(ALLOWED_ROUTES, async (req, res, next) => {
  const APIService = await ListServiceAPI(req.params[0]);
  const recettes = await APIService.setLimit(0).get();
  req.result = { data: recettes };
  next();
});

router.use(ALLOWED_ROUTES, (req, res) => {
  const { status = 200, data } = req.result;
  res.status(status).json(data);
});

module.exports = router;
