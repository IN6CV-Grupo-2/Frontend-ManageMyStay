import { createContext,useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const DecodedAuthContext = createContext();

export const DecodedAuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        uid: null,
        role: null
    });

    useEffect(()=>{
        const token = localStorage.getItem('x-token');
        try {
            if(token){
            const decode = jwtDecode(token);
            setAuth({
                token,
                uid: decode.uid,
                role: decode.role
            })
        }
        } catch (error) {
            console.error('Error al decodificar el token', error);
            localStorage.removeItem('x-token'); // Prevención
            setAuth({
                token: null,
                uid: null,
                role: null
            });
        }
    }, []);

    return (
        <DecodedAuthContext.Provider value={{auth, setAuth}}>
            {children}
        </DecodedAuthContext.Provider>
    )
}

export const useDecodedAuth = () => useContext(DecodedAuthContext);