const express = require('express');
const router = express.Router();

// Importamos el Controlador 
const reviewController = require('../controllers/reviewController'); 
const verifyToken = require('../middlewares/auth');

// Rutas limpias 

router.get('/:movieId', reviewController.getMovieReviews);
router.post('/', verifyToken, reviewController.createReview);


module.exports = router;