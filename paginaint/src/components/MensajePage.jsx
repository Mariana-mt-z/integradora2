import React, { useState } from "react";
import axios from "axios";

const MensajePage = () => {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);

  const registrarMovimiento = async () => {
    try {
      const response = await registrarMovimientoRequest();
      setMensaje(response.data.message);
    } catch (error) {
      setError("Error al registrar el movimiento.");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {mensaje && <p>{mensaje}</p>}
      <button onClick={registrarMovimiento}></button>
    </div>
  );
};

export default MensajePage;
