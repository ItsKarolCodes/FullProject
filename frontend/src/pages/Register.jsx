import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useRegister'; 

const Register = () => {
    const navigate = useNavigate();
    
    // Refs para el formulario
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // 2. Usamos el hook
    const { registerUser, loading, error } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preparamos los datos
        const userData = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        // 3. Llamamos a la función del hook
        const success = await registerUser(userData);

        if (success) {
            // Si todo fue bien, redirigimos
            navigate('/Dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Crear Cuenta 
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input Usuario */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Usuario</label>
                        <input 
                            type="text" 
                            ref={usernameRef} 
                            required 
                            placeholder="Ej: nuevoUsuario"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>

                    {/* Input Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input 
                            type="email" 
                            ref={emailRef} 
                            required 
                            placeholder="correo@ejemplo.com"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>

                    {/* Input Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                        <input 
                            type="password" 
                            ref={passwordRef} 
                            required 
                            placeholder="*******"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} // Desactivamos el botón si está cargando
                        className={`w-full text-white font-bold py-3 rounded-lg transition-colors mt-6 ${loading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-rose-600 font-bold hover:underline">Inicia Sesión</Link>
                </p>

                {/* Mensaje de Error Visual */}
                {error && (
                    <div className="mt-4 text-center text-red-600 bg-red-100 border border-red-300 p-2 rounded animate-pulse">
                        ⚠️ {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;