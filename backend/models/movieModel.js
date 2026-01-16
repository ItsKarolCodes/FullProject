const mongoose = require('mongoose');

// Definimos la estructura de la tabla (Colección en MongoDB)
const movieSchema = new mongoose.Schema({
    
    // 1. VALIDACIONES DE TEXTO
    title: { 
        type: String, 
        required: [true, 'El título es obligatorio'], 
        // 'trim' elimina espacios vacíos al principio y final ("  Avatar  " -> "Avatar")
        trim: true 
    },
    director: { 
        type: String, 
        required: [true, 'El director es obligatorio'],
        trim: true
    },
    poster: { 
        type: String, 
        // No es obligatorio. Si no envían foto, se guarda como null o no existe el campo.
        // En BBDD guardamos la URL (texto), no el archivo de imagen.
        required: false 
    },

    // 2. LISTAS CERRADAS (ENUM)
    // Solo permite los valores exactos que definimos.
    genre: {
        type: String,
        required: [true, 'El género es obligatorio'],
        enum: {
            values: ['accion', 'fantasia', 'terror', 'comedia', 'thriller'],
            message: '{VALUE} no es un género válido' // {VALUE} se sustituye por lo que envió el usuario
        }
    },

    // 3. VALIDACIONES NUMÉRICAS Y RANGOS
    year: { 
        type: Number, 
        required: true,
        // Validamos lógica de negocio: el cine se inventó a finales del s.XIX
        min: [1888, 'El año no puede ser anterior a 1888'],
        // Evitamos errores de dedo (ej: año 20290)
        max: [2030, 'El año no puede ser futuro'] 
    },
    rating: {
        type: Number, 
        // VALOR POR DEFECTO:
        // Si al crear la peli no envían puntuación, Mongoose le pone un 0 automáticamente.
        default: 0, 
        min: 0,
        max: [10, 'La puntuación no puede ser mayor a 10'], 
    },

    description: { 
        type: String, 
        default: "Sin sinopsis disponible." 
    },

    // 4. LÓGICA DE ESTADO
    // Útil para "borrado lógico". En lugar de borrar la peli de la DB, la pones en false
    // y dejas de mostrarla en la web, pero conservas los datos históricos.
    available: { 
        type: Boolean, 
        default: true, 
    },

}, { 
    // 5. OPCIONES DEL ESQUEMA
    // Esto crea automáticamente dos campos en tu DB: 'createdAt' y 'updatedAt'.
    // Mongoose gestiona las fechas por ti cada vez que creas o editas.
    timestamps: true 
}); 

// Exportamos el MODELO.
// 'Movie' es el nombre que usará Mongoose (creará la colección 'movies' en plural y minúscula).
module.exports = mongoose.model('Movie', movieSchema);