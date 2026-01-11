import { useState, useCallback } from 'react';

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Obtener TODAS las películas (Pública)
    const getMovies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies`);
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error cargando películas:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. BORRAR una película (Protegida)
    const deleteMovie = async (id) => {
        const token = localStorage.getItem('token');
        
        // Confirmación de seguridad
        if (!window.confirm("¿Estás seguro? Esta acción no se puede deshacer.")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Si se borró bien en el servidor, la quitamos de la lista visualmente
                setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
                return true;
            }
        } catch (error) {
            console.error("Error eliminando película:", error);
        }
        return false;
    };

    return { movies, getMovies, deleteMovie, loading };
};