const isLogin=(req,res,next) => {
    console.log('isLogin체크 함수 호출 상태값여부:',req.isAuthenticated());
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).json({message:'로그인이 필요합니다'});
    }
};
const isLogout=(req,res,next) => {
    console.log('isLogout체크 함수 호출상태값여부:',req.isAuthenticated());
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(403).json({message:'이미 로그인됀 상태입니다.'});
    }
};
module.exports= {
    isLogin,
    isLogout
};
