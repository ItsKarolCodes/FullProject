import { useState, useEffect } from 'react';

// Hook personalizado para gestionar una sola película
export const useMovie = (id) => {
    // movie: Guarda el objeto con los datos (título, director, sinopsis...)
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. CARGAR PELÍCULA
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
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
                return true; 
            } else {
                return false; 
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // 3. ACTUALIZAR (Corregido)
    const updateMovie = async (id, movieData) => {
        setLoading(true);
        const token = localStorage.getItem('token'); 

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(movieData)
            });
            
            if (res.ok) {
                const updatedMovie = await res.json();
                
                
                setMovie(updatedMovie);
                
                return true; 
            } else {
                console.error("Error al actualizar");
                return false;
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { movie, loading, error, deleteMovie, updateMovie };
};