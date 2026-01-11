import { useState, useEffect } from 'react';


export const useMovie = (id) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. CARGAR PELÍCULA
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                // Reseteamos el error al intentar cargar de nuevo
                setError(null); 
                
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`);
                
                if (!response.ok) {
                    throw new Error("Película no encontrada");
                }
                
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchMovie();
    }, [id]);

    // 2. BORRAR PELÍCULA
    const deleteMovie = async () => {
        const token = localStorage.getItem('token');
        
       try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            });

            if (response.ok) {
                return true; // Éxito
            } else {
                return false; // Fallo
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // Devolvemos todo lo necesario
    return { movie, loading, error, deleteMovie };
};