const movieSchema = require('../models/Movie');


const getAllMovies = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movie = await movieSchema.find();
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch  movies' });
    }
};
 

const getSingleMoviebyID = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movieId = req.params.id; // Mongoose handles string to ObjectId conversion
        const movie = await movieSchema.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error.message);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
};



const createMovie = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        // Create a new instance of the schema with data from the request body
        const movie = new movieSchema({
            movieName: req.body.movieName,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            description: req.body.description,
            views: req.body.views,
            length: req.body.length
        });

        // Save the document to the database
        const response = await movie.save();

        // Send the response with the created document
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating movie:', error.message);

        // Handle validation errors or other issues
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message }); // Bad Request
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the movie' });
        }
    }
};


const updateMovie = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const movieId = req.params.id; // Mongoose will convert to ObjectId
        const updateMovieData = {
            movieName: req.body.movieName,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            description: req.body.description,
            views: req.body.views,
            length: req.body.length
        };

        const response = await movieSchema.findByIdAndUpdate(movieId, updateMovieData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the update against the schema
        });

        if (!response) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error updating movie:', error.message);
        res.status(500).json({ error: 'Some error occurred while updating the movie' });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const movieId = req.params.id; // Mongoose will convert to ObjectId
        const response = await movieSchema.findByIdAndDelete(movieId);

        if (!response) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting movie:', error.message);
        res.status(500).json({ error: 'Some error occurred while deleting the movie' });
    }
};



module.exports = {getAllMovies,getSingleMoviebyID,createMovie,updateMovie,deleteMovie};
