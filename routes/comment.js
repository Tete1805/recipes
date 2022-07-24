const express = require('express');
const router = express.Router();
const authRequired = require('./authRequired');
const { CommentService } = require('../services/comment');

router.post('/recette/:id', authRequired, (req, res) => {
  try {
    const _id = req.params.id;
    const auteur = req.user.local.pseudo;
    const corps = req.body.comment;
    CommentService['recette'].comment({ _id, auteur, corps });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
