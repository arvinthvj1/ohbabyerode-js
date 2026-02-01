import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentThemeObj = availableThemes.find(t => t.id === theme) || availableThemes[0];

  return (
    <div className={styles.container}>
      <button 
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch Theme"
        title="Change Theme"
      >
        <div 
          className={styles.colorDot} 
          style={{ backgroundColor: currentThemeObj.color }}
        />
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown}>
            <h3>Select Theme</h3>
            <div className={styles.themeList}>
              {availableThemes.map((t) => (
                <button
                  key={t.id}
                  className={`${styles.themeOption} ${theme === t.id ? styles.active : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  <div 
                    className={styles.previewDot} 
                    style={{ backgroundColor: t.color }}
                  />
                  <span>{t.name}</span>
                  {theme === t.id && <span className={styles.check}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
