import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';      
import { useAuth } from '@/hooks/useAuth';

const Layout = () => {
    const { theme, toggleTheme } = useTheme();
    
    const { user } = useAuth();
    
    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'dark' : 'light'}`}>
            
            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-rose-500/20 shadow-lg shadow-rose-500/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    
                    {/* 1. IZQUIERDA: Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-tr from-rose-600 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition duration-300 shadow-lg shadow-rose-500/20">           
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Video<span className="text-rose-500">Club</span>
                        </span>
                    </Link>

                    {/* 2. CENTRO: Enlaces */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/list" className="text-rose-500 hover:text-gray-300 text-sm font-bold uppercase tracking-wider transition duration-300">
                            Catálogo
                        </Link>
                        
                        {user && (
                            <Link to="/dashboard" className="text-rose-500 hover:text-gray-300 text-sm font-bold uppercase tracking-wider transition duration-300">
                                Mi Panel
                            </Link>
                        )}
                    </div>

                    {/* 3. DERECHA: Usuario / Login + Tema */}
                    <div className="flex items-center gap-4">
                        
                        {/* --- AQUÍ ESTÁ LA MAGIA CONDICIONAL --- */}
                        {user ? (
                            // OPCIÓN A: SI EL USUARIO ESTÁ LOGUEADO
                            <div className="hidden md:flex items-center gap-4">
                                <div className="text-right mr-2">
                                    <span className="block text-sm text-gray-300">Hola, <b className="text-rose-500">{user.username}</b></span>
                                    <span className="block text-xs text-gray-500 uppercase">{user.role}</span>
                                </div>
                                
                            </div>
                        ) : (
                            // OPCIÓN B: SI NO HAY NADIE (Login / Registro)
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="text-white hover:text-rose-300 font-medium transition">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full font-bold transition shadow-lg hover:shadow-rose-500/40 transform hover:-translate-y-0.5">
                                    Regístrate
                                </Link>
                            </div>
                        )}

                        {/* Separador vertical */}
                        <div className="hidden md:block w-px h-6 bg-gray-700 mx-1"></div>

                        {/* Botón Tema */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition border border-gray-700"
                        >
                            {theme === 'dark' ? "☀" : "🌙" }
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- CONTENIDO DINÁMICO --- */}
            <main className="container mx-auto p-6 flex-grow pt-28">
                <Outlet />
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-rose-600 border-t border-rose-900/30 text-white px-5 text-center py-8 text-sm">
                <p>© 2025 VideoClub App - Todos los derechos reservados </p>
            </footer>
        </div>
    );
};

export default Layout;