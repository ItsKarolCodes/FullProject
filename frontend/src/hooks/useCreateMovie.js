import { useState } from 'react';

export const useCreateMovie = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createMovie = async (movieData) => {
        setLoading(true);
        setError(null);
        
        //  Recuperamos el token para tener permiso
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token // <--- ¡AQUÍ ESTÁ LA CLAVE! 🔑
                },
                body: JSON.stringify(movieData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear la película');
            }

            return true; // Éxito
        } catch (err) {
            setError(err.message);
            return false; // Fallo
        } finally {
            setLoading(false);
        }
    };

    return { createMovie, loading, error };
};