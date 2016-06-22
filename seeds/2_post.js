var findIdByName = require("../helper").findIdByName;

exports.seed = function(knex, Promise) {


  return knex.raw('TRUNCATE TABLE post RESTART IDENTITY CASCADE').then(function() {
        return knex('client').select()
  })
  .then(function(names) {
      return Promise.all([
        knex('post').insert({title: 'First Post', body:'EPIC POSTAGE', client_id:findIdByName(names, "Musgrove")}),
        knex('post').insert({title: 'Second Post', body:'Life is Pain!', client_id:findIdByName(names, "Ming")}),
        knex('post').insert({title: 'Third Post', body:'Are you ready to live forever?', client_id:findIdByName(names, "Kurzweil")})
      ]);
  })
  .then(function () {
      return knex("post").select(["post.title", "client.first_name", "client.last_name"]).join("client", function () {
        this.on("post.client_id", "=", "client.id")
      })
  })




};
