import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const TemperaturaContext = createContext();

export const TemperaturaProvider = ({ children }) => {
    const [historialTemperatura, setHistorialTemperatura] = useState([]);

    useEffect(() => {
        fetchData(); 
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/temperatura");
            console.log("Datos recibidos del backend:", response.data);
            setHistorialTemperatura(response.data); // Actualiza el estado con los datos recibidos
            console.log("Estado actualizado de historialTemperatura:", historialTemperatura);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log("historialTemperatura en el contexto:", historialTemperatura);

    return (
        <TemperaturaContext.Provider value={{ historialTemperatura }}>
            {children}
        </TemperaturaContext.Provider>
    );
}
