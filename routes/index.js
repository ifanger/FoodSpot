var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var params = {
  title: 'Food Spot'
}

router.get('/', function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/foodspot", function(error, client) {
    if (!error) {
      const db = client.db('foodspot');
      const restaurants = db.collection('restaurants');

      const list = restaurants.find({}).limit(10);
      
      params.restaurants = list;
      res.send(params);
      return;
      res.render('index', params);
    } else {
      res.send({message: 'Falha ao conectar-se com banco.'})
    }
  })

});

module.exports = router;
