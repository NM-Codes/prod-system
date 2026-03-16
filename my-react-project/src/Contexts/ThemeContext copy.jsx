import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Create Theme Context. initial value is null because we will provide the actual value in the provider
const ThemeContext = createContext(null);

export function ThemeProvider({children}){
    //This function is executed only once (when the app loads).
    //it checks if a theme is already stored in localStorage. If it is and its value is valid, it uses that; otherwise, it returns "light" as the default.
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("theme");
        return stored == 'dark' || stored == 'light' ? stored : 'light';
        });

    //toggles in between themes
    const toggleTheme = ()=>{
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    }

    //we will check localStorage when the component mounts for the first time
 useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    //The value object is only recreated when the theme actually changes.
    const value = useMemo(() => ({ 
            theme,
            setTheme,
            toggleTheme }),
            [theme]
        );

    return(
        //All children have access to the theme and toggleTheme values.
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}


//custom hook to use ThemeContext.
//If we forget to put ThemeProvider in App.js, this code will warn us (Error) that "Define provider first".
export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
