const express=require('express');
const morgan=require('morgan');
const cookieparser=require('cookie-parser');
const passport=require('passport');
const session=require('express-session');
require('dotenv').config();

const bodyparser=require('body-parser');

//const authRouter=require('./routes/auth');//회원가입&로그인 관련 모든 처리 router페이지(네종류 회원별)분기 url처리
const smsRouter=require('./routes/coolsmsUse');//coolsms라이브러리 사용 사용자에게 휴대폰 sms 메시지보낸다.
const brokerRouter=require('./routes/brokerRouter');
const social_router=require('./routes/social_router');//social router;
const mypageRouter=require('./routes/mypageProcess');//mypage관련 전반적 범용처리 라우터
const matterialRouter=require('./routes/matterialRouter');//전속을 제외한 물건들에 대한 정보 관련 처리(단지,단지별실거래,지하철,대학교,등등.)

const facebook_passportconfig=require('./passport_facebook');
const kakao_passportconfig=require('./passport_kakao');
const naver_passportconfig=require('./passport_naver');

//const passportconfig=require('./passports');//패스포트 api설정

const port=8080;
const app=express();
facebook_passportconfig(passport);//passport api전달한다.
kakao_passportconfig(passport);
naver_passportconfig(passport);

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

app.use(passport.initialize());
app.use(passport.session());

//app.use('/auth',authRouter);
app.use('/api/coolsms',smsRouter);//coolsms형태의 주소 요청
app.use('/auth/social',social_router);//socail 로그인,가입 관련 기능 router
app.use('/api/broker',brokerRouter);//broker라우터 (중개사,개인/기업관련 모든것 매물 요청 관련 모든처리)
app.use('/api/mypage',mypageRouter);//mypage라우터 api/mypage/companyprofileEdit 관련 분기 처리.
app.use('/api/matterial',matterialRouter);
//로그인 회원가입처리.

//const router=express.Router();
//const passport=require('passport');
const bcrypt=require('bcrypt');
//const loginCheck=require('../loginCheck');
//const app=express();

/*var isLogin=loginCheck.isLogin;
var isLogout=loginCheck.isLogout;*/


//디비 관련 연결 필요
/*const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    port:3307,
    user:'sinja',
    password:'sinja',
    database:'korex'
});
connection.connect();*/

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
console.log('mainServer program execute pool connection Test:>>>>',pool);

//개인 회원가입
app.post('/api/auth/member/register',async(req,res,next)=> {
    const { email,name,password,phone,usertype,agree_status }=req.body;
    console.log('/member/register 개인회원가입 요청:',req.body);

    try{
        //agree_optional문자열 포함된다면 선택 마케팅정보수신을 동의한것, 선택사항 수신동의한경우 여부 구분
        var is_select_agree=false;
        if(agree_status.indexOf('agree_optional')!=-1){
            is_select_agree=true;
        }else{
            is_select_agree=false;
        }

        console.log('pool objessts:',pool,pool.getConnection);
        const connection = await pool.getConnection(async conn => conn);


        //이메일 중복검사진행. 개인 회원리스트중에서 해당 이메일유저 존재검사. 
        try{
            var [rows,fields]=await connection.query('select * from user where email=? and user_type=?',[email,usertype]);

            console.log('user회원리스트 개인 회원리스트 해당 이메일 중복여부검사:',rows);

            if(rows.length>0 || rows[0]){
                connection.release();
                return res.status(403).json('개인 회원리스트에 이미 가입되어있는 이메일입니다.');
            }
        }catch(err){
            console.log('email exists query error');
            connection.release();

            return res.status(403).json('email exists query server error');
        }

        //폰 중복검사 진행, 개인 회원리스트에서 해당 폰번호 존재검사
        try{
            var [rows,fields] = await connection.query('select * from user where phone=? and user_type=?',[phone,usertype]);

            console.log('user회원리스트 개인 회원리스트 해당 폰번호 중복여부검사:',rows);

            if(rows.length >0 || rows[0]){
                connection.release();
                return res.status(403).json('개인 회원리스트에 이미 가입되어있는 휴대폰입니다.');
            }
        }catch(err){
            console.log('email exist query error');
            connection.release();

            return res.status(403).json('phone exists query server error');
        }

        //폰 중복여부까지 회원종류별 유니크 통과시 실행.

        var hashed=bcrypt.hashSync(password,10);//sync 동기처리 먼저 받고진행.
        console.log('bcrypt암호화 진행 복잡도10(salt blur):',hashed);

        try{
            await connection.beginTransaction();
            var [rows,fields]= await connection.query("insert into user(user_name,email,phone,user_type,register_type,password,mem_admin,create_date,modify_date,mem_notification) values(?,?,?,?,?,?,?,?,?,?)",[name,email,phone,usertype,'korex',hashed,'root',new Date(),new Date(),is_select_agree]);

            await connection.commit();
            connection.release();
            console.log('comuser insert rows:',rows);

            return res.json(phone+'::)회원님 개인회원 가입이 완료되었습니다.');
        }catch(err){
            console.log('뭔 에러인가?:',err);

            await connection.rollback();
            connection.release();

            console.log('server users insert query error');

            return res.status(403).json('server users insert query error');
        }
            
    }catch(err){
        console.error(err);
        return next(err);
    }
});

//기업 회원가입
app.post('/api/auth/company/register',async(req,res,next)=> {
    const { email,name,password,phone,usertype,agree_status, businessname,businessnumber }=req.body;
    console.log('/company/register 기업회원가입 요청(비동기형태 호출 형태 함수 실행체):',req.body);
    try{
        //이메일,폰번호 중복검사진행. 전체종류 회원에서 이메일/폰번호 중복검사진행.기업회원에서 해당 이메일/폰번호 중복 검사진행.
        //개인에서 01055878970으로 가입했었고, 기업에서 같은번호로 가입됀거 없으면 가입가능,각 종류별 한개씩은 이메일,폰번호 유니크하게 등록가능.

        //사업자등록번호users테이블에 이미 있는 root_businessnumber, business_number인지 구한다.사업자등록번호는 기업에서 1231212345가입한게 있다면 다른 회원가입에서 동일번호로 못하게.
        //본인이 대표가 아닌경우는 기업의 경우 사업자번호,상호명 없이 넘어오는데 이때 ''값으로 쿼리를 하면 안되기에, 빈값이 아닌경우(본인이 대표)인 경우에만 쿼리한다.
        console.log('pool objexts??',pool,pool.getConnection);
        const connection = await pool.getConnection(async conn => conn);

        //agree_optianiol 문자열 포함한다면 선택 만케팅정보수신을 동의한거다. 선택사항 수신동의한경우,여부 구분
        var is_select_agree=false;
        if(agree_status.indexOf('agree_optional')!=-1){
            is_select_agree=true;
        }else{
            is_select_agree=false;
        }

        //user에서 해당 기업회원리스트중에서 해당 폰번호의 유저가 있는지 여부 검사한다. user에서는 기업회원리스트에서 해당 폰번호 중복여부 검사 폰번호 중복검사.
        try{
            var [rows,fields]= await connection.query("select * from user where phone=? and user_type=?",[phone,usertype]);
            
            console.log('user 회원리스트 기업회원리스트중에서 입력폰번호 중복여부 검사',rows);
            
            if(rows.length > 0 || rows[0]){
                connection.release();
                return res.status(403).json('기업 회원리스트에 이미 가입되어있는 휴대폰번호입니다.');
            }
        }catch(err){
            console.log('phone eixsts query error');
            connection.release();

            return res.status(403).json('phone eixsts server query error');
        }

        //폰 중복여부까지(회원별 유니크)통과시에 실행
        var hashed=bcrypt.hashSync(password,10);
        console.log('bcrypt암호화 진행 복잡도 (salt blur):',hashed);

        //가입처리 진행 (기업회원) user,company테이블 inserted or update진행.
        try{
            await connection.beginTransaction();
            var [rows,fields]= await connection.query("insert into company(create_date,modify_date,type) values(?,?,?)",[new Date(),new Date(),usertype]);

            await connection.commit();
            //connection.release();

            console.log('company insert rows:',rows);

            var connection_local = await pool.getConnection(async conn => conn);//추가 insert작업용 커넥션풀
            console.log('connection local get local gets:',connection_local,connection_local.query);

            if(rows && rows.insertId){
                console.log('company insert query successss===================');
                let insert_companyid=rows.insertId;

                var hashed=bcrypt.hashSync(password,10);
                console.log('bcrypt암호화 진행 복잡도 (salt blur):',hashed);

                await connection_local.beginTransaction();
                var [rows2,fields2]= await connection_local.query('insert into user(company_id,user_name,phone,password,user_type,register_type,mem_admin,create_date,modify_date,mem_notification) values(?,?,?,?,?,?,?,?,?,?)',[insert_companyid,name,phone,hashed,usertype,'korex','root',new Date(),new Date(),is_select_agree]);

                await connection_local.commit();
                connection_local.release();

                console.log('user insert rows:',rows2);
            
                if(rows2 && rows2.insertId){
                    let insert_memid=rows2.insertId;

                    await connection.beginTransaction();
                    var [updaterows] = await connection.query('update company set mem_id=? where company_id=?',[insert_memid,insert_companyid]);
                    await connection.commit();
                    connection.release();

                    console.log('company테이블 update query setting 쿼리결과:',updaterows);

                    return res.json(phone+'::)회원님 기업회원 가입이 완료되었습니다.');
                }else{
                    return res.status(403).json('server insert query error');
                }
            }
        }catch(err){
            console.log('뭔 에러인가??:',err);

            await connection.rollback();
            connection.release();
            await connection_local.rollback();
            connection_local.release();
            
            console.log('server users or business insert query error');

            return res.status(403).json('server users or business insert query error');
        }

    }catch(err){
        console.error(err);
        return next(err);
    }
});
//분양대행사 회원가입
app.post('/api/auth/agency/register',async(req,res,next)=> {
    const { agree_status,businessname,businessnumber,clcmngno,email,name,password,phone,usertype }=req.body;
    console.log('/agency/register 분양대행사 회원가입 요청(비동기형태 호출 형태 함수 실행체):',req.body);
    try{
        
        //분양대행사때에도 검사를 하나??? 
        console.log('pool objexts??',pool,pool.getConnection);
        const connection = await pool.getConnection(async conn => conn);

        //agree_optional문자열을 포함한다면 선택 마케팅정보수신을 동의한것이다. 선택사항 수신동의한경우..수신동의하지 않았다면!! true or false
        var is_select_agree=false;
        if(agree_status.indexOf('agree_optional')!=-1){
            is_select_agree=true;
        }else{
            is_select_agree=false;
        }


        //중복여부 통과했으면..user에서 검사를 하는데, companay->users순으로 insert처리. user에서는 user_type중개사회원리스트중에서 해당 폰번호로 중복여부검사, 폰번호 중복검사.
        try{
            var [rows,fields] = await connection.query("select * from user where phone=? and user_type=?",[phone,usertype]);//해당 타입이면서 해당 번호가 존재하는지 폰 중복검사.

            console.log('user회원리스트 분양사회원리스트중에서 입력폰번호 중복여부 검사',rows);

            if(rows.length > 0 || rows[0]){
                connection.release();
                return res.status(403).json('분양대행사 회원리스트에 이미 가입되어있는 휴대폰번호입니다.');
            }
        }catch(err){
            console.log('user table exits phone exists query error');
            connection.release();
            
            return res.status(403).json('server or query error');
        }

        //가입처리 진행 users,company테이블 inserted or updated진행.
        try{
            await connection.beginTransaction();
            var [rows,fields] = await connection.query("insert into company(create_date,modify_date,type) values(?,?,?)",[new Date(),new Date(),usertype]);
            await connection.commit();
            //connection.release();

            console.log('company insert rows:',rows);

            var connection_local = await pool.getConnection(async conn => conn);//추가 insert작업용 커넥션풀
            console.log('connection local cget local gets:',connection_local,connection_local.query);

            if(rows && rows.insertId){
                //return res.json(name+','+phone+'::) 회원님 가입이 완료되었습니다.');
                //insert성공시에 정보에 insertId 기입된다. users삽입 성공시에 business에도 넣는다.
                
                console.log('comapny insert query susccess:========');
                let insert_companyid=rows.insertId;

                var hashed=bcrypt.hashSync(password,10);
                console.log('bcrypt암호화 진행 복잡도 (salt blur):',hashed);

                await connection_local.beginTransaction();
                var [rows2,fields2] = await connection_local.query("insert into user(company_id,user_name,phone,password,user_type,register_type,mem_admin,create_date,modify_date,mem_notification) values(?,?,?,?,?,?,?,?,?,?)",[insert_companyid,name,phone,hashed,usertype,'korex','root',new Date(),new Date(),is_select_agree]);

                await connection_local.commit();
                connection_local.release();  

                console.log('user insert rows:',rows2);
                

                if(rows2 && rows2.insertId){
                    //company,users에 모두 정보 insert성공시에 update형태의 쿼리 진행!
                    let insert_memid=rows2.insertId;//추가된 user테이블 추가된 mem_id값
                    
                    await connection.beginTransaction();
                    var [updaterows]= await connection.query("update company set mem_id=? where company_id=?",[insert_memid,insert_companyid]);
                    await connection.commit();
                    connection.release();

                    console.log('company테이블 update query setting 쿼리결과:',updaterows);

                    return res.json(phone+'::) 회원님 분양대행사 회원 가입이 완료되었습니다.');
                }else{
                    //여기에 온다는것은 business insert쿼리가 뭔가 안되었다는것임. 
                    return res.status(403).json('server insert query error');
                }
            }
            
        }catch(err){
            console.log('뭔 에러인가??:',err);

            await connection.rollback();
            connection.release();
            await connection_local.rollback();
            connection_local.release();

            console.log('server users or business insert query error!!');
            
            return res.status(403).json('server users or business insert query error');
        }

    }catch(err){
        console.error(err);
        return next(err);
    }
});

//중개사 회원가입
app.post('/api/auth/broker/register',async(req,res,next)=> {
    const { agree_status,businessname,businessnumber,clcmngno,email,name,password,phone,usertype }=req.body;
    console.log('/broker/register 중개사회원가입 요청(비동기형태 호출 형태 함수 실행체):',req.body);
    try{
        
        //중개사때 또한 중복된 사업자번호여부 검사하나??? 
        console.log('pool objexts??',pool,pool.getConnection);
        const connection = await pool.getConnection(async conn => conn);

        is_select_agree;
        if(agree_status.indexOf('agree_optional')!=-1){
            is_select_agree=true;
        }else{
            is_select_agree=false;
        }

        //가입하려는 중개사회원(clc에 등록되어있고, 사업자등록 모두 다 되어있는 적절회원)이 가입요청한경우에 통과, 그 회원에 대한 clc정보 mno_id 등이 company에 등록되어있는지여부.
        try{
            //기업테이블에서 해당 mngno clc사전 등록 중개사정보이며, 중개사타입 company등록 정보상에서 조회를 한다.이미 있는지 여부 검사.
            var [rows,fields]= await connection.query("select * from company where mng_no=? and type=?",[clcmngno,usertype]);
            
            console.log('company테이블 중개사업체 타입 리스트중에서 기 가입된 mngno clc정보가 있는지 검사',rows);
            
            if(rows.length > 0 || rows[0]){
                connection.release();
                return res.status(403).json('이미 가입되어있는 중개사회원clc정보입니다.');
            }
        }catch(err){
            console.log('company table eixsts query error');
            connection.release();

            return res.status(403).json('server or query error');
        }

        //중복여부 통과했으면..users에서 검사를 하는데, companay->users순으로 insert처리. user에서는 user_type중개사회원리스트중에서 해당 폰번호로 중복여부검사, 폰번호 중복검사.
        try{
            var [rows,fields] = await connection.query("select * from user where phone=? and user_type=?",[phone,usertype]);//해당 타입이면서 해당 번호가 존재하는지 폰 중복검사.

            console.log('user회원리스트 중개회원리스트중에서 입력폰번호 중복여부 검사',rows);

            if(rows.length > 0 || rows[0]){
                connection.release();
                return res.status(403).json('중개사 회원리스트에 이미 가입되어있는 휴대폰번호입니다.');
            }
        }catch(err){
            console.log('user table exits phone exists query error');
            connection.release();
            
            return res.status(403).json('server or query error');
        }

        //가입처리 진행 users,company테이블 inserted or updated진행.
        try{
            await connection.beginTransaction();
            var [rows,fields] = await connection.query("insert into company(mng_no,create_date,modify_date,type) values(?,?,?,?)",[clcmngno,new Date(),new Date(),usertype]);
            await connection.commit();
            //connection.release();

            console.log('company insert rows:',rows);

            var connection_local = await pool.getConnection(async conn => conn);//추가 insert작업용 커넥션풀
            console.log('connection local cget local gets:',connection_local,connection_local.query);

            if(rows && rows.insertId){
                //return res.json(name+','+phone+'::) 회원님 가입이 완료되었습니다.');
                //insert성공시에 정보에 insertId 기입된다. users삽입 성공시에 business에도 넣는다.
                
                console.log('comapny insert query susccess:========');
                let insert_companyid=rows.insertId;

                var hashed=bcrypt.hashSync(password,10);
                console.log('bcrypt암호화 진행 복잡도 (salt blur):',hashed);

                await connection_local.beginTransaction();
                var [rows2,fields2] = await connection_local.query("insert into user(company_id,phone,password,user_type,register_type,mem_admin,create_date,modify_date,mem_notification) values(?,?,?,?,?,?,?,?,?)",[insert_companyid,phone,hashed,usertype,'korex','root',new Date(),new Date(),is_select_agree]);

                await connection_local.commit();
                connection_local.release();  

                console.log('user insert rows:',rows2);
                

                if(rows2 && rows2.insertId){
                    //company,users에 모두 정보 insert성공시에 update형태의 쿼리 진행!
                    let insert_memid=rows2.insertId;//추가된 user테이블 추가된 mem_id값
                    
                    await connection.beginTransaction();
                    var [updaterows]= await connection.query("update company set mem_id=? where company_id=?",[insert_memid,insert_companyid]);
                    await connection.commit();
                    connection.release();

                    console.log('company테이블 update query setting 쿼리결과:',updaterows);

                    return res.json(phone+'::) 회원님 중개사 회원 가입이 완료되었습니다.');
                }else{
                    //여기에 온다는것은 business insert쿼리가 뭔가 안되었다는것임. 
                    return res.status(403).json('server insert query error');
                }
            }
            
        }catch(err){
            console.log('뭔 에러인가??:',err);

            await connection.rollback();
            connection.release();
            await connection_local.rollback();
            connection_local.release();

            console.log('server users or business insert query error!!');
            
            return res.status(403).json('server users or business insert query error');
        }

    }catch(err){
        console.error(err);
        return next(err);
    }
});
//중개사 인증 요청request(신규로 중개사 인증을 요청하는 경우에 처리)
app.post('/api/auth/broker/brokerVerifyRequest',async(req,res,next)=> {
    const { repname,phone, businessnumber }=req.body;
    console.log('/broker/brokerVerifyRequest 중개사 인증 요청(비동기형태 호출 형태 함수 실행체):',req.body);
    try{
        
        console.log('pool objexts??',pool,pool.getConnection);
        const connection = await pool.getConnection(async conn => conn);
        
        //중개사 인증 요청 에 그냥 계속 inserted요청을 가한다. 같은번호로 여러번 신청가능하게(재신청해야할수도있음)
        try{
            await connection.beginTransaction();
            var [rows,fields] = await connection.query("insert into BrokerIdentify(biy_phone,biy_status,create_date,modify_date) values(?,?,?,?)",[phone,0,new Date(),new Date()]);
            await connection.commit();
            connection.release();

            console.log('brokerIdentitfy insert rows:',rows);
            if(rows && rows.insertId){
                //return res.json(name+','+phone+'::) 회원님 가입이 완료되었습니다.');
                //insert성공시에 정보에 insertId 기입된다. users삽입 성공시에 business에도 넣는다.
                
                console.log('brokerIdentify insert query susccess:========');
                let insert_memid=rows.insertId;

                return res.json({success:true, messsage:'요청 성공했습니다.'});              
            }else{
                //여기에 온다는것은 쿼리가 뭔가 안되었다는것임. 
                return res.status(403).json({success:false, message:'요청에 실패했습니다'});
            }
            
        }catch(err){
            console.log('뭔 에러인가??:',err);

            await connection.rollback();
            connection.release();

            console.log('server or insert query error!!');
            
            return res.status(403).json({success:false, message:'요청에 실패했습니다.'});
        }

    }catch(err){
        console.error(err);
        return next(err);
    }
});

//개인 로그인
app.post('/api/auth/member/login',async function(req,res,next){
   // res.setHeader('Access-Control-Allow-Credentials', 'true');
    //res.setHeader('Access-Control-Allow-Origin:','*');
   //res.writeHead(200, {'Access-Control-Allow-Origin':'*'})
   res.setHeader('Access-Control-Allow-Credentials', 'true');

    let body=req.body;
    //console.log('request_origin:',req);
    console.log('req,body:',body);
    var req_email=body.login_email;
    var req_password=body.login_password;

    console.log('개인 로그인 요청 passport 쓰지 않고 post요청:',req_email,req_password);

    const connection= await pool.getConnection(async conn => conn);

    try{
        var sql="select * from user where email=? and user_type='개인'";//회원종류별 이메일 유니크하게 접속이기에 개인으로 xxxx메일로 로그인시도했으면 전체회원이 아니라, 개인에서 xxx메일 여부가 있는지검사
        var [users_email_exists,fields]=await connection.query(sql,[req_email]);

        console.log('users테이블에서 입력 email 검사 진행:',users_email_exists);

        if(users_email_exists.length == 0 || !users_email_exists[0]){
            connection.release();
            //rows 길이가 0이고, 결과index체가 없는경우!
            return res.status(403).json({success:false, data:null, message:'이메일 혹은 암호가 올바르지 않습니다.'});
        }else{
            //이메일이 존재하는 이메일이라면, 개인에서 존재하는 이메일이라면
            connection.release();
            const compare_results=bcrypt.compareSync(req_password,users_email_exists[0].password);
            if(compare_results){
                //입력 암호값,입력이메일에 대한 계정(개인) 암호가 암호화한게 서로 비교해서 같으면, 개인의 xxx이메일에 대한 적절암호로 입력한것.
                req.session.user_id=users_email_exists[0].mem_id;
                req.session.islogin=true;

                req.session.save(function(){
                    res.json({success:true, data:users_email_exists[0],message:'로그인 성공!'});
                });
            }else{
                res.status(403).json({success:false, data:null, message:'이메일 혹은 암호가 올바르지 않습니다.'});
            }
        }
    }catch(err){
        console.log('server or query Errror');
        connection.release();
        return res.status(403).json('users email exists query server error');
    }     
});

//기업 로그인
app.post('/api/auth/company/login',async function(req,res,next){
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
     //res.setHeader('Access-Control-Allow-Origin:','*');
    //res.writeHead(200, {'Access-Control-Allow-Origin':'*'})
    res.setHeader('Access-Control-Allow-Credentials', 'true');
 
     let body=req.body;
     //console.log('request_origin:',req);
     console.log('req,body:',body);
     var req_phone=body.login_phone;
     var req_password=body.login_password;
 
     console.log('기업 로그인 요청 passport 쓰지 않고 post요청:',req_phone,req_password);
 
     const connection= await pool.getConnection(async conn => conn);
 
     try{
         var sql="select * from user where phone=? and user_type='기업'";//회원종류별 휴대폰 유니크하게 접속이기에 xxxx번호에 대해서 각 회원 개인,기업,중개사,분양사 별로 한개씩은 존재가능.

         var [users_phone_exists,fields]=await connection.query(sql,[req_phone]);
 
         console.log('users테이블에서 입력 phone 검사 진행:',users_phone_exists);
 
         if(users_phone_exists.length == 0 || !users_phone_exists[0]){
             connection.release();
             //rows 길이가 0이고, 결과index체가 없는경우!
             return res.status(403).json({success:false, data:null, message:'휴대폰번호 혹은 암호가 올바르지 않습니다.'});
         }else{
             //존재하는 폰번호라면.
             connection.release();
             const compare_results=bcrypt.compareSync(req_password,users_phone_exists[0].password);
             if(compare_results){
                 //입력 암호값,입력이메일에 대한 계정(개인) 암호가 암호화한게 서로 비교해서 같으면, 개인의 xxx이메일에 대한 적절암호로 입력한것.
                 req.session.user_id=users_phone_exists[0].mem_id;
                 req.session.islogin=true;
 
                 req.session.save(function(){
                     res.json({success:true, data:users_phone_exists[0],message:'로그인 성공!'});
                 });
             }else{
                 res.status(403).json({success:false, data:null, message:'휴대폰번호 혹은 암호가 올바르지 않습니다.'});
             }
         }
     }catch(err){
         console.log('server or query Errror');
         connection.release();
         return res.status(403).json('server or query Errror');
     }        
});
//중개사 로그인
app.post('/api/auth/broker/login',async function(req,res,next){
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
     //res.setHeader('Access-Control-Allow-Origin:','*');
    //res.writeHead(200, {'Access-Control-Allow-Origin':'*'})
    res.setHeader('Access-Control-Allow-Credentials', 'true');
 
     let body=req.body;
     //console.log('request_origin:',req);
     console.log('req,body:',body);
     var req_phone=body.login_phone;
     var req_password=body.login_password;
 
     console.log('중개사 로그인 요청 passport 쓰지 않고 post요청:',req_phone,req_password);
 
     const connection= await pool.getConnection(async conn => conn);
 
     try{
         var sql="select * from user where phone=? and user_type='중개사'";//회원종류별 휴대폰 유니크하게 접속이기에 xxxx번호에 대해서 각 회원 개인,기업,중개사,분양사 별로 한개씩은 존재가능.

         var [users_phone_exists,fields]=await connection.query(sql,[req_phone]);
 
         console.log('users테이블에서 입력 phone 검사 진행:',users_phone_exists);
 
         if(users_phone_exists.length == 0 || !users_phone_exists[0]){
             connection.release();
             //rows 길이가 0이고, 결과index체가 없는경우!
             return res.status(403).json({success:false, data:null, message:'휴대폰번호 혹은 암호가 올바르지 않습니다.'});
         }else{
             //존재하는 폰번호라면.
             connection.release();
             const compare_results=bcrypt.compareSync(req_password,users_phone_exists[0].password);
             if(compare_results){
                 //입력 암호값,입력이메일에 대한 계정(개인) 암호가 암호화한게 서로 비교해서 같으면, 개인의 xxx이메일에 대한 적절암호로 입력한것.
                 req.session.user_id=users_phone_exists[0].mem_id;
                 req.session.islogin=true;
 
                 req.session.save(function(){
                     res.json({success:true, data:users_phone_exists[0],message:'로그인 성공!'});
                 });
             }else{
                 res.status(403).json({success:false, data:null, message:'휴대폰번호 혹은 암호가 올바르지 않습니다.'});
             }
         }
     }catch(err){
         console.log('server or query Errror');
         connection.release();
         return res.status(403).json('server or query Errror');
     }       
});
//분양대행사 로그인
app.post('/api/auth/agency/login',async function(req,res,next){
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
     //res.setHeader('Access-Control-Allow-Origin:','*');
    //res.writeHead(200, {'Access-Control-Allow-Origin':'*'})
    res.setHeader('Access-Control-Allow-Credentials', 'true');
 
     let body=req.body;
     //console.log('request_origin:',req);
     console.log('req,body:',body);
     var req_phone=body.login_phone;
     var req_password=body.login_password;
 
     console.log('분양사 로그인 요청 passport 쓰지 않고 post요청:',req_phone,req_password);
 
     const connection= await pool.getConnection(async conn => conn);
 
     try{
         var sql="select * from user where phone=? and user_type='분양대행사'";//회원종류별 휴대폰 유니크하게 접속이기에 xxxx번호에 대해서 각 회원 개인,기업,중개사,분양사 별로 한개씩은 존재가능.

         var [users_phone_exists,fields]=await connection.query(sql,[req_phone]);
 
         console.log('users테이블에서 입력 phone 검사 진행:',users_phone_exists);
 
         if(users_phone_exists.length == 0 || !users_phone_exists[0]){
             connection.release();
             //rows 길이가 0이고, 결과index체가 없는경우!
             return res.status(403).json({success:false, data:null, message:'휴대폰번호 혹은 암호가 올바르지 않습니다.'});
         }else{
             //존재하는 폰번호라면.
             connection.release();
             const compare_results=bcrypt.compareSync(req_password,users_phone_exists[0].password);
             if(compare_results){
                 //입력 암호값,입력이메일에 대한 계정(개인) 암호가 암호화한게 서로 비교해서 같으면, 개인의 xxx이메일에 대한 적절암호로 입력한것.
                 req.session.user_id=users_phone_exists[0].mem_id;
                 req.session.islogin=true;
 
                 req.session.save(function(){
                     res.json({success:true, data:users_phone_exists[0],message:'로그인 성공!'});
                 });
             }else{
                 res.status(403).json({success:false, data:null, message:'휴대폰번호 혹은 암호가 올바르지 않습니다.'});
             }
         }
     }catch(err){
         console.log('server or query Errror');
         connection.release();
         return res.status(403).json('server or query Errror');
     }       
});

//중개사(국가공간정보cls인증) 사업자번호에 대한 인증(존재하는건지 유효한건지, 존재하면 유효한것)
app.post('/api/auth/broker/broker_verify',async function(req,res,next){
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
 
     let body=req.body;
     //console.log('request_origin:',req);
     console.log('req,body:',body);
     var businessnumber=body.businessnumber;
 
     console.log('중개사 사업자번호인증하기 등록중개사여부 인증:',businessnumber);
 
     const connection= await pool.getConnection(async conn => conn);
 
     try{
         var sql="select * from clc_realtors where business_number=?";//회원종류별 휴대폰 유니크하게 접속이기에 xxxx번호에 대해서 각 회원 개인,기업,중개사,분양사 별로 한개씩은 존재가능.

         var [clcrealtors_info_exists,fields]=await connection.query(sql,[businessnumber]);
 
         console.log('국가공간정보포탈(clc)사전 등록된 중개사업자번호 인증조회',clcrealtors_info_exists);
 
         if(clcrealtors_info_exists.length == 0 || !clcrealtors_info_exists[0]){
             connection.release();
             //rows 길이가 0이고, 결과index체가 없는경우!
            return res.json({success:false, data:null, message:'존재하지 or 유효하지 않은 중개사 사업자번호입니다.'});
         }else{
             connection.release();
             //존재하는 사업자번호라면(사전 등록된 중개사회원 정보라면)
            return res.json({success:true, data:clcrealtors_info_exists[0],message:'유효한 or 존재하는 중개사 사업자번호입니다.'});                
        }
         
     }catch(err){
         console.log('server or query Errror');
         connection.release();
         return res.json({success:false, data:null, message:'server or query error'});
     }        
});

//로그인된 회원정보 쿼리진행
app.post('/api/auth/userinfo_request',async(req,res)=>{

    console.log('========로그인 회원정보 조회 쿼리진행===================');

    res.setHeader('Access-Control-Allow-Credentials','true');

    let body=req.body;
    console.log('red,body:',body);
    var mem_id=body.mem_id;

    const connection = await pool.getConnection(async conn => conn);

    try{
        var sql="select * from user where mem_id=?";

        var [rows]= await connection.query(sql,[mem_id]);

        console.log(' 로그인 회원정보 조회 쿼리진행===>>>',rows[0]);

        var get_userdata={
            mem_id : rows[0].mem_id,
            company_id : rows[0].company_id,
            user_username : rows[0].user_username,
            phone: rows[0].phone,
            email: rows[0].email,
            user_name : rows[0].user_name,
            mem_img : rows[0].mem_img,
            user_type : rows[0].user_type,
            register_type : rows[0].register_type,
            mem_admin : rows[0].mem_admin,
            mem_notification: rows[0].mem_notification,
            ispro : ''
        };
        console.log('make_getinfo userdsata:',get_userdata);

        if(rows.length == 0 || !rows[0]){
            connection.release();
            return res.json({success:false, data:null, message:'존재하지 않는 로그인정보입니다.', user_data : null});
        }else{
            var select_company_id=rows[0].company_id;

            if(select_company_id != null){
                console.log('select_copmpany_id:',select_company_id);
                var [company_rows] = await connection.query('select ispro from company where company_id=?',[select_company_id]);
                connection.release();
                get_userdata['ispro'] = company_rows[0].ispro;
            }else{
                //값이 null이면.
                console.log('select_company_id:',select_company_id);
                connection.release();
            }
            connection.release();
            return res.json({success:true, data:null, message:'존재하는 로그인정보입니다.', user_data : get_userdata});
        }
       
    }catch(err){
        console.log('server or query error',err);
        connection.release();
        return res.json({success:false, data:null, message:'server or query error', user_data : null});
    }
});
//로그인여부
app.get('/api/auth/islogin',async(req,res)=>{
    console.log('로그인 여부 검사, 원초적 방법으로 클라이언트 요청req 에 따른 서버에 저장한 세션유지여부:',req.session,req.user);

    if(req.session.user_id){
        return res.json({'login_session':req.session});
    }else{
        return res.json({'login_session':null});
    }
});
//공통 로그아웃
app.get('/api/auth/logout',(req,res,next) => {
    req.logout();
    req.session.save(function(){
        return res.json('로그아웃');
    });
});


//중개사 요청

//테스트 시험용===================================================================================
app.get('/api/auth/info',(req,res,next)=> {
    const info=req.user;
    return res.json(info);
});
console.log('로그인 로그아웃체크여부 모듈확인:');

app.get('/api/auth/signup',async(req,res,next)=>{
    console.log('singup회원가입폼 페이지 요청을 한다, isLogout상태인 경우에만 접근 가능, 로그아웃됀 상태인인경우에만 처리받음');
    res.render('signUp');

    console.log('req_sessioin:',req.session);
});
app.get('/api/auth/logintest',async(req,res,next)=>{
   let session=req.session;

   res.render('logintest',{
       session : session
   });
});
app.get('/api/auth/logoutss', async (req,res,next) => {
    console.log('logoutsss 로그아웃즈 페이지 요청을 한다, isLogin로그인상태인 경우에만 접근가능,그렇지 않으면 접근처리돼지않음.');
    res.render('signIn');

    console.log('req_sessioin:',req.session);
});
app.get('/api/auth/session_list',async(req,res)=>{
    //req.session.logined=true;
    //req.session.user_id='sdgsdgasdg';

    console.log('요청 req,res,세션존재리스트:',req.session,req.user);
    res.json({'req_user':req.user,'req_session':req.session});  
});

app.get('/api/auth/userinfo',function(req,res,next){
    if(req.cookies){
        console.log('req.cookies:',req.cookies);
    }
    res.send('환영합니다.!!!!');
});

app.use((req,res,next) => {
    res.status(404).send('not found');
});

app.listen(port,function(){
    console.log('========SERVER IS LISTENING ON '+port);
});

