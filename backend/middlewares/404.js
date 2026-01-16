// Middleware para manejar rutas inexistentes (404)
const notFound = (req, res, next) => {
    // 1. Establecemos el código de estado HTTP
    // Es CRUCIAL poner 404. Si no lo haces, Express enviará un 200 (OK) por defecto,
    // y el cliente pensará que la petición fue exitosa aunque sea un error.
    res.status(404);

    // 2. Enviamos la respuesta en formato JSON
    // Usamos 'return' para asegurar que la función termina aquí y no sigue ejecutando nada más.
    return res.json({ 
        error: "Not Found", 
        // req.originalUrl contiene la ruta exacta que el usuario intentó visitar (ej: /api/usuarios/123)
        message: `La ruta ${req.originalUrl} no existe` 
    });
};

module.exports = notFound;