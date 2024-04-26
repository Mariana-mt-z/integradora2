import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

// import { Client } from 'paho-mqtt';

export const MovimientoContext = createContext();

export const MovimientoProvider = ({ children }) => {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  // const [client, setClient] = useState(null);

  // useEffect(() => {
  //   const mqttClient = new Client(
  //     "broker.hivemq.com",
  //     Number(8000),
  //     `integradorasensor_${parseInt(Math.random() * 100)}`
  //   );
  //   setClient(mqttClient);

  //   mqttClient.connect({
  //     onSuccess: () => {
  //       console.log("Connected to MQTT!");
  //       mqttClient.subscribe("/Integradora/sensor");
  //       mqttClient.onMessageArrived = onMessage;
  //     },
  //     onFailure: () => {
  //       console.log("Failed to connect to MQTT!");
  //     }
  //   });

  //   return () => {
  //     if (mqttClient.isConnected()) {
  //       mqttClient.disconnect();
  //     }
  //   };
  // }, []);

  // const onMessage = (message) => {
  //   if (message.destinationName === "/Integradora/sensor") {
  //     const receivedValue = parseInt(message.payloadString);
  //     setHistorialMovimientos(prevState => [...prevState, receivedValue]);
  //   }
  // };

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/movimiento");
      setHistorialMovimientos(response.data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <MovimientoContext.Provider value={{ historialMovimientos }}>
      {children}
    </MovimientoContext.Provider>
  );
}
