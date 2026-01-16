const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // 1. RELACIONES (Foreign Keys)
    // En lugar de guardar toda la película aquí dentro, guardamos solo su ID.
    movieId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie', 
        required: true 
    },
    
    // 2. REFERENCIA AL AUTOR
    // Igual que con la película, guardamos el ID para saber qué usuario único fue.
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    // 3. OPTIMIZACIÓN (Desnormalización)
    // Al guardarlo aquí, sacrificamos un poco de espacio para ganar mucha velocidad de lectura.
    username: { 
        type: String, 
        required: true 
    },

    // 4. CONTENIDO Y REGLAS
    rating: { 
        type: Number, 
        required: true, 
        // Evitamos que alguien ponga un 0, un negativo o un 100.
        // Esto protege la integridad de tus cálculos de "media de estrellas".
        min: 1, 
        max: 10 
    },
    comment: { 
        type: String, 
        required: true 
    },

    // 5. FECHA MANUAL
    createdAt: { 
        type: Date, 
        default: Date.now // Se pone la fecha exacta del momento en que se guarda
    }
});

module.exports = mongoose.model('Review', reviewSchema);