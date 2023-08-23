const User = require("../models/user");

module.exports.profile = function (req, res) {
     return res.render("userprofile", {
          title: "User Profile",
          profile_user: req.user,
     });
};
module.exports.updateUser = async function (req, res) {
     try {
          const user = await User.findById(req.user.id);
          const { username, password, confirm_password } = req.body;
          if (password != confirm_password) {
               return res.redirect("back");
          }

          if (!user) {
               return res.redirect("back");
          }
          user.username = username;
          user.password = password;

          user.save();
          return res.redirect("back");
     } catch (err) {
          console.log(err);
          return res.redirect("back");
     }
};

module.exports.signIn = (req, res) => {
     if (req.isAuthenticated()) {
          return res.redirect("/profile");
     }
     return res.render("signin.ejs");
};
module.exports.signUp = (req, res) => {
     if (req.isAuthenticated()) {
          return res.redirect("/profile");
     }
     return res.render("signup.ejs");
};
module.exports.create = async (req, res) => {
     try {
          const { username, email, password, confirm_password } = req.body;
          if (password != confirm_password) {
               return res.redirect("back");
          }
          User.findOne({ email:email },async (err, user) => {
               if (err) {
                    console.log("Error in finding user in signing up",err);
                    return;
               }

               if (!user) {
                    await User.create(
                         {
                              email,
                              password,
                              username,
                         }).then(
                         (err, user) => {
                              if (err) {
                                   console.log("Couldn't sign Up",err);
                              }
                              return res.redirect("/");
                         }
                    );
               } else {
                    console.log("error", "Email already registed!");
                    return res.redirect("back");
               }
          });
     } catch (err) {
          console.log(err);
     }
};
module.exports.createSession = (req, res) => {
     return res.redirect("/dashboard");
};
module.exports.destroySession = (req, res) => {
     req.logout((err) => {
          if (err) {
               return next(err);
          }
          return res.redirect("/");
     });
};
