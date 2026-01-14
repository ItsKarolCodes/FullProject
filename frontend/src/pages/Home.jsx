
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen  text-white font-sans">

            {/* 1. HERO SECTION (La parte gigante con foto) */}
            <div
                className="relative h-[600px] flex flex-col justify-center items-center text-center px-4"
            >
                <img
                    src="/images/cineGemini.png"
                    alt="Hero VideoClub"
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                // 'absolute' para que se salga del flujo y se ponga detrás
                // 'object-cover' para que no se deforme
                />
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                    Tu cine, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">en casa.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-md">
                    Organiza, descubre y gestiona tu colección de películas de forma sencilla y rápida.
                </p>

                <div className="flex flex-col md:flex-row gap-4">

                </div>
            </div>

            {/* 2. CARACTERÍSTICAS (Iconos) */}
            <div className="py-24 ">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-4">¿Qué puedes hacer aquí?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="card-rose group">
                        
                            <div className="relative z-10">
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🎬</div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Catálogo Ilimitado</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Accede a una gran variedad de géneros: Acción, Terror, Comedia y más.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="card-rose group">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>
                            
                            <div className="relative z-10">
                                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-600">⭐</div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Sistema de Rating</h3>
                                <p className="text-white/90 leading-relaxed">
                                    Puntúa tus películas favoritas y encuentra las joyas ocultas del cine.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="card-rose group">
                            {/* Efecto de brillo animado deslizante */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            
                            <div className="relative z-10">
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-600">🚀</div>
                                <h3 className="text-2xl font-bold mb-4 text-white">No esperes más</h3>
                                <p className="text-white/95 leading-relaxed mb-6">
                                    Únete ahora y empieza a disfrutar de todas las ventajas
                                </p>
                                <Link 
                                    to="/register" 
                                    className="inline-block bg-white text-rose-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-600 shadow-lg"
                                >
                                    Regístrate
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;