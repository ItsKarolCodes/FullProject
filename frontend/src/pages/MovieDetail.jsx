import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewSection from '@/components/ReviewSection';
// Importamos hooks 
import { useAuth } from '@/hooks/useAuth';
import { useMovie } from '@/hooks/useMovie';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. LLAMAMOS A LOS HOOKS
    const { user } = useAuth(); // ¿Es admin?
    const { movie, loading, error, deleteMovie } = useMovie(id); // Datos y acciones

    // 2. LÓGICA DE INTERFAZ 
    const handleDeleteClick = async () => {
        if (window.confirm("¿Estás SEGURO de que quieres borrar esta película?")) {
            // Usamos la función del hook
            const success = await deleteMovie();

            if (success) {
                alert("Película eliminada correctamente");
                navigate('/list'); // El componente decide navegar
            } else {
                alert("Error al borrar la película. ¿Tienes permisos?");
            }
        }
    };

    // 3. GESTIÓN DE ESTADOS VISUALES
    if (loading) return <div className="text-center mt-32 text-rose-500 font-bold text-xl animate-pulse">Cargando...</div>;

    if (error) return (
        <div className="text-center mt-32">
            <h2 className="text-2xl font-bold text-gray-800">Vaya... </h2>
            <p className="text-red-500 my-4">{error}</p>
            <Link to="/list" className="text-rose-600 underline">Volver al catálogo</Link>
        </div>
    );

    if (!movie) return null;

    const isAdmin = user?.role === 'admin';

    // 4. RENDERIZADO (HTML)
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-6">
                <Link to="/list" className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-500 transition-colors font-medium">
                    Volver al catálogo
                </Link>

                {isAdmin && (
                    <div className="flex gap-3">
                        <Link
                            to={`/edit/${id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold shadow-md transition"
                        >
                            ✏️ Editar
                        </Link>

                        {/* Botón Borrar */}
                        <button
                            onClick={handleDeleteClick}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md transition"
                        >
                            <span>🗑️</span> Borrar
                        </button>
                    </div>
                )}
            </div>

            {/* Tarjeta Principal */}
            <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-stone-200 dark:border-stone-700">
                

                {/* Ejemplo rápido de la imagen: */}
                <div className="md:w-1/3 h-[500px] md:h-auto relative">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                </div>

                <div className="md:w-2/3 p-8 md:p-12">
                    <h1 className="text-4xl font-bold mb-4 dark:text-white">{movie.title}</h1>
                    <p className="dark:text-gray-300">{movie.description}</p>
                </div>
            </div>

            <ReviewSection movieId={id} />
        </div>
    );
};

export default MovieDetail;