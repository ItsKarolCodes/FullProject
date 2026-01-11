const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // 1. RELACIÓN: ¿De qué película es este comentario?
    movieId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', // <--- Debe coincidir con el nombre de tu modelo de Peli
        required: true 
    },
    
    // 2. AUTOR: ¿Quién lo escribió?
    // Guardamos el ID del usuario y su nombre (para no tener que buscarlo cada vez)
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },

    // 3. CONTENIDO: Nota y Texto
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 10 
    },
    comment: { 
        type: String, 
        required: true 
    },

    // 4. FECHA: Para ordenar del más nuevo al más viejo
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Review', reviewSchema);