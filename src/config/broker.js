import Paho from "paho-mqtt";
import {  useEffect } from "react";

const client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `integradorasensor ${parseInt(Math.random() * 100)}`
);

export default function App() {
  function onMessage(message) {
    if (message.destinationName === "/Integradora/sensor") {
      const receivedValue = parseInt(message.payloadString);
      setTemperatura(receivedValue);
 
    }
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("/Integradora/sensor");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      }
    });

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);



  return (
    <View style={styles.container}>
      
    </View>
  );
}

;