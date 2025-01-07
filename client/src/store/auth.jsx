import { Children, createContext, useContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokeninLS = (serverToken) => {
        console.log("token", serverToken);
        
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    //tackling logout functionality
    return (<AuthContext.Provider value={{ storeTokeninLS,isLoggedIn,LogoutUser,token }}>
        {children}
    </AuthContext.Provider>);
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};