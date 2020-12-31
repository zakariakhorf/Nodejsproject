const express = require('express');
const app = express();
const expressLayouts = require ('express-ejs-layouts');
const mongoose = require ('mongoose');
const PORT = process.env.PORT || 5000 ;
const morgan = require ("morgan");


//DBconfig

const db = require('./config/keys').MongoURI;

//connecting to mongodb
mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log('Mongodb Connected'))
.catch(err=> console.log(err));


//EJS
app.use(expressLayouts);
app.set("view engine",'ejs');


//body parser 
app.use(express.urlencoded({extended : false}));



// Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(PORT, console.log('serer running on port ',PORT));