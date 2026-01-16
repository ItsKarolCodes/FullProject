import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewSection from '@/components/ReviewSection';

// Importamos hooks y componentes
import { useAuth } from '@/hooks/useAuth';
import { useMovie } from '@/hooks/useMovie';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import EditMovieModal from '@/components/EditMovieModal'; 

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. LLAMAMOS A LOS HOOKS
    const { user } = useAuth(); // ¿Es admin?
    const { movie, loading, error, deleteMovie, updateMovie } = useMovie(id); 

    // --- LÓGICA DE BORRADO (MODAL) ---
    // Creamos la función que borra y LUEGO redirige
    const handleDeleteWithNavigation = async () => {
        const success = await deleteMovie(); 
        if (success) {
            navigate('/list'); 
        }
    };
    // Inicializamos el hook del modal de borrar
    const { isOpen, askToDelete, confirm, close } = useConfirmDelete(handleDeleteWithNavigation);

    // --- LÓGICA DE EDICIÓN (MODAL) ---
    const [isEditOpen, setIsEditOpen] = useState(false);

    // 3. GESTIÓN DE ESTADOS VISUALES
    if (loading) return <div className="text-center mt-32 text-rose-500 font-bold text-xl animate-pulse">Cargando...</div>;

    if (error) return (
        <div className="text-center mt-32">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Vaya... </h2>
            <p className="text-red-500 my-4">{error}</p>
            <Link to="/list" className="text-rose-600 underline">Volver al catálogo</Link>
        </div>
    );

    if (!movie) return null;

    const isAdmin = user?.role === 'admin';

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            
            {/* Cabecera y Navegación */}
            <div className="flex justify-between items-center mb-6">
                <Link to="/list" className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-500 transition-colors font-medium">
                    Volver al catálogo
                </Link>

                {isAdmin && (
                    <div className="flex gap-3">
                        {/* Botón EDITAR */}
                        <button
                            onClick={() => setIsEditOpen(true)}
                            // Usamos clase base .btn + colores específicos (ya que no hay btn-teal en tu CSS)
                            className="btn bg-teal-700 hover:bg-teal-900 text-white"
                        >
                            Editar
                        </button>

                        {/* Botón BORRAR */}
                        <button
                            onClick={() => askToDelete(id)}
                            // Usamos tus clases .btn y .btn-red
                            className="btn btn-red gap-2"
                        >
                            Borrar
                        </button>
                    </div>
                )}
            </div>

            {/* Tarjeta Principal */}
            {/* Usamos .card-stone. Añadimos !p-0 para quitar el padding y que la imagen llegue al borde */}
            <div className="card-stone !p-0 flex flex-col md:flex-row overflow-hidden">
                
                {/* Imagen */}
                <div className="md:w-1/3 relative h-[500px] md:h-auto">
                    <img 
                        src={movie.poster || "https://via.placeholder.com/300x450"} 
                        alt={movie.title} 
                        className="absolute inset-0 w-full h-full object-cover" 
                    />
                </div>

                {/* Info */}
                <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {movie.genre}
                        </span>
                        <span className="bg-gray-100 dark:bg-stone-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
                            {movie.year}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                        {movie.title}
                    </h1>

                    <div className="mb-6 flex items-center gap-2">
                         <span className="text-yellow-400 text-2xl">★</span>
                         <span className="text-xl font-bold text-gray-800 dark:text-white">{movie.rating}</span>
                         <span className="text-gray-400 text-sm">/ 10</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                        {movie.description}
                    </p>

                    <div className="border-t border-gray-100 dark:border-stone-700 pt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Director: <span className="font-bold text-gray-800 dark:text-white">{movie.director}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de Reseñas */}
            <div className="mt-12">
                <ReviewSection movieId={id} />
            </div>

            {/* 👇 MODALES REFACTORIZADOS */}

            {/* 1. Modal de Borrar */}
            {isOpen && (
                // Usamos .modal-overlay
                <div className="modal-overlay">
                    
                    
                    <div className="modal-card max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            ¿Estás seguro?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                            Vas a eliminar <b>{movie.title}</b>. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button 
                                onClick={close} 
                                
                                className="btn btn-secondary"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirm} 
                                
                                className="btn btn-red shadow-lg shadow-red-500/30"
                            >
                                Sí, Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Modal de Editar */}
            {isEditOpen && (
                <EditMovieModal 
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    movie={movie}
                    onUpdate={updateMovie} 
                />
            )}

        </div>
    );
};

export default MovieDetail;