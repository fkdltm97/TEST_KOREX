
const http=require('http');
const express=require('express');
const app=express();
const route=require('./router.js');
const bodyparser=require('body-parser');

const expressSession=require('express-session');
const passport=require('./passport.js');
const flash=require('connect-flash');


app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressSession({
    secret:'jdiijdjjsjgs mey kenyjensdg',
    resave:true,
    saveUninitialized:true
}));

app.use('/',route);
console.log('aapp실행 app3 최초 로드 실행:');
app.listen(4003,()=>{
    console.log('4003 port is on !');
});
