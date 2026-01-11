const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true // Elimina espacios en blanco al principio y final
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true // Guarda el email siempre en minúsculas para evitar errores de login
    },
    password: { 
        type: String, 
        required: true 
    },
    // CAMBIO IMPORTANTE: Usamos 'role' en lugar de un booleano 'admin'
    role: {
        type: String,
        enum: ['user', 'admin'], // Solo permite estos dos valores
        default: 'user' // Por defecto, todos son clientes normales
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie' 
    }]
}, {
    timestamps: true // crea automáticamente los campos 'createdAt' y 'updatedAt'
});

module.exports = mongoose.model('User', userSchema);