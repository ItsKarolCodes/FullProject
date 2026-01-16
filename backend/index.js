// Permite que Node entienda los atajos como '@models' o '@routes'
require('module-alias/register'); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Carga las variables del archivo .env (como tu contraseña de DB o palabra secreta)
dotenv.config();
// Inicializamos la aplicación de Express
const app = express();

//Importamos las rutas
const movieRoutes = require('./routers/movieRoutes')
const userRoutes = require('./routers/userRoutes');
const reviewRoutes = require('./routers/reviewRoutes');

//Importamos los middlewares
const notFound = require('./middlewares/404');
const internalServerError = require ('./middlewares/500');
const auth = require('./middlewares/auth');

//Conexion a la BBDD
// Usamos la variable de entorno para no exponer la contraseña en el código.
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB conection error' , err));

// CORS: Permite que Frontend hable con este Backend.
app.use(cors());
//Permite que el servidor entienda los datos que envías
app.use(express.json());

//Usamos las rutas
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

//middelwares para rutas no enconctradas
app.use(notFound);
app.use(internalServerError);

// 6. ARRANCAR EL SERVIDOR
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
