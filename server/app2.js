var http=require('http');
var createEreror=require('http-errors');
var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var logger=require('morgan');
var session=require('express-session');
var FileStore=require('session-file-store')(session);
var flash=require('connect-flash');
var ejs=require('ejs');
var mysql=require('mysql');
var bodyParser=require('body-parser');

// 메인 라우트까지 폴더로 이동햇으므로, 이 부분 수정!
var connection = mysql.createConnection({
   host : 'localhost',
   port : 3307,
   user : 'sinja',
   password : 'sinja',
   database :'passport_test'
});
connection.connect();

const {RequestHeaderFieldsTooLarege} = require('http-errors');

var app=express();

app.use(session({
    secret:'sdnjasdjgjjjk#$%%%%',
    resave:false,
    saveUninitialized:true,
    store:new FileStore()
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//passport 무조건 sesson밑에 작성해야함
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

console.log("__dirname",__dirname,path.join(__dirname,'/views'));
//view engine setup
app.set('views','./views');
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname,'../public')));

//catch 404 and forward to error handler
/*app.use(function(req,res,next){
    next(createError(404));
});

//error handler
app.use(function(err,req,res,next){
    res.locals.message=err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error PAGE
    res.status(err.status || 500);
    res.json({'error':'errosss'});

});*/

//passport 관련 설정 처리(회원가입,로그인)
passport.use('local-join',new LocalStrategy({
        usernameField:'user_id',
        passwordField:'pw',
        passReqToCallback:true
    }, function(req,user_id,pw,done){
        console.log('local-join');
        var sql='select * from users where user_id=?';
        var query=connection.query(sql,[user_id],function(err,datas){
            if(err) return done(err);
            if(datas.length){
                console.log('이미 유저 eamil유저 이미 존재:',datas);
                return done(null,false,{message:'your userid is already used'});
            }else{
                var sql='insert into users(user_id,password) values(?,?)';
                var query=connection.query(sql, [user_id,pw],function(err,datas){
                    if(err) return done(err);
                    return done(null,{
                        'user_id':user_id,
                        'id':datas.insertId
                    })
                });
            }
        });
    }
));

passport.use('local-login',new LocalStrategy({
        usernameField:'user_id',
        passwordField:'pw',
        passReqToCallback:true
    }, function(req,user_id,pw,done){
        console.log('local-login',user_id,pw);
        var sql='select * from users where user_id=? and password=?';
        var query=connection.query(sql,[user_id,pw],function(err,datas){
            if(err) return done(err);
            if(datas.length){
                console.log('해당 정보 회원 존재한다.');
                return done(null,{
                    user_id:user_id
                });
            }else{
                return done(null,false,{
                    message:'아이디 혹은 비밀번호가 다릅니다.'
                });
            }

        });
    }
));
passport.serializeUser(function(user,done){
    console.log('passport session save:',user,done,user.user_id);
    done(null,user.user_id);
});
passport.deserializeUser(function(user_id,done){
    console.log('passport session get user_id:',user_id);

    done(null,user_id);
});

/*페이지 라우팅*/
app.get('/session_list',function(req,res,next){
    console.log('res.session,req.user:',req.session,req.user);
    res.json({'passport_session':req.user,'normal_session':req.session});
});

app.get('/main',function(req,res,next){
    var id=req.user;
    console.log('req session개체 중 user라는 상수세션프로퍼티명에 고정저장:',req);
    console.log('page요청에따른, req.user is what:',req.user);
    res.render('index',{
        title:'index',
        user_id:id
    });
});

app.get('/join',function(req,res,next){
    console.log('join get요청:');
    var msg;
    var errMsg=req.flash('error');
    if(errMsg){
        msg=errMsg;
    }
    res.render('joins.ejs',{
        title:'joins',
        message:msg
    });
});

app.post('/join', async(req,res,next)=>{
    console.log('user/jsoin >>> ',req.body.user_id,req.body.pw,next);

    try{
        passport.authenticate('local-join',(err,user,info)=>{
            console.log('authenticate함수 외부함수 호출이후, 해당 함수에서 callback호출함수 전송파라미터:',err,user,info);

            if(err){

            }
            if(info){

            }
            console.log('users인포:',user);
            return req.login(user,async(err)=>{
                if(err){
                    return next(err);
                }
                return res.json(user);
            });
        })(req,res,next);
    }catch(err){

    }
});

app.get('/login',function(req,res,next){
    var msg;
    var errmsg=req.flash('error');
    if(errmsg){
        msg=errmsg;
    }
    res.render('logins',{
        title:'login',
        message:msg
    });
});

app.post('/login',async function(req,res,next){
    console.log('user/json =>> ',req.body.user_id,req.body.pw,next);

    try{
        passport.authenticate('local-login',{
            successRedirect:'/main',
            failureRedirect:'/',
            failureFlash:true
        },(err,users,info)=>{
            console.log('로컬 로그인 authenticate함수 외부함수 호출이후, 해당 함수에서 callback호출함수 전송파라미터:',err,users,info);

            if(err){

            }
            if(info){

            }
            console.log('users인포:',users);
            return req.login(users,async(err)=>{
                if(err){
                    return next(err);
                }
                return res.json(users);
            });
        })(req,res,next);
    }catch(err){

    }
});

app.get('/logout',function(req,res){
    console.log('로그아웃 처리후 main이동');
    req.logout();//이 함수 지원하나본데 passpoort logout함수 연동인듯/?? 이걸 처리하면 세션 처분한다.
    req.session.save(function(){
        res.redirect('/main');
    });
});
//http서버 가동 앱띄우기
http.createServer(app).listen(4001,function(){
    console.log('server running at 127.0.0.1:4001');
});
