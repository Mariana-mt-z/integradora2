import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const GasContext = createContext(); 

export const GasProvider = ({ children }) => {
  const [historialNiveles, setHistorialNiveles] = useState([]); 

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/gas"); // Realiza la solicitud al backend
      setHistorialNiveles(response.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <GasContext.Provider value={{ historialNiveles }}>
      {children}
    </GasContext.Provider>
  );
}
