const passport = require('passport');
const User=require('../models/user');
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({
   usernameField:"email",
   passReqToCallback:true
},
function(req, email,password,done) {
    User.findOne({email:email},async function(err,user){
        if (err){
            console.log("error in finding the user", err);
            return done(err);
        }
        if(!user){
            console.log('Invalid username or password');
            return done(null,false);
        }
        const isPassword= await user.isValidatePassword(password);
        if (!isPassword) {
            console.log("Invalid Username or Password");
            return done(null, false);
          }
          return done(null, user);
    })
}
));

passport.serializeUser(function(user,done){
    return done(null,user.id); 
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user ---> Passport");
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/");
}
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
    }
    next();
  };
  
  module.exports = passport;