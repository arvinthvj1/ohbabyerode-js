import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage or default to 'organic' (no data-theme attribute needed for default)
    return localStorage.getItem('app-theme') || 'organic';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove previous theme attributes if you want to be safe, 
    // but setting a new value overwrites if we use a single attribute.
    
    if (theme === 'organic') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    availableThemes: [
      { id: 'organic', name: 'Organic Earth', color: '#84A98C' },
      { id: 'blue', name: 'Blue & White', color: '#2563EB' },
      { id: 'classic', name: 'Classic', color: '#FF8A71' },
      { id: 'lavender', name: 'Lavender Dream', color: '#B392AC' },
    ]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
