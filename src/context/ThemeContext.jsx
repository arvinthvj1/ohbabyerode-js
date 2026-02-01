import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage or default to 'blue' (Oh Baby Classic)
    return localStorage.getItem('app-theme') || 'blue';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // If theme is 'blue' (default), remove attribute to use :root styles
    if (theme === 'blue') {
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
      { id: 'blue', name: 'Oh Baby Classic', color: '#56B2D4' },
      { id: 'classic', name: 'Orange', color: '#FF8A71' },
      { id: 'lavender', name: 'Lavender Dream', color: '#B392AC' },
    ]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
