import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; 
import { useFavorites } from '@/hooks/useFavorites'; 
import { useMovies } from '@/hooks/useMovies'; 
import MovieCard from '@/components/MovieCard';
import MovieSearch from '@/components/MovieSearch';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
// 👇 1. IMPORTANTE: Importamos el Modal de Edición
import EditMovieModal from '@/components/EditMovieModal';

const Dashboard = () => {
    // === 1. HOOKS Y HERRAMIENTAS ===
    const navigate = useNavigate();
    const { user, loading: authLoading, logout } = useAuth();
    
    // Hooks de datos
    const { getMyFavorites } = useFavorites(); 
    // 👇 2. Asegúrate de sacar 'updateMovie' de aquí
    const { movies, getMovies, deleteMovie, updateMovie } = useMovies(); 

    // Estados locales
    const [favorites, setFavorites] = useState([]); 
    const [loadingFavs, setLoadingFavs] = useState(true); 
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // Hook personalizado para borrar
    const { isOpen, askToDelete, confirm, close } = useConfirmDelete(deleteMovie);

    // 👇 3. NUEVOS ESTADOS PARA EDITAR
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [movieToEdit, setMovieToEdit] = useState(null);

    // Funciones para abrir/cerrar el modal de edición
    const handleEditClick = (movie) => {
        setMovieToEdit(movie);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setMovieToEdit(null);
    };

    // Protección de ruta
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    // 3. CARGA DE DATOS
    useEffect(() => {
        const loadData = async () => {
            if (user?.role === 'user') {
                const data = await getMyFavorites();
                setFavorites(data);
                setLoadingFavs(false);
            } else if (user?.role === 'admin') {
                await getMovies();
            }
        };
        
        if (user) loadData();
    }, [user]); 

    // Lógica de filtrado
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (authLoading) return <div className="p-10 text-center text-gray-500">Cargando panel... ⏳</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-stone-900 transition-colors duration-300 px-4">
            
            {/* CONTENEDOR PRINCIPAL */}
            <div className="container mx-auto p-6 md:p-10">
                
                {/* Cabecera del Dashboard */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Panel de {user.role === 'admin' ? 'Administrador 🛠️' : 'Usuario 👤'}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Bienvenidx <b className="text-rose-600">{user.username}</b>
                        </p>
                    </div>
                    
                    <button 
                        onClick={logout} 
                        className="btn btn-red shadow-lg shadow-red-500/20"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                {/* === ZONA ADMIN === */}
                {user.role === 'admin' && (
                    <div className="mb-12 space-y-8">
                        <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl shadow-sm">
                            
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

                            <div className="card-stone overflow-hidden">
                                <div className="p-4 bg-gray-50 dark:bg-stone-700 border-b border-gray-200 dark:border-stone-600 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <h3 className="font-bold text-gray-700 dark:text-gray-200">
                                        Catálogo ({filteredMovies.length} películas)
                                    </h3>
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
                                                            
                                                            {/* 👇 4. BOTONES DE ACCIÓN (EDITAR Y BORRAR) */}
                                                            <div className="flex justify-end gap-2">
                                                                <button 
                                                                    onClick={() => handleEditClick(movie)} 
                                                                    className="bg-teal-700 hover:bg-teal-900 text-white py-1 px-3 rounded text-xs font-bold transition flex items-center gap-1"
                                                                >
                                                                    Editar 
                                                                </button>

                                                                <button 
                                                                    onClick={() => askToDelete(movie._id)} 
                                                                    className="btn btn-red py-1 px-3 text-xs"
                                                                >
                                                                    Eliminar 
                                                                </button>
                                                            </div>

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

            {/* 👇 5. MODALES (BORRAR Y EDITAR) */}
            
            {/* Modal de Borrar */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl max-w-sm w-full p-6 border dark:border-stone-600">
                        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                            Confirmar eliminación
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-6">
                           ¿Seguro que quieres borrar esta película? No se podrá recuperar.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={close} className="px-4 py-2 bg-gray-200 dark:bg-stone-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 transition">
                                Cancelar
                            </button>
                            <button onClick={confirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Editar */}
            {isEditOpen && (
                <EditMovieModal 
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    movie={movieToEdit}
                    onUpdate={updateMovie} 
                />
            )}
            
        </div>
    );
};

export default Dashboard;