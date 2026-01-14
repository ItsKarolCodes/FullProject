import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites'; 

// Configuración de colores
const genreColors = {
    accion: 'bg-blue-100 text-blue-800 border-blue-200',
    terror: 'bg-red-100 text-red-800 border-red-200',
    comedia: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    fantasia: 'bg-purple-100 text-purple-800 border-purple-200',
    thriller: 'bg-gray-800 text-white border-gray-600',
    default: 'bg-gray-100 text-gray-800 border-gray-200'
};

const MovieCard = ({ movie }) => {
    // 2. Sacamos las funciones del hook
    const { toggleFavorite, isFavorite } = useFavorites();

    // 3. Estado local para el corazón (Rojo o Blanco)
    // Inicializamos comprobando si ya es favorita
    const [liked, setLiked] = useState(isFavorite(movie._id));

    const handleHeartClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Llamamos al hook y actualizamos el estado visual con el resultado
        // (Devuelve true si se añadió, false si se quitó)
        const result = await toggleFavorite(movie._id);
        
        // Si el resultado es válido (no hubo error de login), actualizamos el color
        if (result !== undefined) {
            setLiked(result);
        }
    };

    const badgeColor = genreColors[movie.genre] || genreColors.default;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group h-full flex flex-col relative">
            
            {/* --- ZONA IMAGEN --- */}
            <div className="h-64 overflow-hidden bg-gray-200 relative">
                
                {/* 4. BOTÓN CORAZÓN ❤️ */}
                <button 
                    onClick={handleHeartClick}
                    className="absolute top-2 left-2 z-20 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white shadow-md transition-transform active:scale-90"
                    title={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    {liked ? (
                        <span className="text-xl">❤️</span>
                    ) : (
                        <span className="text-xl opacity-50 hover:opacity-100 grayscale hover:grayscale-0">🤍</span>
                    )}
                </button>

                {movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
                )}
                
                {/* Badge Género */}
                <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full border ${badgeColor} uppercase shadow-sm z-10`}>
                    {movie.genre || 'General'}
                </span>
            </div>

            {/* --- ZONA INFO --- */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 truncate" title={movie.title}>
                        {movie.title}
                    </h3>
                    <span className="flex items-center text-yellow-500 font-bold text-sm bg-yellow-50 px-1.5 py-0.5 rounded">
                        ★ {movie.rating}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-4 italic truncate">"{movie.director}"</p>
                
                {/* Footer Tarjeta */}
                <div className="flex justify-between items-center flex-col text-sm text-gray-400 border-t pt-3 mt-auto">
                    <span>{movie.year}</span>
                    
                    <Link 
                        to={`/movie/${movie._id}`} 
                        className="btn btn-primary mt-auto w-full"
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;