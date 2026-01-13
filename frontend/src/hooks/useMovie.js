import { useState, useEffect } from 'react';

// Hook personalizado para gestionar una sola película
export const useMovie = (id) => {
    // movie: Guarda el objeto con los datos (título, director, sinopsis...)
    const [movie, setMovie] = useState(null);
    // loading: Empieza en true para mostrar el "Cargando..." mientras buscamos los datos
    const [loading, setLoading] = useState(true);
    // error: Si la peli no existe o el servidor falla, guardamos el mensaje aquí
    const [error, setError] = useState(null);

    // 1. CARGAR PELÍCULA
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                // Reseteamos el error al intentar cargar de nuevo
                setError(null); 

                // Petición GET al backend usando la variable de entorno
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`);
                
                if (!response.ok) {
                    throw new Error("Película no encontrada");
                }
                
                const data = await response.json();
                // Guardamos la peli en el estado
                setMovie(data);
            } catch (err) {
                console.error(err);
                // Guardamos el mensaje para mostrarlo al usuario
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        // Solo intentamos buscar si hay un ID válido
        if (id) fetchMovie();
        //si cambia de peli en la URL, el hook recarga los datos nuevos
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

    // Devolvemos todo lo necesario para utilizarlo en los componentes
    return { movie, loading, error, deleteMovie };
};