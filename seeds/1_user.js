var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
    var password = "password";
    var hash = bcrypt.hashSync(password, 8);


  return knex.raw('TRUNCATE TABLE client RESTART IDENTITY CASCADE').then(function() {
      return Promise.all([
        knex('client').insert({last_name: 'Musgrove', first_name:'Tim', username:'tttim', password:hash}),
        knex('client').insert({last_name: 'Ming', first_name:'Shi Yan', username:'shaolin', password:hash}),
        knex('client').insert({last_name: 'Kurzweil', first_name:'Ray', username:'genius', password:hash})
      ]);
  })




};
