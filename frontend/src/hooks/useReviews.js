import { useState, useCallback } from 'react';

export const useReviews = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. PUBLICAR REVIEW
    const addReview = async (reviewData) => {
        setLoading(true);
        setError(null);
        // Leemos el token justo en el momento de enviar
        const token = localStorage.getItem('token');

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al publicar opinión');
            }

            return data; // Devolvemos la review creada
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // 2. OBTENER REVIEWS (Esta no necesita token normalmente, es pública)
    const getReviews = useCallback(async (movieId) => {
        try {
            // Petición GET pública, no ponemos headers con token
            // Cualquiera puede leer las opiniones, aunque no esté registrado.
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reviews/${movieId}`);
            // Si falla, devolvemos array vacío (seguridad)
            if (!response.ok) return [];
            
            const data = await response.json();
            // Nos aseguramos de devolver siempre un Array. 
            // Si devolviéramos 'null', el .map() del componente explotaría.
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }, []);

    return { addReview, getReviews, loading, error };
};