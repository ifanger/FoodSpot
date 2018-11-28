var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = require("mongodb").ObjectID;

/**
 * OBTEM A LISTA DE COMENTARIOS DE UM RESTAURANTE
 */
router.get('/comment', function(req, res, next) {
  const restaurantId = req.query.restaurant;
  const response = {
    success: false,
    message: null
  };

  if (!restaurantId) {
    res.send(response);
    return;
  }

  if (restaurantId.length != 24) {
    response.message = 'ID do restaurante é inválido.';
    res.send(response);
    return;
  }

  MongoClient.connect("mongodb://localhost:27017/foodspot", function (error, client) {
    const db = client.db('foodspot');
    const restaurants = db.collection('restaurants');
    restaurants.findOne({_id: ObjectID(restaurantId)}, function (e, result) {
      if (e) {
        response.message = 'Falha ao obter dados';
        res.send(response);
        return;
      }

      response.success = true;
      response.data = result.comentarios;
      res.send(response);
    });
  });
});

/**
 * INSERE UM NOVO COMENTARIO EM UM RESTAURANTE
 */
router.post('/comment', function(req, res, next) {
  const restaurantId = req.query.restaurant;
  const author = req.query.author;
  const message = req.query.message;

  const response = {
    success: false,
    message: null
  };

  if (!restaurantId || !author || !message) {
    res.send(response);
    return;
  }

  if (restaurantId.length != 24) {
    response.message = 'ID do restaurante é inválido.';
    res.send(response);
    return;
  }

  MongoClient.connect("mongodb://localhost:27017/foodspot", function (error, client) {
    const db = client.db('foodspot');
    const restaurants = db.collection('restaurants');

    const comment = {
      author,
      message
    };

    restaurants.updateOne({_id: ObjectID(restaurantId)}, {$push: {comentarios: comment}}, function (e, result) {
      response.success = !e;
      res.send(response);
    });
  });
});

/**
 * OBTEM A LISTA DE RESTAURANTES
 */
router.get('/restaurants', function(req, res, next) {
  const response = {
    success: false,
    message: null
  };

  MongoClient.connect("mongodb://localhost:27017/foodspot", function (error, client) {
    const db = client.db('foodspot');
    const restaurants = db.collection('restaurants');
    restaurants.find({}).limit(10).toArray(function (e, result) {
      if (e) {
        response.message = e.message;
        res.send(response);
        return;
      }

      response.success = !e;
      response.data = result;
      res.send(response);
    });
  });
});

/**
 * ADICIONA UM NOVO RESTAURANTE
 */
router.post('/restaurants', function(req, res, next) {
  const restaurantId = req.query.restaurant;
  const author = req.query.author;
  const message = req.query.message;

  const response = {
    success: false,
    message: null
  };

  if (!restaurantId || !author || !message) {
    res.send(response);
    return;
  }

  if (restaurantId.length != 24) {
    response.message = 'ID do restaurante é inválido.';
    res.send(response);
    return;
  }

  MongoClient.connect("mongodb://localhost:27017/foodspot", function (error, client) {
    const db = client.db('foodspot');
    const restaurants = db.collection('restaurants');

    const comment = {
      author,
      message
    };

    restaurants.updateOne({_id: ObjectID(restaurantId)}, {$push: {comentarios: comment}}, function (e, result) {
      response.success = !e;
      res.send(response);
    });
  });
});



router.post('/login', function (req, res, next) {
  const username = req.query.username;
  const password = req.query.password;

  if (username == 'admin' && password == 'admin') {
    res.cookie('admin', 'true');
    res.send({success: true});
    return;
  }

  res.send({success: false});
}); 

module.exports = router;
