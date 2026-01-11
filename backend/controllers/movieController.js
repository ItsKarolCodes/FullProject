const Movie = require('../models/movieModel');

// 1. OBTENER TODAS LAS PELÍCULAS (Para el catálogo)
const getMovies = async (req, res) => {
    try {
        // Busca todas las películas en la BBDD
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. CREAR UNA PELÍCULA (Solo para el Admin)
const createMovie = async (req, res) => {
    try {
        // req.body contiene los datos que envías desde el formulario o Postman
        const newMovie = new Movie(req.body);

        // Guardamos en MongoDB
        const savedMovie = await newMovie.save();

        // Devolvemos la película guardada con código 201 (Created)
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//BUSCAR PELICULA por ID
const getMovieById = async (req, res) => {
    try {
        // 1. Capturamos el ID 
        const { id } = req.params;

        // 2. Buscamos en la base de datos
        const movie = await Movie.findById(id);

        // 3. Validación: Si no existe, devolvemos 404 (Not Found)
        if (!movie) {
            return res.status(404).json({ message: "Película no encontrada" });
        }

        // 4. Si existe, devolvemos la película
        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({ message: "Error al buscar la película", error });
    }
};

//ACTUALIZAR/MODIFICAR PELICULA
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        // req.body contiene los datos nuevos que enviamos
        const dataToUpdate = req.body;

        // Buscamos por ID y actualizamos
        // { new: true } hace que nos devuelva la película actualizada
        const movie = await Movie.findByIdAndUpdate(id, dataToUpdate, { new: true });

        if (!movie) {
            return res.status(404).json({ message: "Película no encontrada para actualizar" });
        }

        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la película", error });
    }
};

//BORRAR PELICULA
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos y borramos en un solo paso
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ message: "Película no encontrada para borrar" });
        }

        // Respondemos con un mensaje
        res.status(200).json({ message: "Película eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la película", error });
    }
};

// Exportamos las funciones para usarlas en las rutas
module.exports = {
    getMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
};