const express=require('express');
const morgan=require('morgan');
const cookieparser=require('cookie-parser');
const session=require('express-session');
require('dotenv').config();

const bodyparser=require('body-parser');

//const authRouter=require('./routes/auth');//회원가입&로그인 관련 모든 처리 router페이지(네종류 회원별)분기 url처리
//const smsRouter=require('./routes/coolsmsUse');//coolsms라이브러리 사용 사용자에게 휴대폰 sms 메시지보낸다.
//const brokerRouter=require('./routes/brokerRouter');
//const social_router=require('./routes/social_router');//social router;
//const mypageRouter=require('./routes/mypageProcess');//mypage관련 전반적 범용처리 라우터

//const facebook_passportconfig=require('./passport_facebook');
//const kakao_passportconfig=require('./passport_kakao');
//const naver_passportconfig=require('./passport_naver');

//const passportconfig=require('./passports');//패스포트 api설정

const port=8083;
const app=express();
//facebook_passportconfig(passport);//passport api전달한다.
//kakao_passportconfig(passport);
//naver_passportconfig(passport);

const cors=require('cors');
app.use(cors({
    origin : 'http://localhost:3000',
    credentails:true
}));
//app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieparser());
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(session({
    secret: 'keyboard catss',
    resave:false,
    saveUninitialized:true,
    //store : new FileStore()
}));


const mysqls=require('mysql2/promise');
const { UnorderedCollection } = require('http-errors');
const pool= mysqls.createPool({
    host:'korex-dev-db.cewuqg5n85w2.ap-northeast-2.rds.amazonaws.com',
    //host: 'localhost',
    //host : '13.209.251.38',
    port:3306,
    user:'pref_user',
    password:'vmfpvm$3909',
    database:'korex_pref'
});
console.log('serverTest serverDbtest program execute pool connection Test:>>>>',pool);

app.get('/test',async (req,res,next) => {
    //console.log('/test->>>>request :',req);

    try{
        const connection= await pool.getConnection(async conn=> conn);
        console.log('connection try:>>>',connection);

        var [query_result] = await connection.query("select * from user");
        console.log("connection results:",query_result);

        await connection.beginTransaction();
        var [tour_insert_test_rows] = await connection.query("insert into tour(prd_identity_id,company_id,mem_id) values(18,18,18)");
        await connection.commit();
        console.log('conneciton insert query rows:',tour_insert_test_rows);
    }catch(e){
        console.log('connection error why:',e);
    }
    
    return res.json('sdgdgegegegge');
});

app.listen(port,function(){
    console.log('========SERVER IS LISTENING ON '+port);
});
