var express = require('express');
var enrouten = require('express-enrouten');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redis = require('redis');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var config = require('./config');
mongoose.connect(config.mongo.uri);

var redisClient = redis.createClient();
redisClient.on("error", function (err) {
	console.log("REDIS: ERROR: " + err);
});

var router = enrouten({ directory: 'routes' }); 

app.use('/v1', router);

app.listen(port);
console.log('API listening on port: ' + port + '...');
