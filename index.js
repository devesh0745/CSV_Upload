const express=require('express');
const app=express();
const port=4000;
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const session=require('express-session');


app.use(express.urlencoded());

app.use(express.static('./assests'));


app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);

//Setting view engine as ejs.
app.set('view engine','ejs');
app.set('views','./views')

//Using session for flash
app.use(session({
    name:'CSV Upload',
    secret:"Something",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000 * 60 * 100)}
}));


app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
    };
    console.log('Server running on port 4000');
})