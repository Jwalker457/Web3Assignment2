require('dotenv').config(); 
const path = require("path");
const express = require('express'); 
const app = express(); 
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const passport = require("passport");
const helper = require("./scripts/helpers.js");
const ejs = require("ejs");
require("./handlers/dataConnector.js").connect();

// serves up static files from the public folder. 
app.use(express.static('public')); 
// also add a path to static 
app.use('/static', express.static('public'));

const Movie = require('./models/Movie');

// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({extended: true})); 

// use the route handlers
const movieRouter = require('./handlers/movieRouter.js'); 
// Input movieRouter handlers here
movieRouter.handleAllMovies(app, Movie);
movieRouter.handleLimitMovies(app, Movie);
movieRouter.handleMoviesTitle(app, Movie);
movieRouter.handleMoviesId(app, Movie);
movieRouter.handleMoviestmdbId(app, Movie);
movieRouter.handleMoviesGenre(app, Movie);
movieRouter.handleMoviesRatings(app, Movie);
movieRouter.handleMoviesYearRange(app, Movie);
movieRouter.handleLoginPage(app, Movie);

/* --- middleware section --- */

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

// serves up static files from the public folder.
app.use("/static", express.static(path.join(__dirname, "public")));

// tell node to use json and HTTP header features
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(cookieParser("oreos"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use express flash, which will be used for passing messages
app.use(flash());

// set up the passport authentication
require("./scripts/auth.js");

app.get("/", helper.ensureAuthenticated, (req, res) => {
    res.render("home2.ejs", { user: req.user });
  });

  // login and logout routers here
app.get("/login2", (req, res) => {
    res.render("login2.ejs", { message: req.flash("error") });
  });

  app.post("/login2", async (req, resp, next) => {
    // use passport authentication to see if valid login
    passport.authenticate("localLogin", {
      successRedirect: "/",
      failureRedirect: "/login2",
      failureFlash: true,
    })(req, resp, next);
  });
  
  app.get("/logout2", (req, resp) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "You have been logged out.");
      resp.redirect("/login2");
    });
    // req.logout();
    // req.flash('info', 'You were logged out');
    // resp.render('login', {message: req.flash('info')} );
  });

//require('./handlers/dataConnector.js').connect(); 

const port = process.env.port; 
app.listen(port, () => { 
 console.log("Server running at port= " + port); 
});

app.use(function (req, res, next) { 
    res.status(404).send("Sorry can't find that!") 
   });

//http://localhost:8080/