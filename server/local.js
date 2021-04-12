const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');

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

console.log('pasoirts.js의 local실행에 의해서 실행:');

module.exports= passport => {
    passport.use(
        new LocalStrategy(
            {
                usernameField:'user_id',
                passwordField:'password',
                session:true
            },
            async(user_id,password,done) => {
                try{

                    var sql="select * from users where user_id=?";
                    var query=connection.query(sql,[user_id],function(err,datas){
                        var existed=undefined;
                        console.log('쿼리결과(로그인시도시에:아이디발견시에):',datas,datas.length);
                        if(err){

                        }
                        if(datas.length){
                            existed=datas[0];//발견데이터중에서 하나(유일 식별아이디 하나)첫 요소.row리턴.
                        }else{

                            existed=false;
                        }

                        console.log('위아래 실행 직렬?동기형태? existed값',existed,existed.password);

                        if(existed){
                            //const result=await bcrypt.compare(password,existed.password);
                            const result=bcrypt.compareSync(password,existed.password);//sync버전
                            if(result){
                                done(null,existed);
                            }else{
                                done(null,false,{
                                    message:'아이디 혹은 암호가 올바르지 않습니다.'
                                });
                            }
                        }else{
                            done(null,false,{
                                message:'아이디 혹은 암호가 올바르지 않습니다.'
                            });
                        }
                    });

                }catch(err){
                    console.error(err);
                    done(err);
                }
            }
        )
    );
};
