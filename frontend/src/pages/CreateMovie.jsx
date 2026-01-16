import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Importamos el nuevo hook
import { useCreateMovie } from '@/hooks/useCreateMovie';

const CreateMovie = () => {
  const navigate = useNavigate();
  
  // 2. Usamos el hook
  const { createMovie, loading, error } = useCreateMovie();

  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    rating: '',
    poster: '',
    genre: 'accion', // Valor por defecto del select
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. Llamamos a la función del hook
    const success = await createMovie(formData);

    if (success) {
      navigate('/'); // Si todo sale bien, redirigimos
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 mb-10 card-stone">
      
      <h2 className="form-title">🎬 Añadir Nueva Película</h2>

      {/* Error ... */}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Ej: Inception"
          />
        </div>

        <div>
          <label className="form-label">Director/a</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Ej: Christopher Nolan"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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

        <div>
          <label className="form-label">URL del Poster</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="form-input"
            placeholder="https://..."
          />
        </div> 
        <div className="col-span-2">
            <label className="form-label">Sinopsis</label>
            <textarea 
                name="description"
                value={formData.description} 
                onChange={handleChange}
                rows="4"
                placeholder="Sinopsis..."
                className="form-input resize-none" 
            ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`btn-primary btn ${loading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
        >
          {loading ? 'Guardando...' : ' Guardar Película'}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;