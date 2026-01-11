const userController = require('../controllers/userController');
const favoritesController = require('../controllers/favoritesController'); 

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Rutas de usuario normales (login, register...)
router.post('/register', userController.register);
router.post('/login', userController.login);

// 2.Nuevo controlador para las rutas de favoritos
router.post('/favorites', auth, favoritesController.toggleFavorite);
router.get('/favorites', auth, favoritesController.getFavorites);

module.exports = router;