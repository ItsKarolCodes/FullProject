const logger = (req, res, next) => {
    // 1. EL REGISTRO 
    // Usamos console.log para imprimir en TU terminal (donde corre el servidor).
    // Accedemos al objeto 'req' (request) para sacar los metadatos de la petición:
    console.log(`Se ha recibido una petición de la ip ${req.ip} con el método ${req.method} y la url ${req.url}`);

    // 2. CONTINUAR EL FLUJO
    // Esto es OBLIGATORIO en un middleware de paso como este.
    // Si olvidas poner next(), la petición se quedará cargando infinitamente en el navegador
    // porque el servidor nunca le da paso a la siguiente función (auth, rutas, etc.).
    next();
};

module.exports = logger;