import React, { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verityTokenRequest, updateUserRequest, deleteUserRequest} from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext); 

    if (!context) {
        console.error("El contexto de autenticación no está disponible. Asegúrate de envolver tu aplicación con AuthProvider.");
        return;
    }

    const { user, isAuth, loading, errors } = context;

    console.log("Información de Autenticación:");
    console.log("Usuario:", user);
    console.log("Autenticado:", isAuth);
    console.log("Cargando:", loading);
    console.log("Errores:", errors);

    return context;
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {
            console.error("Error al registrarse:", error);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try{
            const res= await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuth(true);
            setUser(res.data);
        }catch(error){
            if(Array.isArray(error.response.data)){
             return   setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }};

    const logout = () => {
        Cookies.remove("token");
        setIsAuth(false);
        setUser(null);
    };

    const updateUser = async (id, userData) => {
        try {
            const res = await updateUserRequest(id, userData);
            setUser(res.data);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors(["Hubo un error al procesar la solicitud."]);
            }
        }
    };

   const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            if (res.status === 204) {
                console.log("Usuario eliminado correctamente");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuth(false);
                    setLoading(false);
                    return;
                }
                setIsAuth(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuth(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            updateUser,
            deleteUser,
            user,
            isAuth,
            loading,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    );
};
