const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // 1. IDENTIFICACIÓN Y LIMPIEZA
    username: { 
        type: String, 
        required: true, 
        // unique: Evita que dos personas se llamen igual.
        // MongoDB crea un índice interno para buscar usuarios muy rápido por su nombre.
        unique: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        // 2. NORMALIZACIÓN
        // 'lowercase: true' asegura que en la base de datos siempre esté guardado en minúsculas
        // para que coincidan.
        lowercase: true 
    },
    
    // 3. SEGURIDAD
    password: { 
        type: String, 
        required: true 
        // Nota: Aquí NO guardamos "12345". Guardamos el "hash" largo y encriptado
        // que genera bcryptjs (ej: $2b$10$EixZaYVK1fsdf...).
    },

    // 4. ROLES Y PERMISOS (RBAC - Role Based Access Control)
    // Cambiar de 'isAdmin: true' a 'role: string'.
    role: {
        type: String,
        // 'enum' asegura que nadie se invente un rol
        // Solo existen 'user' y 'admin'.
        enum: ['user', 'admin'], 
        // por defecto, nadie es admin.
        default: 'user' 
    },

    // Un usuario puede tener MUCHAS películas favoritas.
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie' // Referencia al modelo de Películas para poder usar .populate()
    }]
}, {
    // 6. AUDITORÍA
    // Crea 'createdAt' (fecha de registro) y 'updatedAt' (última vez que cambió perfil/password).
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);