var config = {};

config.mongo = {};

config.mongo.uri = 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/tardis-api';

module.exports = config;

