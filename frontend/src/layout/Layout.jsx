import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';      
import { useAuth } from '@/hooks/useAuth';

const Layout = () => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`min-h-screen flex flex-col w-full overflow-x-hidden transition-colors duration-300 ${theme === 'dark' ? 'dark' : 'light'}`}>
            
            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-rose-500/20 shadow-lg shadow-rose-500/5 py-4 transition-colors">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    
                    {/* IZQUIERDA: Logo */}
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                        <div className="bg-gradient-to-tr from-rose-600 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition duration-300 shadow-lg shadow-rose-500/20">          
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            Video<span className="text-rose-500">Club</span>
                        </span>
                    </Link>

                    {/* CENTRO: Escritorio */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/list" className= "text-gray-300 hover:text-white transition font-medium">
                            Catálogo
                        </Link>
                        {user && (
                            <Link to="/dashboard" className="text-gray-300 hover:text-white transition font-medium">
                                Mi Panel
                            </Link>
                        )}
                    </div>

                    {/* DERECHA: Usuario/Tema/Hamburguesa */}
                    <div className="flex items-center gap-2 md:gap-4">
                        
                        {user ? (
                            // En móvil se oculta por completo. En PC se ve.
                            <div className="hidden md:block text-right">
                                <span className="block text-sm text-gray-300">
                                    Hola, <b className="text-rose-500">{user.username}</b>
                                </span>
                                <span className="text-xs text-gray-500 uppercase">
                                    {user.role}
                                </span>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="text-white hover:text-rose-300 font-medium transition">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full font-bold transition shadow-lg hover:shadow-rose-500/40 transform hover:-translate-y-0.5">
                                    Regístrate
                                </Link>
                            </div>
                        )}

                        <div className="hidden md:block w-px h-6 bg-gray-700 mx-1"></div>

                        {/* Botones siempre visibles */}
                        <button onClick={toggleTheme} className="p-1.5 md:p-2 rounded-full bg-gray-800 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition border border-gray-700 shrink-0">
                            {theme === 'dark' ? "☀" : "🌙" }
                        </button>

                        <button className="md:hidden text-white p-1 ml-1 shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className="text-2xl leading-none">{isMenuOpen ? "✕" : "☰"}</span>
                        </button>
                    </div>
                </div>

                {/* MENÚ MÓVIL */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-stone-900 border-b border-rose-500/20 shadow-xl flex flex-col p-6 gap-4 animate-in slide-in-from-top-5">
                        <Link to="/list" className="text-gray-300 hover:text-rose-500 text-lg py-2 border-b border-stone-800" onClick={() => setIsMenuOpen(false)}>
                            Catálogo
                        </Link>
                        {user ? (
                            <Link to="/dashboard" className="text-gray-300 hover:text-rose-500 text-lg py-2 border-b border-stone-800" onClick={() => setIsMenuOpen(false)}>
                                Mi Panel
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-rose-500 text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/register" className="bg-rose-600 text-white text-center py-3 rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>
                                    Regístrate
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>

            {/* --- CONTENIDO --- */}
            <main className="container mx-auto p-6 flex-grow pt-24 md:pt-28">
                <Outlet />
            </main>

            {/* --- FOOTER RESPONSIVE --- */}
            <footer className="bg-rose-600 border-t border-rose-900/30 text-white py-10 text-sm relative z-10">
                
                {/* 'container' y 'px-6' aseguran el espacio a los laterales */}
                <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-6">
                    
                    {/* BLOQUE 1: Título y Copyright */}
                    <div className="text-center space-y-1">
                        <p className="font-bold text-lg tracking-wide">VideoClub App</p>
                        <p className="text-rose-200 text-xs">© 2025 - Todos los derechos reservados</p>
                    </div>

                    {/* Línea divisoria */}
                    <div className="w-60 h-px bg-rose-400/70"></div>

                    {/* BLOQUE 2: Tecnologías */}
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest font-bold">
                        <span className="text-stone-800">Hecho con:</span>
                        
                        <span className="bg-rose-800 text-white px-2 py-0.5 rounded shadow-sm">React</span>
                        
                        <span className="text-rose-900">•</span>
                        <span className="text-green-200">Node</span>
                        
                        <span className="text-rose-900">•</span>
                        <span className="text-yellow-200">Express</span>
                        
                        <span className="text-rose-900">•</span>
                        <span className="text-green-200">Mongo</span>
                        
                        <span className="text-rose-900">•</span>
                        <span className="text-sky-200">Tailwind</span>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Layout;