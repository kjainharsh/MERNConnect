import { Children, createContext, useContext, useEffect } from "react";
import { useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");

    const storeTokeninLS = (serverToken) => {
        console.log("token", serverToken);
        
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }
    console.log("isLoggedIn",isLoggedIn);
    
    // JWT AUTHENTICATION -  to get current user login data

    const userAuthentication = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("userdata", data.userData);
                setUser(data.userData);
                
            }
        } catch (error) {
          console.log("Error fetching userdata"); 
        }
    }

    useEffect(() => {
        userAuthentication();
    }, []);
    //tackling logout functionality
    return (<AuthContext.Provider value={{ storeTokeninLS,isLoggedIn,LogoutUser,token,user }}>
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