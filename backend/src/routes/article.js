'use strict'

var express = require('express');
var Article = require('../controllers/article');

// Llamo al objeto router de express
var router = express.Router();

// Rutas para los articulos
router.post('/save', Article.save());

router.get('/articles', Article.getArticles());

router.delete('/delete/:id', Article.delete());

module.exports = router;