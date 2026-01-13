import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
    // Aquí guardamos quién es la persona (ID, nombre, rol...)
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    // Nos dice en qué URL estamos ahora mismo.
    const location = useLocation(); 

    // Este useEffect se ejecuta CADA VEZ que el usuario cambia de página (location).
    useEffect(() => {
        checkLogin();
    }, [location]); 

    //COMPROBAR IDENTIDAD
    const checkLogin = () => {
        const token = localStorage.getItem('token');
        
        // 1. Si no hay token, no hay usuario
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        // B. Si hay token, intentamos leerlo.
        try {
            // 2. Intentamos decodificarlo
            const decoded = jwtDecode(token);
            
            // 3. Si funciona, guardamos los datos del usuario
            setUser(decoded);

        } catch (error) {
            // 4. Si falla  cerramos sesión
            console.error("Token inválido");
            logout(); 
        } finally {
            // Terminamos de cargar
            setLoading(false);
        }
    };

    // 5. FUNCIÓN DE SALIR (Cerrar Sesión)
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    // Devolvemos las herramientas para usarlas en los componentes
    return { user, loading, logout };
};