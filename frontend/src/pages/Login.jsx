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
            // Nos encargamos de redirigir.
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent px-4">
            <div className="w-full max-w-lg card-stone"> {/* Tu clase card-stone */}
                
                <h2 className="form-title">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            placeholder="Usuario"
                            ref={usernameRef}
                            required
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            ref={passwordRef}
                            required
                            className="form-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary ${loading ? 'bg-rose-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
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