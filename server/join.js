var http=require('http');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var session=require('express-session');
var flash=require('connect-flash');
var express = require('express');
var app = express();
var router = express.Router(); //라우터 메소드 이용. 루트 기능이므로 해주어야함.
var mysql=require('mysql');
var ejs=require('ejs');

app.use(session({
    secret : 'keyboard cats',
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('views','./views');
app.set('view engine','ejs');

console.log('dirname:',__dirname);

// 메인 라우트까지 폴더로 이동햇으므로, 이 부분 수정!
var connection = mysql.createConnection({
   host : 'localhost',
   port : 3307,
   user : 'sinja',
   password : 'sinja',
   database :'passport_test'
});
connection.connect();

console.log('passport',passport);

passport.serializeUser(function(user,done){
    console.log('session',user,done);
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null,id);
});

passport.use('local-join',new LocalStrategy({
    usernameField:'user_id',
    passwordField:'password',
    passReqToCallback:true
},function(req,user_id,password,done){
        console.log('new localstragety생성자?함수에 전달돠는 함수의 파라미터들,req,id,passwoord,done',req,user_id,password,done);
        var select_query=conn.query('select * from users where user_id=?',[user_id],function(err,rows){
            if(err) return done(err);

            if(rows.length){
                console.log('already existsed');
                return done(null,false,{message:'already existed.'});
            }else{
                var sql={user_id : user_id, password:password};
                var query=conn.query('insert into users set ?',sql,function(err,rows){
                    if(err) throw err;
                    return done(null,{'user_id':user_id});
                });
            }
        });
    }
));

app.post('/join',passport.authenticate('local-join',{

    successRedirect:'/joinOk',
    failureRedirect:'/joinForm',
    failureFlash:true
}));

app.get('/joinOk',function(req,res){
    console.log('joinok.ejs is call',req.user);
    var id=req.user;
    res.render('joinOk.ejs',{'id':id});
});

app.get('/joinForm',function(req,res){
    console.log('joinFoirm호출 url호출:');
    var msg;
    var err=req.flash('error');
    if(err){
        msg= err;
    }
    res.render('join',{'errMsg':msg});
});

http.createServer(app).listen(4000,function(){
    console.log('server running at 127.0.0.1:4000');
});
