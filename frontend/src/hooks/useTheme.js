import { useState, useEffect } from 'react';

const THEMES = [
  { id: 'nord',       label: 'Nord',       color: '#5e81ac' },
  { id: 'night',      label: 'Night',      color: '#38bdf8' },
  { id: 'synthwave',  label: 'Synthwave',  color: '#e779c1' },
  { id: 'cyberpunk',  label: 'Cyberpunk',  color: '#ff7598' },
  { id: 'forest',     label: 'Forest',     color: '#1eb854' },
  { id: 'coffee',     label: 'Coffee',     color: '#db924b' },
  { id: 'lemonade',   label: 'Lemonade',   color: '#519903' },
  { id: 'aqua',       label: 'Aqua',       color: '#09ecf3' },
];

const DEFAULT_THEME = 'nord';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('tf-theme') || DEFAULT_THEME
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tf-theme', theme);
  }, [theme]);

  return { theme, setTheme, themes: THEMES };
};
