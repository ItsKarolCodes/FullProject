require('module-alias/register'); //lo añadimos para utilizar @

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

//Importamos las rutas
const movieRoutes = require('./routers/movieRoutes')
const userRoutes = require('./routers/userRoutes');
const reviewRoutes = require('./routers/reviewRoutes');


const notFound = require('./middlewares/404');
const internalServerError = require ('./middlewares/500');
const auth = require('./middlewares/auth');


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB conection error' , err));

app.use(cors());
app.use(express.json());

//Usamos las rutas
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

//middelwares para rutas no enconctradas
app.use(notFound);
app.use(internalServerError);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
