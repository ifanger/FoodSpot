var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var params = {
  title: 'Food Spot',
  getImage: function (name) {
    var fileName = "default.jpg";

    if (name == "McDonald's") {
      fileName = "mcdonalds_logo.jpg";
    } else if (name == "Arby's") {
      fileName = "arbys_logo.jpg";
    } else if (name == "Burger King") {
      fileName = "bk_logo.jpg";
    } else if (name == "BurgerKing") {
      fileName = "bk_logo.jpg";
    } else if (name == "Domino's Pizza") {
      fileName = "dominos_logo.jpg";
    } else if (name == "Frisch's Big Boy") {
      fileName = "frischs_bigboy_logo.jpg";
    } else if (name == "McDonald's") {
      fileName = "hungryjack_logo.jpg";
    } else if (name == "McDonald's") {
      fileName = "jimmy-john_logo.jpg";
    } else if (name == "McDonald's") {
      fileName = "KFC_logo.svg.jpg";
    } else if (name == "Long John Silver's") {
      fileName = "long_john_silvers_logo.jpg";
    } else if (name == "OMG! Rotisserie") {
      fileName = "omg_logo.jpg";
    } else if (name == "Pizza Hut") {
      fileName = "pizzahut_logo.jpg";
    } else if (name == "SONIC Drive In") {
      fileName = "sonic-drive-in_logo.jpg";
    } else if (name == "McDonald's") {
      fileName = "subway-logo.jpg";
    } else if (name == "McDonald's") {
      fileName = "tacobell_logo.jpg";
    } else if (name == "Wendy's") {
      fileName = "wendys_logo.jpg";
    } else if (name == "Wendy's") {
      fileName = "whataburguer_logo.jpg";
    }

    return "images/restaurants/" + fileName;
  },
  getRate: function (rates) {
    if (!rates) return 0;
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

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/avaliar', function (req, res) {
  res.render('avaliar', { restaurantId: req.query.id });
});

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

        restaurants.find({pending: true}).toArray(function (e, result) {
          if (e) {
            res.send({message: e.message});
            return;
          }
  
          params.pendings = result;
          res.render('index', params);
        });
      });

    } else {
      res.send({message: 'Falha ao conectar-se com banco.'})
    }
  })

});

module.exports = router;
