import { useState } from 'react';

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Recibe 'userData', es decir un objeto como: { username: "Alex", email: "...", password: "..." }
    const registerUser = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            // 3. PETICIÓN PÚBLICA (SIN TOKEN)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al registrarse');
            }

            return true; // Éxito: El componente sabrá que puede redirigir al Login
        } catch (err) {
            setError(err.message || 'Error de conexión');
            return false; // Fallo: El componente se queda aquí y muestra el error
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error };
};