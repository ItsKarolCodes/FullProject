import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';       
import { useReviews } from '@/hooks/useReviews'; 

// Este componente recibe 'movieId' como prop.
const ReviewSection = ({ movieId }) => {
    // 'reviews': Array donde guardaremos la lista de comentarios
    const [reviews, setReviews] = useState([]);
    // 'newComment': El texto que el usuario está escribiendo en el input
    const [newComment, setNewComment] = useState('');
    // 'rating': La puntuación (estrellas) seleccionada, por defecto 5.
    const [rating, setRating] = useState(5);
    
    // Hooks personalizados
    // useAuth: Nos da el usuario actual
    const { user } = useAuth(); 

    const { addReview, getReviews, loading, error } = useReviews();

    // 1. Cargar reseñas al entrar o cambiar de peli
    useEffect(() => {
        // Solo intentamos cargar si hay un ID de película válido
        const loadData = async () => {
            // Llamamos a la función del hook (que hace el fetch al backend)
            if (movieId) {
                // Guardamos los datos recibidos en el estado
                const data = await getReviews(movieId);
                setReviews(data);
            }
        };
        loadData();
        // "Si cambia el ID de la peli, vuelve a ejecutar esto para cargar las nuevas opiniones".
    }, [movieId, getReviews]);

    // 2. Enviar nueva reseña
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const savedReview = await addReview({
            movieId, 
            comment: newComment, 
            rating
        });

        if (savedReview) {
            // Si se guardó bien, la añadimos a la lista localmente (para no recargar)
            // Añadimos el usuario actual para que se vea el nombre al instante
            const reviewWithUser = {
                ...savedReview,
                username: user.username 
            };
            
            // Actualizamos la lista visualmente:
            // Ponemos el nuevo comentario EL PRIMERO [...nuevos, ...viejos]
            setReviews([reviewWithUser, ...reviews]); 
            setNewComment(''); // Limpiar campo
            alert("¡Gracias por tu opinión!");
        }
    };

    return (
        <div className="card-stone">
            <h3 className="text-2xl font-bold mb-6 text-stone-700 dark:text-white flex items-center gap-2">
                💬 Opiniones de la Comunidad
            </h3>

            {/* FORMULARIO (Solo si hay usuario logueado) */}
            {user ? (
                <form onSubmit={handleSubmit} className="card-stone-600">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-stone-700 dark:text-stone-300">Tu Puntuación</label>
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)}
                            className="text-area"
                        >
                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>⭐ {num}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-stone-700 dark:text-stone-300">Tu Comentario</label>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="¿Qué te ha parecido la película?"
                            className="text-area w-full"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`btn btn-primary ${loading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 transform hover:-translate-y-0.5'}`}
                    >
                        {loading ? 'Publicando...' : 'Publicar Opinión'}
                    </button>
                    
                    {error && <p className="text-red-500 mt-3 text-sm font-bold animate-pulse">⚠️ {error}</p>}
                </form>
            ) : (
                <div className="mb-8 p-6 bg-stone-50 dark:bg-stone-900 rounded-xl text-center border border-dashed border-stone-300 dark:border-stone-700">
                    <p className="text-stone-500 dark:text-stone-400 mb-2">Inicia sesión para compartir tu opinión</p>
                </div>
            )}

            {/* LISTA DE COMENTARIOS */}
            <div className="space-y-6">
                {reviews.length === 0 && <p className="text-stone-500 text-center py-4 italic">Sé el primero en opinar sobre esta película.</p>}
                
                {reviews.map((rev) => (
                    <div key={rev._id } className="border-b border-stone-100 dark:border-stone-700 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                {/* Avatar con inicial */}
                                <div className="bg-rose-600 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold shadow-sm">
                                    {rev.username ? rev.username.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <span className="font-bold text-stone-700 dark:text-white block">
                                        {rev.username || 'Usuario'}
                                    </span>
                                    <span className="text-xs text-stone-400">
                                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Hace un momento'}
                                    </span>
                                </div>
                            </div>
                            <span className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-sm">
                                ⭐ {rev.rating}/10
                            </span>
                        </div>
                        <p className="text-stone-600 dark:text-stone-300 mt-2 pl-12 leading-relaxed">
                            "{rev.comment}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;