import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext (null);

export default function ThemeProvider({ children }) {
    //This function is executed only once (when the app loads).
    //First, it checks if a theme is already stored in localStorage. If it is and its value is valid, it uses that; otherwise, it returns "light" as the default.
    const [theme, setTheme] = useState (() => {
        const stored = localStorage.getItem ("theme");
        return stored == 'light' || stored == 'dark' ? stored : 'light';
    });
    

    //Every time the theme value changes (the user changes the theme), this code is executed and saves the new value in the browser.    
    useEffect ()

    useMemo (() => ({
        theme,
        setTheme,
        toggleTheme
    }), [theme])
    
    return (
        //All children fall under the umbrella of this provider and have access to the theme and toggleTheme values.
        <ThemeContext>
            {children}
        </ThemeContext>
    )
}