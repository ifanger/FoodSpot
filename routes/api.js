var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

router.get('/comment', function(req, res, next) {
  const restaurantId = req.query.restaurant;

  if (!restaurantId) {
    res.send({message: 'Restaurante nao encontrado'})
    return;
  }

  res.send({message: restaurantId})
});

router.post('/comment', function(req, res, next) {
  res.send({message: 'Nada pra fazer aqui'})
});

module.exports = router;
