import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; 
import { useFavorites } from '@/hooks/useFavorites'; 
import { useMovies } from '@/hooks/useMovies'; 
import MovieCard from '@/components/MovieCard';
import MovieSearch from '@/components/MovieSearch';

const Dashboard = () => {
    // === 1. HOOKS Y HERRAMIENTAS ===
    const navigate = useNavigate();// Para redirigir al usuario
    const { user, loading: authLoading, logout } = useAuth();// Extraemos info del usuario logueado
    
    // Hooks de datos
    const { getMyFavorites } = useFavorites(); 
    const { movies, getMovies, deleteMovie } = useMovies(); 

    // Estados locales
    const [favorites, setFavorites] = useState([]); // Lista de pelis favoritas
    const [loadingFavs, setLoadingFavs] = useState(true); // Para mostrar "Cargando..." mientras buscamos favoritos
    const [searchTerm, setSearchTerm] = useState(''); // Lo que el admin escribe en el buscador
    

    // Protección de ruta
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    // 3. CARGA DE DATOS
    // Dependiendo de si eres Admin o User, cargamos cosas distintas. 
    useEffect(() => {
        const loadData = async () => {
            if (user?.role === 'user') {
                // Si es usuario, cargamos favoritos
                const data = await getMyFavorites();
                setFavorites(data);
                setLoadingFavs(false);
            } else if (user?.role === 'admin') {
                // Si es admin, cargamos TODAS las películas para gestionar
                await getMovies();
            }
        };
        
        if (user) loadData();
    }, [user]); // Se ejecuta al cargar el usuario

    // Lógica de filtrado
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (authLoading) return <div className="p-10 text-center text-gray-500">Cargando panel... ⏳</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-stone-900 transition-colors duration-300">
            
            <div className="container mx-auto p-6 md:p-10"></div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Panel de {user.role === 'admin' ? 'Administrador 🛠️' : 'Usuario 👤'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Bienvenidx <b className="text-rose-600">{user.username}</b>
                        </p>
                    </div>
                    
                    {/* Botón Cerrar Sesión movido aquí */}
                    <button 
                        onClick={logout} 
                        className="btn btn-red shadow-lg shadow-red-500/20"
                    >
                        Cerrar Sesión
                    </button>
                </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="container mx-auto p-6 md:p-10">

                {/* === ZONA ADMIN === */}
                {user.role === 'admin' && (
                    <div className="mb-12 space-y-8">
                        <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl shadow-sm">
                            
                            {/* Cabecera Admin */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-rose-700 dark:text-rose-400">
                                        ⚙️ Gestión del Videoclub
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        Gestiona el catálogo completo.
                                    </p>
                                </div>
                                <Link to="/create" className="btn btn-primary">
                                    + Añadir Película
                                </Link>
                            </div>

                            {/* TABLA CON BUSCADOR */}
                            <div className="card-stone !p-0 overflow-hidden">
                                
                                <div className="p-4 bg-gray-50 dark:bg-stone-700 border-b border-gray-200 dark:border-stone-600 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <h3 className="font-bold text-gray-700 dark:text-gray-200">
                                        Catálogo ({filteredMovies.length} películas)
                                    </h3>
                                    
                                    {/* 2. USAMOS EL NUEVO COMPONENTE AQUÍ 👇 */}
                                    {/* Le pasamos el estado y la función para actualizarlo */}
                                    <MovieSearch 
                                        searchTerm={searchTerm} 
                                        setSearchTerm={setSearchTerm} 
                                    />

                                </div>
                                
                                <div className="max-h-96 overflow-y-auto">
                                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                                        <tbody className="divide-y divide-gray-100 dark:divide-stone-700">
                                            {filteredMovies.length > 0 ? (
                                                filteredMovies.map((movie) => (
                                                    <tr key={movie._id} className="hover:bg-gray-50 dark:hover:bg-stone-700/50 transition">
                                                        <td className="p-4 font-medium text-gray-800 dark:text-white">
                                                            {movie.title}
                                                        </td>
                                                        <td className="p-4 text-gray-500 text-xs hidden sm:table-cell">
                                                            {movie.year}
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <button 
                                                                onClick={() => deleteMovie(movie._id)}
                                                                className="btn btn-red"
                                                            >
                                                                Eliminar 🗑️
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="p-8 text-center text-gray-400 italic">
                                                        No se encontraron películas con "{searchTerm}"
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* === ZONA USUARIO (FAVORITOS) === */}
                {user.role === 'user' && (
                    <>
                        <div className="mb-8 flex justify-between items-end border-b border-gray-200 dark:border-stone-700 pb-4">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Tus Películas Favoritas ❤️
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {favorites.length} guardadas
                            </span>
                        </div>

                        {loadingFavs ? (
                            <div className="text-center py-20 text-gray-400 animate-pulse">Cargando tus favoritos...</div>
                        ) : (
                            <>
                                {favorites.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {favorites.map((movie) => (
                                            <MovieCard key={movie._id} movie={movie} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-stone-800 p-12 rounded-2xl shadow-sm text-center border-2 border-gray-200 dark:border-stone-700">
                                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                                            Aún no has guardado ninguna película.
                                        </p>
                                        <Link to="/list" className="btn btn-primary">
                                            Ir al Catálogo 🍿
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;