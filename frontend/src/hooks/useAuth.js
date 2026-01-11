import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        checkLogin();
    }, [location]); 

    const checkLogin = () => {
        const token = localStorage.getItem('token');
        
        // 1. Si no hay token, no hay usuario
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // 2. Intentamos decodificarlo
            const decoded = jwtDecode(token);
            
            // 3. Si funciona, guardamos los datos del usuario
            setUser(decoded);

        } catch (error) {
            // 4. Si falla  cerramos sesión
            console.error("Token inválido o corrupto");
            logout(); 
        } finally {
            // Terminamos de cargar
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return { user, loading, logout };
};