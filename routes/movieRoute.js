const router = require("express").Router();
const movieController = require('../controllers/movieController')
//const {isAuthenticated} = require("../utilities/authenticate");


router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getSingleMoviebyID);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);


module.exports = router