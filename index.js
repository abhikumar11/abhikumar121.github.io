const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const db = require("./config/mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");

app.use(
     bodyparser.urlencoded({
          extended: false,
     })
);
const session = require("express-session");
const passport = require("passport");
const passportlocal = require("./config/passport");
const mongostore = require("connect-mongo");
app.use(cookieparser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
     session({
          name: "placement_cell",
          secret: "e3eIJ!9Xt39W",
          saveUninitialized: false,
          resave: false,
          cookie: {
               maxAge: 1000 * 60 * 60,
          },
          store: mongostore.create({
               mongoUrl: "mongodb://localhost:27017/placementcell",
               autoRemove: "disabled",
          }),
          function(err) {
               console.log(err || "Connected to Database");
          },
     })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(require("./routes"));
app.use(bodyparser.json());

app.listen(port, (err) => {
     if (err) {
          console.log("Something went wrong");
          return;
     }
     console.log(`listening on port ${port}`);
});
