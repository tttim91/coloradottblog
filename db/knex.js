var config = require('../knexfile');
var environment = process.env.NODE_ENV || 'development';
var knex = require('knex');
module.exports = knex(config[environment])
