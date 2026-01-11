const notFound = (req, res, next) => {
    res.status(404);
    return res.json({ error: "Not Found", message: `La ruta ${req.originalUrl} no existe` });
};

module.exports = notFound;