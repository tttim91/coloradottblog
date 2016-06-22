var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
    knex('post').select().then(function(resultsFromQuery) {
        res.render('posts', {list:resultsFromQuery});

    })
});

router.get('/addPost', function(req, res, next) {
    knex('client').select().where('id', '=', req.session.userId).first()
    .then(function(resultsFromQuery) {
        res.render('addPost', {list:resultsFromQuery});
    })
});

router.get('/:id/edit', function (req, res, next) {
  return Promise.all([
      knex('post').select(['client.last_name', 'client.username', 'post.title', 'post.body', 'post.id'])
      .join('client', 'post.client_id',
      'client.id').where('post.id', '=', req.params.id).first(),
      knex('client').select().where('client.id', '=', req.session.userId).first()
  ])
  .then(function (data) {
  var post = data[0];
  var client = data[1];
    res.render('editPost', {post: post, client: client})
  })
})

router.post('/:id/edit', function (req, res, next) {
  knex('post').where({id: req.params.id}).update(req.body).then(function () {
    res.redirect("/posts/" + req.params.id)
  })
})

router.get('/:id/delete', function (req, res, next) {
  knex('post').where({id: req.params.id}).del().then(function () {
    res.redirect('/posts')
  })
})

router.get('/:id/:commentid/', function (req, res, next) {
  knex('comment').del().where("comment.id", "=", req.params.commentid).then(function () {
    console.log(req.params.id);
    res.redirect('/posts')
  })
})

router.get('/:id', function (req, res, next) {
  return Promise.all([
      knex('post').select(["client.id as client_id", "post.id as post_id", "post.title", "post.body", "client.username"])
      .join("client", function() {
          this.on("client.id", "=", "post.client_id")
      })
      .where("post.id", "=",  req.params.id).first(),

      knex('client').select().where('id', '=', req.session.userId).first(),

      knex('post').select(["post.id as post_id","comment.body", "comment.id as comment_id", "comment.client_id", "client.username"])
      .join("comment", function() {
          this.on("post.id", "=", "comment.post_id")
      }).join('client', function() {
          this.on("client.id", "=", "comment.client_id")
      })
      .where("post.id", "=", req.params.id)

    ])
  .then(function (data) {
    var posts = data[0];
    var clients = data[1];
    var comments = data[2];
    console.log(clients);
    var author;
    if(req.session.userId == posts.client_id) {
        author = true;
    }
    res.render('postDetail', {post: posts, clients: clients, comments: comments, author: author})
  })
});



router.post('/addPost', function (req, res, next) {
    if(!req.body.client_id) {
        knex('post').select().then(function() {
            res.render('addPost', {error: "Please enter a username"})
        })
    }
    else {
  knex('post').insert(req.body).then(function () {
    res.redirect('/posts');
  }).catch(function (err) {
    console.log(err);
    next(err)
  })
  }
})

router.post('/:id', function(req, res, next) {
    console.log("helladsf")
    knex('comment').insert(req.body)
    .then(function () {
        res.redirect('/posts/' + req.params.id);
    })
})

module.exports = router;
