const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    // TIPO STRING: Para textos como título, director, imagen, etc.
    title: { 
        type: String, 
        required: [true, 'El título es obligatorio'], //si no lo envian, da este error
        trim: true 
    },
    director: { 
        type: String, 
        required: [true, 'El director es obligatorio'],
    },
    poster: { 
        type: String, // guardamos la URL de la imagen
        required: false 
    },
    // GÉNERO
    genre: {
        type: String,
        required: [true, 'El género es obligatorio'],
        enum: {
            values: ['accion', 'fantasia', 'terror', 'comedia', 'thriller'],
            message: '{VALUE} no es un género válido' // Mensaje si envían algo distinto
        }
    },

    // TIPO NUMBER: Para el año, precio o puntuación
    year: { 
        type: Number, 
        required: true,
        min: [1888, 'El año no puede ser anterior a 1888'],
        max: [2030, 'El año no puede ser futuro'] 
    },
    rating: {
        type: Number, 
        default: 0,   // Si no envían rating, se pone 0 por defecto
        min: 0,
        max: [10, 'La puntuación no puede ser mayor a 10'], 
    },

    description: { 
        type: String, 
        default: "Sin sinopsis disponible." 
    },
    // TIPO BOOLEAN: Si es 'true', se puede alquilar. Si es 'false', está agotada.
    available: { 
        type: Boolean, 
        default: true, 
    },


}, { timestamps: true }); //matiene el createdAt y updateAt

module.exports = mongoose.model('Movie', movieSchema);