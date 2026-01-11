import { useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';     
import MovieCard from '@/components/MovieCard';   

const MovieList = () => {
    
    const { movies, loading, error, getMovies } = useMovies();

    // 3. ¡IMPORTANTE! Llamamos a la función al cargar el componente
    useEffect(() => {
        getMovies();
    }, []); 

    // Gestión de estados 
    if (loading) return <div className="text-center mt-10 text-xl animate-pulse">Cargando catálogo... 🍿</div>;
    if (error) return <div className="text-center mt-10 text-red-600 font-bold">⚠️ {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Encabezado */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-rose-600">Catálogo de Películas</h2>
            </div>

            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>

            {/* Estado Vacío */}
            {!loading && movies.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No hay películas todavía.</p>
                    
                </div>
            )}
        </div>
    );
};

export default MovieList;