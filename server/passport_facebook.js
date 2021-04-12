const auth_facebook=require('./auth_facebook');

module.exports= passport=> {
    passport.serializeUser((user,done) => {
        console.log('passoirt selirlzieUser함수실행:',user);
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=> {
        console.log('passport deserilaizeUser함수실행:',id,done);
        done(null,id);
    });
    auth_facebook(passport);
};
