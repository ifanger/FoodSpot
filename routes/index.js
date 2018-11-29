var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var params = {
  title: 'Food Spot',
  getImage: function (name) {
    return name + ' 123';
  },
  getRate: function (rates) {
    if (rates.length == 0) return 0;

    var sum = 0;
    for (var i = 0; i < rates.length; i++) {
      sum += rates[i];
    }

    var med = sum / rates.length;

    if (med < 4)
      med = med + 1

    med = med * 10;
    med = Math.ceil(med);
    med = med * 1.0;
    med = med / 10;

    return med;
  }
}

router.get('/', function(req, res, next) {
  MongoClient.connect("mongodb://localhost:27017/foodspot", function(error, client) {
    if (!error) {
      const db = client.db('foodspot');
      const restaurants = db.collection('restaurants');

      restaurants.find({}).limit(15).toArray(function (e, result) {
        if (e) {
          res.send({message: e.message});
          return;
        }
  
        params.restaurants = result;
        res.render('index', params);
      });
      
    } else {
      res.send({message: 'Falha ao conectar-se com banco.'})
    }
  })

});

module.exports = router;
