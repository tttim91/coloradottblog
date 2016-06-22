
exports.seed = function(knex, Promise) {



  return knex.raw('TRUNCATE TABLE client RESTART IDENTITY CASCADE').then(function() {
      return Promise.all([
        knex('client').insert({last_name: 'Musgrove', first_name:'Tim', username:'tttim', password:'password'}),
        knex('client').insert({last_name: 'Ming', first_name:'Shi Yan', username:'shaolin', password:'password'}),
        knex('client').insert({last_name: 'Kurzweil', first_name:'Ray', username:'genius', password:'password'})
      ]);
  })




};
