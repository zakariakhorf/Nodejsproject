const express = require('express');
const app = express();
const expressLayouts = require ('express-ejs-layouts');
const mongoose = require ('mongoose');
const PORT = process.env.PORT || 5000 ;
const morgan = require ("morgan");
const flash = require('connect-flash');
const session = require('express-session');
const passport =require('passport');
//DBconfig

const db = require('./config/keys').MongoURI;
require('./config/passport')(passport);

//connecting to mongodb
mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log('Mongodb Connected'))
.catch(err=> console.log(err));


//EJS
app.use(expressLayouts);
app.set("view engine",'ejs');


//body parser 
app.use(express.urlencoded({extended : false}));

//Express session middleware
app.use(session({
secret : 'secret',
resave : true ,
saveUninitialized : true ,
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//  Connect flash
app.use(flash());

// global vars

app.use((req,res,next)=>{
    app.locals.success_msg = req.flash('success_msg');
    app.locals.error_msg = req.flash('error_msg');
    app.locals.error = req.flash('error');
    next();
});



// Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(PORT, console.log('serer running on port ',PORT));