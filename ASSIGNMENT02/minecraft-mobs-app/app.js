var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var mobsRouter = require("./routes/mobs");

// Database connection
var mongoose = require("mongoose");
var globals = require("./configs/globals"); // Import the global variables

//Import Passport
var passport = require("passport");
var session = require("express-session");
var User = require("./models/user");
var githubStrategy = require("passport-github2").Strategy;

// Import hbs for helper functions
var hbs = require("hbs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Config session
app.use(session({
  secret: "minecraft-mobs-app",
  resave: false,
  saveUninitialized: false
}));
//Init passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/mobs", mobsRouter);
// Init Passport Strategy
passport.use(User.createStrategy());
// Setup github oauth
passport.use(
  new githubStrategy(
    {
      clientID: globals.Github.clientID,
      clientSecret: globals.Github.clientSecret,
      callbackURL: globals.Github.callbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ oauthId: profile.id });
      if (user) {
        return done(null, user);
      } else {
        const newUser = new User({
          username: profile.username,
          oauthId: profile.id,
          oauthProvider: "GitHub",
          created: Date.now()
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
    }
  )
);
//Config passport to serialize and deserialize User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the MongoDB database
mongoose
  .connect(globals.ConnectionString.MongoDB)
  .then(() => {
    console.log("Connected to the MongoDB database!");
  })
  .catch((err) => {
    console.log("Error connecting to the MongoDB database...");
    console.log(err);
  });

// Register hbs helper functions
hbs.registerHelper("getSummonCommand", function (name, gameVersion) {
  // Check if the game version is Minecraft or a mod
  const summonMod = gameVersion.toLowerCase().includes('minecraft') ? 'minecraft' : gameVersion.toLowerCase();
  const summonMob = name.toLowerCase().replace(/ /g, '_');
  return `/summon ${summonMod}:${summonMob} ~ ~ ~`;
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
