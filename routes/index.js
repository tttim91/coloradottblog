var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../db/api');
var auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {id: req.session.userId});
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

router.get('/signup', auth.isLoggedIn, function(req, res, next) {
    res.render('auth/signup');
})

router.get('/login', auth.isLoggedIn, function(req, res, next) {
    if(req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
}, function(req, res, next) {
    res.render('auth/login');
})

router.get('/logout', function(req, res, next) {
    req.session = null;
  res.redirect('/');
});

router.post('/login',
function(req, res, next) {
    auth.passport.authenticate('local', function(err, user, info) {
            if(err) {
                res.render('auth/login', {error: err})
            } else if (user) {
                req.session.userId = user.id;
                res.redirect('/');
            }
    })(req, res, next);
});

router.post('/signup', function(req, res, next) {
  db.findUserByUsername(req.body.username).then(function (user) {
      if(user) {
          res.render('auth/signup', {error: "user already exists"})
      } else {
          auth.createUser(req.body).then(function (id) {
              req.session.userId = id
              res.redirect('/')
          })
      }
  })
});



module.exports = router;
