//디비 관련 연결 필요
const mysqls=require('mysql2/promise');
const pool= mysqls.createPool({
    host:'localhost',
    port:3307,
    user:'sinja',
    password:'sinja',
    database:'korex'
});

const LocalStrategy=require('passport-local').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const sha256=require('sha256');//이걸 그대로 사용이 가능한가?

const bcrypt=require('bcrypt');

const facebookKey= {
    clientID:'291887092371928',
    clientSecret:'f41732e09a7bef07e88909b8915710d9',
    callbackURL:'http://localhost:8080/auth/social/facebook/callback'
};

console.log('passport_facebook.js모듈의 auth_facebook()!! js실행에 의해서 실행, 파라미터전달 모듈로써 전달됄듯 define형태 앱 초기구동시 실행');


module.exports= passport => {
    console.log('모듈 함수 정의에 파라미터로써 passport전달.',passport);

    passport.use(
        new FacebookStrategy(facebookKey, async (accessToken,refreshToken,profile,done) => {
            console.log('ppool objectss:',pool,pool.getConnection);
            const connection = await pool.getConnection(async conn => conn);

            console.log('페이스북 전략수립, 페이스북에 대한 인증완료후 콜백형태로 호출:',accessToken,refreshToken,profile,done);

            console.log('facebook proilfeinfo:',profile,accessToken,refreshToken,done);

            const newuserid='facebook'+profile.id;
            const newuserpassword=sha256.x2(newuserid);

            const post=[newuserid];

            /*connection.query(sql,post,(err,results,field888888s) => {
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
            });*/

            //소셜 페이스북 가입 회원 존재여부 검사한다. 개인회원 한정임.
            try{
                var [rows,fields]= await connection.query("select * from user where user_username=? and user_type='개인'",[post]);

                console.log('user 개인회원리스트에서 해당 인증 페이스북아이디 회원 존재여부검사:',rows);

                if(rows.length> 0 || rows[0]){
                    connection.release();

                    const user=rows[0];
                    return done(null,user);
                }else{
                    //connection.release(); 해당 회원 존애안할시 신규 소셜가입시킨다.한번 더 쓰이기에 realsee보류
                    try{
                        const facebook_insert_query='insert into user(user_username,password,user_type) values(?,?,?)';
                        
                        await connection.beginTransaction();
                        var [insertrows,fields]= await connection.query(facebook_insert_query,[newuserid,newuserpassword,'개인']);

                        await connection.commit();
                        connection.release();

                        console.log('social facebook login users register insertquery:',insertrows);

                        //insert직후에 확인되는 막 추가된 해당정보 개인회원중 facebookid값 확인한다.
                        var [confirmrows,fields] = await connection.query("select * from user where user_username=? and user_type='개인'",[post]);
    
                        if(confirmrows.length > 0 || confirmrows[0]){
                            connection.release();

                            const user=confirmrows[0];

                            return done(null,user);
                        } 
                        
                    }catch(err){
                        console.log('뭔 에러인가?:',err);

                        await connection.rollback();
                        connection.release();

                        console.log('server facebook insert query errors');

                        return done(err);
                    }
                }
            }catch(err){
                console.log('server query exist query server error');
                connection.release();

                done(err);
            }
        })
    );
};
