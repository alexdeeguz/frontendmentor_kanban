import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(true)

    return <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeContextProvider