const express = require('express');
const router = express.Router();
const authRequired = require('./authRequired');
const { CommentService } = require('../services/comment');

router.post('/recette/:id', authRequired, (req, res) => {
  CommentService['recette'].comment(
    req.recette,
    req.user.local.pseudo,
    req.body.comment
  );
  res.redirect('/recette/' + req.params.id);
});
