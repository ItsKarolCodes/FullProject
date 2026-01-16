import { useState, useCallback } from 'react';

// Hook para gestionar el LISTADO de películas
export const useMovies = () => {
    // 'movies': Empieza como array vacío [] porque aún no hemos descargado nada.
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    //  Obtener TODAS las películas
    // Usamos 'useCallback' para memorizar la función. 
    // Esto evita bucles infinitos si la ponemos en un useEffect en otro componente.
    const getMovies = useCallback(async () => {
        // Encendemos la carga
        setLoading(true);
        try {
            // Petición GET a la ruta (no necesita token para VER el catálogo)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies`);
            const data = await response.json();
            // Guardamos el array de películas en el estado
            setMovies(data);
        } catch (error) {
            console.error("Error cargando películas:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    //  BORRAR una película (Protegida)
    const deleteMovie = async (id) => {
        // Recuperamos el token porque solo un Admin puede borrar
        const token = localStorage.getItem('token');

        try {
            // Petición DELETE al backend
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Si se borró bien en el servidor, la quitamos de la lista visualmente
                // borramos la película de la lista que ya tenemos en memoria
                setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
                return true;
            }
        } catch (error) {
            console.error("Error eliminando película:", error);
        }
        return false;
    };

    // ACTUALIZAR 
    const updateMovie = async (id, movieData) => {
        const token = localStorage.getItem('token');
        setLoading(true); // Opcional: poner loading global

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });

            if (response.ok) {
                const updatedMovie = await response.json();
                
                // Actualizamos la lista local para que la tabla cambie al instante
                setMovies(prevMovies => 
                    prevMovies.map(movie => movie._id === id ? updatedMovie : movie)
                );
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
    // Devolvemos los datos y las funciones para usarlo
    return { movies, getMovies, deleteMovie, updateMovie, loading };
};