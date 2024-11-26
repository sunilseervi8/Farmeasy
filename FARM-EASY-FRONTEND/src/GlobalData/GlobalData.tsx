// ThemeContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';  // Resets CSS for Material UI

interface ThemeContextProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextProps>({
  toggleTheme: () => {},
  darkMode: false,
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Define themes for both light and dark modes
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#48CD50' : '#004E89',  // Example of different primary colors based on theme
      },
      secondary: {
        main: darkMode ? '#FF6B35' : '#1A659E',  // Example of different secondary colors based on theme
      },
      background: {
        default: darkMode ? '#303030' : '#FFFFFF',  // Background colors for light and dark modes
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* This ensures Material UI resets the CSS based on the selected theme */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const colour="bg-gradient-to-r from-gradientStart via-gradientMid1 via-gradientMid2 to-gradientEnd hover:from-gradientStartHover hover:via-gradientMid1Hover hover:via-gradientMid2Hover hover:to-gradientEndHover transition-all duration-300 "