import { useState } from 'react';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Usuario o contraseña incorrectos");
            }

            // --- ÉXITO ---
            // Aquí mismo guardamos el token
            localStorage.setItem('token', data.token);
            
            return true; // Devolvemos true para que el componente sepa que debe redirigir

        } catch (err) {
            console.error(err);
            setError(err.message || "Error de conexión");
            return false; // Falló
        } finally {
            setLoading(false);
        }
    };

    return { loginUser, loading, error };
};