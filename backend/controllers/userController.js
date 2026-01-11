//libreria para cifrar contraseñas de forma seguro
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        //cadena de caracteres aleatorios que se añade a la contraseña
        const salt = await bcrypt.genSalt(10);
        //creacion del hash
        const hashedPassword = await bcrypt.hash(password, salt);

        //nueva instancia del modelo pasando el nombre de usuario y contraseña ya cifrada
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        //la guardamos en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            // Verificamos qué campo falló
            const field = Object.keys(error.keyPattern)[0];
            const msg = field === 'email' ? 'El email ya está registrado' : 'El nombre de usuario ya está en uso';
            return res.status(400).json({ error: msg });
        }
        // Para cualquier otro error
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        }
    }
    const login = async (req, res) => {
        const { username, password } = req.body;
        try {
            //busca en la BD si existe alguien con ese nombre de usuario
            const user = await User.findOne({ username });
            if (!user) {
                //si no encuentra al usuario devuelve un error
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            //toma la contraseña hasheada que recuperaste de la BD
            //Bcrypt realiza el calculo matematico para ver si coinciden
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            //una vez confirmamos el usuario le damos un pase de acceso
            const token = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token });

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    module.exports = {
        register,
        login
    };