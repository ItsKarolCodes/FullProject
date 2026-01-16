// Middleware de Manejo de Errores
// IMPORTANTE: Express reconoce que esto es para errores PORQUE tiene 4 argumentos (err, req, res, next).
// Si le quitas el 'next' o el 'err', dejará de funcionar como manejador de errores.
const internalServerError = (err, req, res, next) => { 
    
    // 1. Registro interno
    // Aquí imprimimos el error REAL en la consola del servidor.
    // Esto te permite ver qué línea falló, el stack trace, etc.
    console.error(err); 

    // 2. Respuesta al Cliente (Para el Usuario)
    // Establecemos el estado 500 (Error Interno del Servidor).
    res.status(500).json({
        error: "Internal Server Error",
        // 3. Mensaje Sanitizado (Seguridad)
        // NUNCA enviamos 'err.message' o el stack trace al usuario final en producción.
        // Eso daría pistas a los hackers sobre tu estructura de archivos o base de datos.
        message: "Ha ocurrido un error inesperado en el servidor"
    });
};

module.exports = internalServerError;