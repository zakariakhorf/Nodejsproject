const express = require('express');
const router = express.Router();
const passport = require('passport');
// user model
const User = require("../models/User");
const bcrypt = require('bcryptjs');



//login page
router.get('/login', (req, res) => res.render('login'));


// Register page
router.get("/register", (req, res) => res.render('register'));

//register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Check required Fields 
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all the fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords are not the same' });
  }
  if (password.lenght < 6) {
    errors.push({ msg: 'Passwd is at least 6 characters ' });
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2

    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // user found
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2

        });

      } else {
        const newUser = new User({
          name, email, password
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              req.flash('success_msg', 'You are now registered');
              res.redirect('/users/login');
            })
              .catch(err => console.log(err));
          });


        });


      }
    })

  }
});

//Login handle of post
router.post('/login', (req, res ,next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res , next);


  });

  //logout handle 
  router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/users/login');
  });




module.exports = router;