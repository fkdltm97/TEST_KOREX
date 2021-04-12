const express=require('express');
const router=express.Router();
const passport=require('./passport.js');

console.log('이 파일 자체가 실행??아니면 라우터 지정 페이지함수만 실행??');

router.get('/',(req,res)=>{
    res.render('indexs',{title:'인댁스'});
});

router.post('/',async function(req,res,next){
    console.log('user/json =>>>',req.body.user_id,req.body.password,next);

    try{
        passport.authenticate('local-login',{
            successRedirect:'/loginSuccess',
            failureRedirect:'/loginFail',
            failureFlash:true
        }, (err,users,info) => {
            console.log('로컬 로그인 authenticate함수 외부함수 호출이후, 해당 함수에서 callback호출함수 전송 파라미터:',err,users,info);

            if(err){

            }
            if(info){

            }
            console.log('users인포:',users);
            return req.login(users,async(err)=>{
                console.log('req.login reutnr 형 함수 구조 실행:',next);
                if(err){
                    res.redirect('/loginFail');
                    return next(err);
                }
                return res.json(users);
            });
        })(req,res,next);
    }catch(err){

    }
});

/*passport.authenticate('local-login',{
    successRedirect:'/loginSuccess',
    failureRedirect:'/loginFail',
    failureFlash:true
})*/

router.get('/loginSuccess',(req,res)=>{
    res.render('loginSuccess');
});

router.get('/session_list',(req,res)=>{
    console.log('요청 req,res,세션존재리스트:',req.session,req.user);
    res.json({'req_user':req.user,'req_session':req.session});
});
router.get('/loginFail',(req,res)=>{
    res.render('loginFail');
});

router.get('/logout',function(req,res){
    console.log('로그아웃 처리후 main이동');
    req.logout();
    req.session.save(function(){
        res.redirect('/');
    });
});

module.exports=router;
