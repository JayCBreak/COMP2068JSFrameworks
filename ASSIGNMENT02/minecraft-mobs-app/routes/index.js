var express = require("express");
var User = require("../models/user");
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Minecraft - Mobs Database", user: req.user });
});

// GET /login
router.get("/login", function (req, res, next) {
  let messages = req.session.messages || [];

  req.session.messages = [];

  res.render("login", { title: "Login", messages: messages });
});

// POST /login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/mobs",
  failureRedirect: "/login",
  failureMessage: "Invalid Credentials"
}));

// GET /register
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register A New Account" });
});

// POST /register
router.post("/register", function (req, res, next) {
  // Create a new user
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      } else {
        req.login(newUser, (err) => {
          res.redirect("/mobs");
        });
      }
    }
  );
});

// GET /logout
router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
