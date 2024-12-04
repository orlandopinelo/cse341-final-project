/** Required Variables **/
const express = require('express');
const router = express.Router();


/** Routes **/
// This intro can get changed later on
router.get('/', (req, res) => {res.json( 'Hello! Welcome to the api! You are running and are connected to the db!' )});
// Add a route to swagger documentation later...
// Routes to all the other routers
router.use('/books', require('./bookRoute'));
router.use('/movies', require('./movieRoute'));
router.use('/videogames', require('./videogameRoute'));
router.use('/users', require('./userRoute'));



/** Export **/
module.exports = router;