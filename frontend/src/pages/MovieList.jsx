import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';
import MovieCard from '@/components/MovieCard';

const MovieList = () => {
    
    const { movies, loading, error, getMovies } = useMovies();

    useEffect(() => {
        getMovies();
    }, []);


    if (loading) return <div className="text-center mt-10 text-xl animate-pulse">Cargando catálogo... 🍿</div>;
    if (error) return <div className="text-center mt-10 text-red-600 font-bold">⚠️ {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">

        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
            {/* Agregué dark:text-rose-500 para que resalte también en modo oscuro */}
            <h2 className="text-3xl font-bold text-rose-600 dark:text-rose-500">
                Catálogo de Películas
            </h2>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* 2. PROTECCIÓN: Renderizado condicional */}
            {Array.isArray(movies) ? (
                movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))
            ) : (
                
                <div className="col-span-full card-stone-600 text-center border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                    <p className="text-orange-600 dark:text-orange-400 font-bold mb-2">
                        ¡Ups! Los datos no son una lista.
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                        Revisa la consola (F12) para ver la estructura.
                    </p>
                </div>
            )}
        </div>

        {/* Estado Vacío (Empty State) */}
        {!loading && Array.isArray(movies) && movies.length === 0 && (
               
            <div className="card-stone-600 border-dashed text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No hay películas todavía.
                </p>
            </div>
        )}
    </div>
    );
};

export default MovieList;