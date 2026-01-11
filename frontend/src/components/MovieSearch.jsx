const MovieSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative w-full sm:w-64">
            <input 
                type="text"
                placeholder="🔍 Buscar película..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition shadow-sm text-sm"
            />
        </div>
    );
};

export default MovieSearch;