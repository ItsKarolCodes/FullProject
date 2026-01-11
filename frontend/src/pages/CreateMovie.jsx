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
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🎬 Añadir Nueva Película
      </h2>

      {/* Mensaje de Error gestionado por el hook */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-pulse">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Título */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Ej: Inception"
          />
        </div>

        {/* Director */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Director/a</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Ej: Christopher Nolan"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Año */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Año</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1888"
              max="2030"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          
          {/* Genero */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Género</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange} 
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
            >
              <option value="accion">Acción</option>
              <option value="comedia">Comedia</option>
              <option value="terror">Terror</option>
              <option value="fantasia">Fantasía</option>
              <option value="thriller">Thriller</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Puntuación</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Poster URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">URL del Poster</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="https://..."
          />
        </div>

        {/* Descripcion */}      
        <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Sinopsis</label>
            <textarea 
                name="description"
                value={formData.description} 
                onChange={handleChange}
                rows="4"
                placeholder="Escribe aquí de qué va la película..."
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
            ></textarea>
        </div>

        {/* Botón Submit con estado Loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-bold py-3 rounded-lg transition-colors mt-6 ${loading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
        >
          {loading ? 'Guardando...' : '💾 Guardar Película'}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;