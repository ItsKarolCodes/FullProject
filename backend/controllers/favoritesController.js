const User = require('../models/userModel'); 

// Función para dar/quitar like
const toggleFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        const index = user.favorites.indexOf(movieId);

        if (index === -1) {
            user.favorites.push(movieId);
            await user.save();
            return res.json({ message: 'Añadido a favoritos', favorites: user.favorites, added: true });
        } else {
            user.favorites.splice(index, 1);
            await user.save();
            return res.json({ message: 'Eliminado de favoritos', favorites: user.favorites, added: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar favoritos' });
    }
};

// Función para obtener la lista de favoritos 
const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        // .populate cambia IDs por objetos completos
        const user = await User.findById(userId).populate('favorites');

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
};

module.exports = { toggleFavorite, getFavorites };