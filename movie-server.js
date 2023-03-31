require('dotenv').config(); 

const express = require('express'); 
const app = express(); 

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





// bookRouter.handleSingleBook(app, Book);  
// bookRouter.handleBooksByPageRange(app, Book);
// bookRouter.handleCreateBook(app, Book); 

require('./handlers/dataConnector.js').connect(); 

const port = process.env.port; 
app.listen(port, () => { 
 console.log("Server running at port= " + port); 
});

app.use(function (req, res, next) { 
    res.status(404).send("Sorry can't find that!") 
   });