import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';      
import { useAuth } from '@/hooks/useAuth';

const Layout = () => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'dark' : 'light'}`}>
            
            {/* --- NAVBAR FIJA --- */}
            <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-rose-500/20 shadow-lg shadow-rose-500/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    
                    {/* 1. IZQUIERDA: Logo */}
                    <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                        <div className="bg-gradient-to-tr from-rose-600 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition duration-300 shadow-lg shadow-rose-500/20">          
                        </div>
                        <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            Video<span className="text-rose-500">Club</span>
                        </span>
                    </Link>

                    {/* 2. CENTRO: Enlaces Escritorio (Oculto en móvil) */}
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

                    {/* 3. DERECHA: Usuario, Tema y Hamburguesa (Visible siempre) */}
                    <div className="flex items-center gap-3 md:gap-4">
                        
                        {/* A. Info Usuario (Visible en móvil pequeño) */}
                        {user ? (
                            <div className="text-right">
                                <span className="block text-xs md:text-sm text-gray-300">
                                    Hola, <b className="text-rose-500">{user.username}</b>
                                </span>
                                {/* Rol oculto en móvil muy pequeño para ahorrar espacio */}
                                <span className="hidden sm:block text-[10px] md:text-xs text-gray-500 uppercase">
                                    {user.role}
                                </span>
                            </div>
                        ) : (
                            // Botones Login/Register (Solo Escritorio) -> En móvil van al menú
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="text-white hover:text-rose-300 font-medium transition">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full font-bold transition shadow-lg hover:shadow-rose-500/40 transform hover:-translate-y-0.5">
                                    Regístrate
                                </Link>
                            </div>
                        )}

                        {/* Separador (Solo escritorio) */}
                        <div className="hidden md:block w-px h-6 bg-gray-700 mx-1"></div>

                        {/* B. Botón Tema (Visible SIEMPRE) */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-1.5 md:p-2 rounded-full bg-gray-800 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 transition border border-gray-700"
                        >
                            {theme === 'dark' ? "☀" : "🌙" }
                        </button>

                        {/* C. Hamburguesa (Solo Móvil) */}
                        <button 
                            className="md:hidden text-white p-1 focus:outline-none ml-1"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="text-2xl leading-none">
                                {isMenuOpen ? "✕" : "☰"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* 4. MENÚ DESPLEGABLE (Solo Enlaces) */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-stone-900 border-b border-rose-500/20 shadow-xl flex flex-col p-6 gap-4 animate-in slide-in-from-top-5">
                        
                        <Link 
                            to="/list" 
                            className="text-gray-300 hover:text-rose-500 text-lg py-2 border-b border-stone-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Catálogo
                        </Link>

                        {user ? (
                            <Link 
                                to="/dashboard" 
                                className="text-gray-300 hover:text-rose-500 text-lg py-2 border-b border-stone-800"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Mi Panel
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-300 hover:text-rose-500 text-lg py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-rose-600 text-white text-center py-3 rounded-xl font-bold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
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

            {/* --- FOOTER --- */}
            <footer className="bg-rose-600 border-t border-rose-900/30 text-white px-5 text-center py-8 text-sm">
                <p className="mb-2">© 2025 VideoClub App</p>
                <p className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-950">
                    Desarrollado con 
                    <span className="text-cyan-400">React</span> • 
                    <span className="text-green-500">Node</span> • 
                    <span className="text-yellow-500">Express</span> • 
                    <span className="text-green-400">Mongo</span> • 
                    <span className="text-sky-400">Tailwind</span>
                </p>
            </footer>
        </div>
    );
};

export default Layout;