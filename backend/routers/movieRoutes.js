const express = require('express');
const router = express.Router();

// Importamos el controlador 
const movieController = require('../controllers/movieController');
//solo logueados
const verifyToken = require('../middlewares/auth');

// Definimos las rutas
// GET: obtener todas las peliculas
router.get('/', movieController.getMovies);

// GET: Obtener una pelicula por ID
router.get('/:id', movieController.getMovieById);

// POST: crear pelicula
router.post('/', movieController.createMovie);


// Actualizar una pelicula por ID
router.put('/:id', movieController.updateMovie);

// Borrar una película por ID
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
