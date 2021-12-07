const db = require("../database/models");
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll({
      include: [{ association: "genre" }],
    }).then((movies) => {
      res.render("moviesList.ejs", { movies });
    });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: [{ association: "genre" }],
    }).then((movie) => {
      res.render("moviesDetail.ejs", { movie });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
  add: function (req, res) {
    db.Genre.findAll().then((genres) => {
      res.render("moviesAdd.ejs", { genres: genres });
    });
  },

  create: function (req, res) {
    db.Movie.create({
      title: req.body.title,
      rating: req.body.rating,
      length: req.body.length,
      awards: req.body.awards,
      release_date: req.body.release_date,
      genre_id: req.body.genre,
    })
      .then(function (movies) {
        console.log(req.body);
        return res.redirect("/movies");
      })
      .catch(function (errors) {
        return res.send(errors);
      });
  },
  edit: function (req, res) {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesEdit.ejs", { Movie: movie });
    });
  },
  update: function (req, res) {
    db.Movie.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        length: req.body.length,
        awards: req.body.awards,
        release_date: req.body.release_date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function (results) {
      return res.redirect("/movies");
    });
  },
  delete: function (req, res) {
    // TODO
  },
  destroy: function (req, res) {
    // TODO
  },
};

module.exports = moviesController;
