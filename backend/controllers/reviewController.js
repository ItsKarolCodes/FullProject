const Review = require('../models/reviewModel');

// 1. OBTENER RESEÑAS
const getMovieReviews = async (req, res) => {
    try {
        const { movieId } = req.params;
        const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar las reseñas' });
    }
};

// 2. CREAR RESEÑA
const createReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;

        if (!movieId || !rating || !comment) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const newReview = new Review({
            movieId,
            userId: req.user._id,       
            username: req.user.username,   
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la reseña' });
    }
};


// Exportamos las funciones para usarlas en las rutas
module.exports = { getMovieReviews, createReview  };