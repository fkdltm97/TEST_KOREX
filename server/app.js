var http=require('http');
var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
//var cors=require('cors');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;


// 메인 라우트까지 폴더로 이동햇으므로, 이 부분 수정!
var connection = mysql.createConnection({
   host : 'localhost',
   port : 3307,
   user : 'sinja',
   password : 'sinja',
   database :'passport_test'
});
connection.connect();

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(session({
    secret:'asdgasdgagsdgsdgff',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user,done){
    console.log('done으로 던져주면 호출됀다 뭔 원리지...');
    console.log('session',user,done);
    done(null,user.user_id);
});
passport.deserializeUser(function(user_id,done){
    console.log('serialiesuser에서 done호출돼면 던져져서 호출됄걸로 추정:',user_id,done);
    done(null,user_id);
});

passport.use('local-join',new LocalStrategy(
    {
        usernameField:'user_id',
        passwordField:'password',
        passReqToCallback:true
    }, function(req,username,password,done){
        console.log('localstragety함수생성자 함수 콜백 함수 뭔가호출:',req,username,password,done);
        var select_query=connection.query("select * from users where user_id=?",[username],function(err,rows){
            if(err) return done(err);

            if(rows.length){
                console.log('already exsitsed');

                return done(null,false,{message:'already existed.'});
            }else{
                var sql= {user_id : username, password:password,created_at: new Date(),updated_at:new Date()};
                var query=connection.query("insert into users set ?",sql,function(err,rows){
                    if(err) throw err;
                    return done(null,{'user_id':username});
                });
            }
        });
    }
));

app.post('/join',async(req,res,next) => {
    console.log('user/join>>>>>>',req.body.user_id,req.body.password,next);

    try{
        passport.authenticate('local-join',(err,user,info) =>{
            console.log('authenticate함수 ()외부함수 호출이후, 해당 함수 에서 callback호출 함수 전송파라미터:',err,user,info);
            if(err){
                console.log('err발생 발생:',err);
                return next(err);
            }

            if(info){
                console.log('info 정보 조회:',info);
                return res.status(401).send(info);
            }
            console.log('users인포:',user);
            //이 함수에서 외장함수가 있고 그 외장함수가 참조하고있는 req 아니, req는 어디서>?
            return req.login(user,async(err) => {
                if(err){
                    return next(err);
                }
                return res.json(user);
            });
        })(req,res,next);
    }catch(err){

    }
});

app.get('/joinOk',function(req,res){
    console.log('joinok.ejs is call',req.user);
    var user_id=req.user;
    res.render('joinOk.ejs',{'user_id':user_id});
});

app.get('/joinForm',function(req,res){
    var msg;
    var err=req.flash('error');
    if(err){
        msg=err;
    }
    res.render('join.ejs',{'errMsg':msg});
});

http.createServer(app).listen(4002,function(){
    console.log('server running at 127.0.0.1:4002');
});
