const express=require('express');
const morgan=require('morgan');
const cookieparser=require('cookie-parser');
const passport=require('passport');
const session=require('express-session');
require('dotenv').config();

const bodyparser=require('body-parser');

const authRouter=require('./routes/auth');
const passportconfig=require('./passports');

const port=4020;
const app=express();
passportconfig(passport);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(
    session({
        resave:false,
        saveUninitialized:false,
        secret:'sgnjij#njskgnsdigna*&)',
        cookie:{
            httpOnly:true,
            secure:false
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRouter);

app.use((req,res,next)=>{
    res.status(404).send('not found');
});

app.listen(port,function(){
    console.log('Server is listeingn on '+port);
});
