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
        <div className="modal-overlay">
        
        {/* Usamos .modal-card */}
        <div className="modal-card">
            
            <div className="p-8">
                {/* Título usando .form-title */}
                <h2 className="form-title">
                    Editar Película
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Título */}
                    <div>
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Director */}
                    <div>
                        <label className="form-label">Director/a</label>
                        <input
                            type="text"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Año */}
                        <div>
                            <label className="form-label">Año</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        
                        {/* Rating */}
                        <div>
                            <label className="form-label">Puntuación</label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                step="0.1"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         {/* Género */}
                         <div>
                            <label className="form-label">Género</label>
                            <select
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange} 
                                className="form-input"
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
                            <label className="form-label">URL Poster</label>
                            <input
                                type="url"
                                name="poster"
                                value={formData.poster}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Descripcion */}      
                    <div>
                        <label className="form-label font-bold mb-2">Sinopsis</label>
                        <textarea 
                            name="description"
                            value={formData.description} 
                            onChange={handleChange}
                            rows="3"
                            // Usamos .form-input para mantener el estilo, y añadimos resize-none
                            className="form-input resize-none h-auto"
                        ></textarea>
                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-stone-700">
                        <button
                            type="button"
                            onClick={onClose}
                            // Usamos .btn + .btn-secondary
                            className="w-1/3 btn btn-secondary"
                        >
                            Cancelar
                        </button>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            // Usamos .btn + .btn-primary
                            className="w-2/3 btn btn-primary"
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
    );
};

export default EditMovieModal;