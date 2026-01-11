import { useState } from 'react';
import { useAuth } from './useAuth'; 

export const useFavorites = () => {
    // Necesitamos el usuario actual para saber qué tiene en su lista localmente
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(false);

    const isFavorite = (movieId) => {
        // Si no hay usuario o lista de favoritos, devuelve false
        if (!user || !user.favorites) return false;

        // .some recorre el array y devuelve true si encuentra coincidencia
        return user.favorites.some(fav => {
            // "fav" puede ser solo el ID "string" (si no está poblado)
            // o un Objeto completo con propiedad _id (si está poblado)
            const favId = typeof fav === 'object' ? fav._id : fav;
            return favId === movieId;
        });
    };
    //Dar o quitar like
    const toggleFavorite = async (movieId) => {
        // Validación de seguridad visual
        if (!user) {
            alert("Debes iniciar sesión para añadir favoritos");
            return false;
        }

        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ movieId })
            });

            if (response.ok) {
                const data = await response.json();
                return data.added; 
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar favoritos:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // OBTENER LISTA COMPLETA (Para el Dashboard)
    
    const getMyFavorites = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/favorites`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                // Devolvemos el array de películas (o array vacío si no hay)
                return Array.isArray(data) ? data : [];
            }
            return [];
        } catch (error) {
            console.error("Error al cargar favoritos:", error);
            return [];
        }
    };

    // Exportamos todo para usarlo en los componentes
    return { isFavorite, toggleFavorite, getMyFavorites, loading };
};