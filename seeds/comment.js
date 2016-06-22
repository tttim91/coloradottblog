var findIdByName = require("../helper").findIdByName
var findIdByPostTitle = require("../helper").findIdByPostTitle

exports.seed = function(knex, Promise) {




  return knex.raw('TRUNCATE TABLE comment RESTART IDENTITY CASCADE')
  .then(function () {
       return Promise.all([
           knex("client").select(),
           knex('post').select()
       ])
  })
  .then(function(data) {
      var clients = data[0];
      var posts = data[1];
      return Promise.all([
        knex('comment').insert({body:'This is a nice post :)', client_id:findIdByName(clients, "Ming"), post_id:findIdByPostTitle(posts, "First Post")}),
        knex('comment').insert({body:'Agreed', client_id:findIdByName(clients, "Kurzweil"), post_id:findIdByPostTitle(posts, "Second Post")}),
        knex('comment').insert({body:'That would be pretty cool', client_id:findIdByName(clients, "Musgrove"), post_id:findIdByPostTitle(posts, "Third Post")})
      ]);
  })



};
