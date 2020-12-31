const express = require('express');
const router = express.Router();

// user model
const User = require("../models/User");
const bcrypt = require('bcryptjs');



//login page
router.get('/login', (req,res)=> res.render('login'));


// Register page
router.get("/register", (req,res)=> res.render('register'));

//register handle
router.post("/register", (req,res) => {
    const { name,email,password,password2} = req.body ;
    let errors =[];

//Check required Fields 
  if (!name || !email || !password || !password2){
      errors.push({msg:'Please fill in all the fields'});
  }

 if ( password  !== password2){
      errors.push({msg:'Passwords are not the same'});
  }
  if ( password.lenght < 6){
    errors.push({msg:'Passwd is at least 6 characters '});
}
if (errors.length > 0){
res.render('register',{
      errors,
      name,
      email,
      password,
      password2

});
}else{
// Validation passed
User.findOne({email : email}).then(user =>{
    if(user){
       // user found
       errors.push({msg: 'Email is already registered'});
       res.render('register',{
        errors,
        name,
        email,
        password,
        password2
  
  });

    }else{
  const newUser = new User ({
      name,email,password
  });
   //hash password


    }
})




}





});




module.exports = router ;