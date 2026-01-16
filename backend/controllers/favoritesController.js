const User = require('../models/userModel'); 

// Función para dar/quitar like (Toggle)
const toggleFavorite = async (req, res) => {
    try {
        // 1. Obtenemos el ID de la peli (del cuerpo de la petición)
        const { movieId } = req.body;
        // 2. Obtenemos el ID del usuario (del token de sesión/middleware)
        const userId = req.user._id;

        // 3. Buscamos al usuario en la base de datos
        const user = await User.findById(userId);

        // 4. Comprobamos si la película YA existe en su array de favoritos
        // .indexOf devuelve la posición (0, 1, 2...) o -1 si no está.
        const index = user.favorites.indexOf(movieId);

        if (index === -1) {
            // === CASO: NO ESTÁ EN FAVORITOS (AÑADIR) ===
            
            // La empujamos al array
            user.favorites.push(movieId);
            // Guardamos cambios en MongoDB
            await user.save();
            
            // Devolvemos 'added: true' para que el Frontend pinte el corazón rojo
            return res.json({ 
                message: 'Añadido a favoritos', 
                favorites: user.favorites, 
                added: true 
            });

        } else {
            // === CASO: YA ESTÁ EN FAVORITOS (QUITAR) ===
            
            // .splice(posición, cantidad) elimina el elemento del array
            user.favorites.splice(index, 1);
            // Guardamos cambios
            await user.save();
            
            // Devolvemos 'added: false' para que el Frontend quite el color al corazón
            return res.json({ 
                message: 'Eliminado de favoritos', 
                favorites: user.favorites, 
                added: false 
            });
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

        // 1. Buscamos al usuario y usamos .populate()
        // SIN POPULATE: user.favorites sería algo como ["65a1b2...", "65a1b3..."] (solo IDs)
        // CON POPULATE: user.favorites es [{ title: "Matrix", year: 1999... }, { ... }]
        const user = await User.findById(userId).populate('favorites');

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // 2. Enviamos solo el array de favoritos, no el usuario entero
        res.json(user.favorites);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
};

module.exports = { toggleFavorite, getFavorites };