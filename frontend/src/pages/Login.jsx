import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// 1. Importamos el hook
import { useLogin } from "../hooks/useLogin"; 

const Login = () => {
    const navigate = useNavigate();
    // Refs
    const usernameRef = useRef();
    const passwordRef = useRef();

    // 2. Usamos el hook
    const { loginUser, loading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preparamos las credenciales
        const credentials = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        // 3. Llamamos a la función del hook
        const success = await loginUser(credentials);

        if (success) {
            // Si el login fue correcto, el hook ya guardó el token.
            // Nosotros solo nos encargamos de redirigir.
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login 
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Usuario</label>
                        <input
                            type="text"
                            placeholder="Usuario"
                            ref={usernameRef}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            ref={passwordRef}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading} // Deshabilitamos si está cargando
                        className={`w-full text-white font-bold py-3 rounded-lg transition-colors mt-6 ${loading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
                    >
                        {loading ? 'Entrando...' : 'Iniciar sesión'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 text-center text-red-600 bg-red-100 border border-red-300 p-2 rounded animate-pulse">
                        ⚠️ {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;