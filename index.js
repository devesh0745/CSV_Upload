const express=require('express');
const app=express();
const port=4000;
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');

app.use(express.urlencoded());

app.use(express.static('./assests'));


app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);

//app.set('layout extractStyles', true);
//app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views')

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
    };
    console.log('Server running on port 4000');
})