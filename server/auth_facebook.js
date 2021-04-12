//디비 관련 연결 필요
const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    port:3307,
    user:'sinja',
    password:'sinja',
    database:'passport_test'
});
connection.connect();

const LocalStrategy=require('passport-local').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const sha256=require('sha256');//이걸 그대로 사용이 가능한가?

const bcrypt=require('bcrypt');

const facebookKey= {
    clientID:'291887092371928',
    clientSecret:'f41732e09a7bef07e88909b8915710d9',
    callbackURL:'http://localhost:8999/auth/facebook/callback'
};

console.log('passport_facebook.js모듈의 auth_facebook()!! js실행에 의해서 실행, 파라미터전달 모듈로써 전달됄듯 define형태 앱 초기구동시 실행');

module.exports= passport => {
    console.log('모듈 함수 정의에 파라미터로써 passport전달.',passport);

    passport.use(
        new FacebookStrategy(facebookKey, (accessToken,refreshToken,profile,done) => {
            console.log('페이스북 전략수립, 페이스북에 대한 인증완료후 콜백형태로 호출:',accessToken,refreshToken,profile,done);

            console.log('facebook proilfeinfo:',profile,accessToken,refreshToken,done);

            const newuserid='facebook'+profile.id;
            const newuserpassword=sha256.x2(newuserid);

            const sql='select * from users where user_id=?';
            const post=[newuserid];

            connection.query(sql,post,(err,results,fields) => {
                if(err){
                    console.log(err);
                    done(err);
                }
                if(results.length == 0){
                    const sql='insert into users(user_id,password) values(?,?)';
                    const post=[newuserid,newuserpassword];
                    connection.query(sql,post,(err,results,fields) => {
                        if(err){
                            console.log(err);
                            done(err);
                        }
                        const sql='select * from users where user_id=?';
                        const post=[newuserid];
                        connection.query(sql,post,(err,results,fields) => {
                            if(err){
                                console.log(err);
                                done(err);
                            }
                            const user=results[0];
                            return done(null,user);
                        });
                    });
                }else{
                    const user=results[0];
                    return done(null,user);
                }
            });
        })
    );
};
