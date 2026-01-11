import { createContext, useState, useEffect, useContext } from "react";

// 1. Creamos el contexto
const ThemeContext = createContext();

// 2. Creamos el componente Proveedor
export const ThemeProvider = ({ children }) => {
  // Estado inicial: leemos de localStorage 
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Cada vez que cambia el tema, actualizamos el HTML y localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Si el tema es dark, añade la clase, si no, la quita
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Guardar preferencia
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Hook para usarlo fácilmente en otros archivos
export const useTheme = () => useContext(ThemeContext);