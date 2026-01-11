//traemos libreria para manejar los token y modelo de BD
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token inválido o ausente' });
    }
    //Esta línea divide el texto por el espacio y se queda solo con la segunda parte (el código largo), descartando la palabra "Bearer".
    const token = req.headers.authorization.split(' ')[1];

    try {
        //Intenta descifrar el token usando tu "palabra secreta" guardada en las variables de entorno. Si el token es falso o expiró, saltará al catch.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Busca al usuario en la base de datos para asegurarse de que existe.sirve para que las siguientes funciones sepan quién es el usuario.
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({error:'Unauthorized', message: 'Usuario no encontrado'});
        }

        req.user = user;

    }catch(err){
        
        return res.status(401).json({ error: 'Unauthorized', message: 'Token invalido o ausente'});
    }
    //Si todo salió bien, llama a next()
    next();
};

module.exports = auth;