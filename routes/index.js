var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
    knex('client').select().then(function(resultsFromQuery) {
        res.render('index', {list:resultsFromQuery});
    })
});

router.get('/addUser', function(req, res, next) {
    res.render('addUser');
});

router.get('/:id/edit', function (req, res, next) {
  knex('client').where({id: req.params.id}).first().then(function (client) {
    res.render('edit', {client: client})
  })
})

router.post('/:id/edit', function (req, res, next) {
  knex('client').where({id: req.params.id}).update(req.body).then(function () {
    res.redirect("/users/" + req.params.id)
  })
})

router.get('/:id/delete', function (req, res, next) {
  knex('comment').where({client_id: req.params.id}).del().then(function () {
    return knex('post').where({client_id: req.params.id}).del().then(function () {
    return knex('client').where({id: req.params.id}).del().then(function () {
        res.redirect('/')
    })
    })
  })
})

router.get('/users/:id', function (req, res, next) {
  knex('client').where({id: req.params.id}).first().then(function (client) {
    res.render('detail', {client: client})
  })
});

router.post('/addUser', function (req, res, next) {
  knex('client').insert(req.body).then(function () {
    res.redirect('/');
  }).catch(function (err) {
    console.log(err);
    next(err)
  })
})



module.exports = router;
