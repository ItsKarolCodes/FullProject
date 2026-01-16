const Review = require('../models/reviewModel');

// 1. OBTENER RESEÑAS (Lectura)
const getMovieReviews = async (req, res) => {
    try {
        // Obtenemos el ID de la película desde la URL (ej: /api/reviews/12345)
        const { movieId } = req.params;

        // Búsqueda en la DB:
        // .find({ movieId }): Filtra para traer solo las reseñas de ESA película concreta.
        // .sort({ createdAt: -1 }): Ordena por fecha. El -1 es "descendente" (la más reciente sale primero).
        const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar las reseñas' });
    }
};

// 2. CREAR RESEÑA (Escritura)
const createReview = async (req, res) => {
    try {
        // Extraemos los datos que el usuario escribió en el formulario
        const { movieId, rating, comment } = req.body;

        // VALIDACIÓN BÁSICA:
        // Si falta alguno de estos datos, rechazamos la petición antes de intentar guardar nada.
        if (!movieId || !rating || !comment) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        // Creamos la nueva instancia del modelo Review
        const newReview = new Review({
            movieId,
            // req.user viene del middleware de autenticación (el token JWT)
            // Guardamos el ID para saber quién fue internamente
            userId: req.user._id,       
            // Guardamos el nombre para mostrarlo rápido sin tener que buscar en la tabla de Usuarios
            username: req.user.username,   
            rating,
            comment
        });

        // Guardamos en MongoDB
        const savedReview = await newReview.save();
        
        // Devolvemos 201 (Created) y la reseña guardada para que el Frontend la añada a la lista al instante
        res.status(201).json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la reseña' });
    }
};

module.exports = { getMovieReviews, createReview  };