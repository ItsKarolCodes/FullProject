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

        <div className="flex justify-center items-center min-h-screen bg-transparent p-4">
            
        
            <div className="w-full max-w-lg card-stone">
                
            
                <h2 className="form-title">
                    Crear Cuenta 
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
        
                    <div>

                        <label className="form-label">Usuario</label>
                        <input 
                            type="text" 
                            ref={usernameRef} 
                            required 
                            placeholder="Ej: nuevoUsuario"
                            className="form-input"
                        />
                    </div>

                    
                    <div>
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            ref={emailRef} 
                            required 
                            placeholder="correo@ejemplo.com"
                            className="form-input"
                        />
                    </div>

                    
                    <div>
                        <label className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            ref={passwordRef} 
                            required 
                            placeholder="*******"
                            className="form-input"
                        />
                    </div>

                    
                    <button 
                        type="submit" 
                        disabled={loading} 
                        
                        className="w-full mt-6 btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-rose-600 dark:text-rose-500 font-bold hover:underline">
                        Inicia Sesión
                    </Link>
                </p>


                {error && (
                    <div className="mt-4 text-center text-red-600 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 p-2 rounded animate-pulse">
                        ⚠️ {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;