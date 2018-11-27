var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

const ADDRESS = 0;
const CITY = 1;
const COUNTRY = 2;
const KEYS = 3;
const LATITUDE = 4;
const LONGITUDE = 5;
const NAME = 6;
const POSTAL_CODE = 7;
const PROVINCE = 8;
const WEBSITES = 9;

router.get('/merge', function(req, res, next) {
  res.send({message: 'Nada pra fazer aqui'})
  return
  fs.readFile("/Users/gustavoifanger/Downloads/FastFoodRestaurants.csv", {encoding: 'utf-8'},function(error, data) {
    if (!error) {
      var rows = data.split('\r\n');
      var restaurants = [];

      for (var i = 1; i < rows.length; i++) {
        const row = rows[i]
        const info = row.split(',');

        const avaliacoes = [];
        const qtdeAvaliacoes = Math.floor(Math.random() * 1100);

        for (var j = 0; j < qtdeAvaliacoes; j++) {
          avaliacoes.push(Math.floor(Math.random() * 6));
        }

        const restaurant = {
          name: info[NAME],
          address: info[ADDRESS],
          city: info[CITY],
          country: info[COUNTRY],
          latitude: info[LATITUDE],
          longitude: info[LONGITUDE],
          postalCode: info[POSTAL_CODE],
          province: info[PROVINCE],
          websites: info[WEBSITES],
          comentarios: [],
          avaliacoes: avaliacoes
        };

        restaurants.push(restaurant);
      }

      MongoClient.connect("mongodb://localhost:27017/foodspot", function(error, client) {
        const db = client.db('foodspot');

        if (!error) {
          db.collection('restaurants').insertMany(restaurants, function(result) {
            res.send({message: 'Nem sei como, mas deu certo'});
          });
        } else {
          res.send({message: 'Failed to connect to db.'})
        }
      });
    } else {
      res.send({error: error.message});
    }
  });
});

module.exports = router;
