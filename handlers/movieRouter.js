const moment = require("moment"); // install moment to deal with the date management issue

/**
 * Returns all movies.
 * @param {object} app
 * @param {object} Movie
 * @returns {}
 */
function handleAllMovies(app, Movie) {
  app.route("/api/movies").get(function(req, resp) {
    Movie.find({})
      .then(function(data) {
        if (data.length === 0) {
          resp.json({ message: "There were no movies found" });
        } else {
        resp.json(data);
        }
      })
      .catch(function(err) {
        resp.json({ message: "Unable to connect to movies" });
      });
  });
}

/**
 * Only returns the number of movies that is provided by the parameter.
 * @param {object} app
 * @param {object} Movie
 * @returns {}
 */
const handleLimitMovies = (app, Movie) => {
  app.route("/api/movies/limit/:limit").get((req, resp) => {
    console.log(req.params.limit);
    const limit = parseInt(req.params.limit);

    Movie.find({})
      .limit(limit)
      .then((data) => {
        if (data.length === 0) {
          resp.json({ message: "There were no movies found" });
        } else {
          resp.json(data);
        }
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to movies" });
      });
  });
};
/**
 * Returns all the movies that match the provided id.
 * @param {object} app
 * @param {object} Movie
 */
const handleMoviesId = (app, Movie) => {
  app.get("/api/movies/:id", (req, resp) => {
    Movie.find({ id: req.params.id })
      .then((data) => {
        if (data.length === 0) {
          resp.json({ message: "There were no movies found" });
        } else {
          resp.json(data);
        }
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to Movies" });
      });
  });
};

/**
 *
 * @param {object} app
 * @param {object} Movie
 * @return {}
 */
const handleMoviestmdbId = (app, Movie) => {
  app.get("/api/movies/tmdb/:id", (req, resp) => {
    Movie.find({ tmdb_id: req.params.id })
      .then((data) => {
        if (data.length === 0) {
          resp.json({ message: "There were no movies found" });
        } else {
          resp.json(data);
        }
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to Movies" });
      });
  });
};

/**
 * Returns all movies that fall within the min and max range of the paremeters.
 * @param {object} app
 * @param {object} Movie
 * @return {}
 */
const handleMoviesRatings = (app, Movie) => {
  app.get("/api/movies/ratings/:min/:max", (req, resp) => {
    // dont need this but it is good practic
    const min = parseFloat(req.params.min);
    const max = parseFloat(req.params.max);

    if (min > max) {
      resp.json({ message: "Minimum value can not be more than Maximum" });
    } else {
      Movie.find()
        .where("ratings.average")
        .gte(min)
        .lte(max)
        .exec()
        .then((data) => {
          if (data.length === 0) {
            resp.json({ message: "There were no movies found" });
          } else {
            resp.json(data);
          }
        })
        .catch((err) => {
          resp.json({ message: "Unable to connect to movies" });
        });
    }
  });
};

// this works in compass {"release_date": {$gte: "2000",$lte: "2010"} }

/**
 * Returns the movies that have a release_date that is within the min and max parameters. 
 * @param {object} app
 * @param {object} Movie
 * @return {}
 */
const handleMoviesYearRange = (app, Movie) => {
  app.get("/api/movies/year/:min/:max", (req, resp) => {

    // dont need this but it is good practice to clean incoming data
    // console.log(req.params.min);
    // console.log(req.params.max);

    // console.log(typeof req.params.min);
    // console.log(typeof req.params.max);

    // const minYear = parseInt(req.params.min);
    // const maxYear = parseInt(req.params.max);

    // console.log(minYear);
    // console.log(maxYear);

    if (req.params.min > req.params.max) {
      resp.json({ message: "Minimum value can not be more than Maximum" });
    } else {
      // const startDate = moment(`${minYear}-01-01`);
      // const endDate = moment(`${maxYear}-12-31`);

      // console.log(startDate);
      // console.log(endDate);

      // const startDateString = startDate.format('YYYY-MM-DD');
      // const endDateString = endDate.format('YYYY-MM-DD');

      // console.log(startDateString);
      // console.log(endDateString);

      // console.log(startDate.format("YYYY-MM-DD"));
      // console.log(endDate.format("YYYY-MM-DD"));

      // console.log(typeof startDate.format("YYYY-MM-DD"));
      // console.log(typeof endDate);

      // const minDate = moment(req.params.min, "YYY-MM-DD");
      // const maxDate = moment(req.params.max, "YYY-MM-DD");

      // if (minDate > maxDate) {
      //   resp.json({ message: "Minimum value can not be more than Maximum" });
      // } else {
      // if (!startDate.isValid() || !endDate.isValid()) {
      //   resp.json({ message: "Invalid year format" });
      // } else {

      // Movie.find(
      //   {
      //     release_date: {
      //       $gte: `${req.params.min}`,
      //       $lte: `${req.params.max}`
      //     }
      //   }).exec()

      if (req.params.min > req.params.max) {
        resp.json({ message: "Minimum value can not be more than Maximum" });
      } else {
        Movie.find()
          .where("release_date")
          .gte(req.params.min)
          .lte(req.params.max)
          .exec()
          .then((data) => {
            if (data.length === 0) {
              resp.json({ message: "There were no movies found" });
            } else {
              resp.json(data);
            }
          })
          .catch((err) => {
            resp.json({ message: "Unable to connect to movies" });
          });
      }
    }
  });
};

// http://localhost:8080/api/movies/year/2000/2001

// const handleMovieTitle = (app, Movie) => {
//   app.get("/api/movies/title/:title", (req, resp) => {
//     Movie.find({title: req.params.title })
//       .then((data) => {
//         resp.json(data);
//       })
//       .catch((err) => {
//         resp.json({ message: "Unable to connect to Movies" });
//       });
//   });
// };

/**
 * Returns all the movies have the title parameter within its title.
 * @param {object} app
 * @param {object} Movie
 * @return {}
 */
const handleMoviesTitle = (app, Movie) => {
  app.get("/api/movies/title/:title", (req, resp) => {
    Movie.find({ title: new RegExp(req.params.title, "i") })
      .then((data) => {
        if (data.length === 0) {
          resp.json({ message: "There were no movies found" });
        } else {
          resp.json(data);
        }
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to Movies" });
      });
  });
};

/**
 * Returns all the movies that match the parameter's genre 
 * @param {object} app
 * @param {object} Movie
 * @return {}
 */
const handleMoviesGenre = (app, Movie) => {
  app.get("/api/movies/genre/:name", (req, resp) => {
    Movie.find({ "details.genres.name": new RegExp(req.params.name, "i") })
      .then((data) => {
        if (data.length === 0) {
          resp.json({ message: "There were no movies found" });
        } else {
          resp.json(data);
        }
      })
      .catch((err) => {
        resp.json({ message: "Unable to connect to Movies" });
      });
  });
};

module.exports = {
  handleAllMovies,
  handleLimitMovies,
  handleMoviesId,
  handleMoviesTitle,
  handleMoviestmdbId,
  handleMoviesGenre,
  handleMoviesRatings,
  handleMoviesYearRange,
};

// http://localhost:8080/api/movies
// http://localhost:8080/api/movies/13
// http://localhost:8080/api/movies/tmdb/14
// http://localhost:8080/api/movies/limit/5
// http://localhost:8080/api/movies/title/american
// http://localhost:8080/api/movies/genre/Action
// http://localhost:8080/api/movies/ratings/7.7/7.9
// http://localhost:8080/api/movies/ratings/11/12
// http://localhost:8080/api/movies/year/2000/2001
