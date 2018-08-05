let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  console.log('it get here');
  let user = new User();
  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.address = req.body.address;
  user.mapLocation = req.body.mapLocation;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    return res.json({ token: user.generateJWT() });
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
      console.log(err);
    }
    if (user) {
      console.log(user);
      return res.json({ token: user.generateJWT() });
    } else {
      console.log(info)
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.delete('/delete-all', function(req, res) {
  User.remove({ _id: { $in: User.find()} }, function(err) {
    res.json('all is well');
  });
});

router.get('/get-all',function(req, res) {
  let query = User.find();
  query.exec(function(err, recipes) {
    if (err) {
      return next(err);
    }
    res.json(recipes);
  });
});

router.post('/checkusername', function(req, res, next) {
  User.find({ username: req.body.username }, function(err, result) {
    if (result.length) {
      res.json({ username: 'alreadyexists' });
    } else {
      res.json({ username: 'ok' });
    }
  });
});
module.exports = router;
