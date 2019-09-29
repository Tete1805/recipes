const express = require('express');
const router = express.Router();
const authRequired = require('./authRequired');
const { CommentService } = require('../services/comment');

router.post('/recette/:id', authRequired, (req, res) => {
  const _id = req.params.id;
  const auteur = req.user.local.pseudo;
  const corps = req.body.comment;
  CommentService['recette'].comment({ _id, auteur, corps });
  res.redirect('/recette/' + req.params.id);
});

module.exports = router;
