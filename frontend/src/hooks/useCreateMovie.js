import { useState } from 'react';

export const useCreateMovie = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Funcionb principal: recibe 'movieData', que es el objeto que viene del formulario.
    const createMovie = async (movieData) => {
        setLoading(true);
        setError(null);
        
        //  Recuperamos el token para tener permiso, sin el el backend rechazaria la peticion
        const token = localStorage.getItem('token');

        // Petición al servidor
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token 
                },
                body: JSON.stringify(movieData),
            });

            const data = await response.json();

            // Si el servidor responde 400 o 500, fetch no lanza error automáticamente.
            // Tenemos que verificar 'ok' manualmente.
            if (!response.ok) {
                throw new Error(data.message || 'Error al crear la película');
            }

            return true; // Éxito
        } catch (err) {
            setError(err.message);
            return false; // Fallo
        } finally {
            // Pase lo que pase (éxito o error), apagamos el spinner.
            setLoading(false);
        }
    };

    // Devolvemos la función y los estados para que el componente los use.
    return { createMovie, loading, error };
};