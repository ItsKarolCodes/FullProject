import { useState } from 'react';

const EditMovieModal = ({ isOpen, onClose, movie, onUpdate }) => {
    
    // Inicializamos con los datos de la peli que nos pasan
    const [formData, setFormData] = useState({
        title: movie?.title || '',
        director: movie?.director || '',
        year: movie?.year || '',
        genre: movie?.genre || 'accion',
        rating: movie?.rating || 0,
        poster: movie?.poster || '',
        description: movie?.description || ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Llamamos a la función de actualizar del padre
        await onUpdate(movie._id, formData);
        setLoading(false);
        onClose(); // Cerramos al terminar
    };

    if (!isOpen) return null;

    return (
        // FONDO OSCURO (Overlay)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            
            {/* TARJETA DEL MODAL (Estilo basado en tu formulario) */}
            <div className="bg-white dark:bg-stone-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                        Editar Película
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Título */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Título</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>

                        {/* Director */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Director/a</label>
                            <input
                                type="text"
                                name="director"
                                value={formData.director}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Año */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Año</label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>
                            
                            {/* Rating */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Puntuación</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             {/* Género */}
                             <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Género</label>
                                <select
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange} 
                                    className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                >
                                    <option value="accion">Acción</option>
                                    <option value="comedia">Comedia</option>
                                    <option value="terror">Terror</option>
                                    <option value="fantasia">Fantasía</option>
                                    <option value="thriller">Thriller</option>
                                </select>
                            </div>

                             {/* Poster URL */}
                             <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">URL Poster</label>
                                <input
                                    type="url"
                                    name="poster"
                                    value={formData.poster}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Descripcion */}      
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Sinopsis</label>
                            <textarea 
                                name="description"
                                value={formData.description} 
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-gray-300 dark:border-stone-600 dark:bg-stone-700 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                            ></textarea>
                        </div>

                        {/* BOTONES (GUARDAR Y CANCELAR) */}
                        <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-stone-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className={"w-2/3 btn btn-primary" }
                            >
                                {loading ? 'Guardando...' : ' Guardar Cambios'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMovieModal;